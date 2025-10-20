import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	__experimentalInspectorPopoverHeader as InspectorPopoverHeader,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	BaseControl,
	Notice,
	Button,
	Flex,
	FlexItem,
	Dropdown,
	RadioControl,
} from '@wordpress/components';
import { undo, chevronDown, seen, unseen } from '@wordpress/icons';

// Shared utilities
import { getColumnClasses } from './utils';

// Define translatable labels
const responsiveSizeNames = {
	all: __( 'Extra Small Viewports', 'grid-system' ),
	sm: __( 'Small Viewports', 'grid-system' ),
	md: __( 'Medium Viewports', 'grid-system' ),
	lg: __( 'Large Viewports', 'grid-system' ),
	xl: __( 'Extra Large Viewports', 'grid-system' ),
};

// Define breakpoint help text
const breakpointHelpText = {
	all: __( 'Will apply from 0px to 575px', 'grid-system' ),
	sm: __( 'Will apply from 576px to 767px', 'grid-system' ),
	md: __( 'Will apply from 768px to 991px', 'grid-system' ),
	lg: __( 'Will apply from 992px to 1199px', 'grid-system' ),
	xl: __( 'Will apply from 1200px and up', 'grid-system' ),
};

// Define Visibility options
const VISIBILITY_OPTIONS = [
	{
		label: __( 'Visible', 'grid-system' ),
		value: false,
		description: __( 'Column is visible at this breakpoint.', 'grid-system' ),
	},
	{
		label: __( 'Hidden', 'grid-system' ),
		value: true,
		description: __(
			'Column is hidden using "d-none".',
			'grid-system'
		),
	},
];

// --- UPDATE ORDER_OPTIONS with descriptions ---
const ORDER_OPTIONS = [
	{
		label: __( 'Default', 'grid-system' ),
		value: undefined, // Explicitly undefined for default/inherit
		description: __(
			'Column appears in its natural DOM order.',
			'grid-system'
		),
	},
	{
		label: __( 'First', 'grid-system' ),
		value: 'first',
		description: __(
			'Moves column visually to the start of the row.',
			'grid-system'
		),
	},
	{
		label: __( 'Last', 'grid-system' ),
		value: 'last',
		description: __(
			'Moves column visually to the end of the row.',
			'grid-system'
		),
	},
	{ label: '0', value: '0', description: __( 'Order value 0.', 'grid-system' ) },
	{ label: '1', value: '1', description: __( 'Order value 1.', 'grid-system' ) },
	{ label: '2', value: '2', description: __( 'Order value 2.', 'grid-system' ) },
	{ label: '3', value: '3', description: __( 'Order value 3.', 'grid-system' ) },
	{ label: '4', value: '4', description: __( 'Order value 4.', 'grid-system' ) },
	{ label: '5', value: '5', description: __( 'Order value 5.', 'grid-system' ) },
	{ label: '6', value: '6', description: __( 'Order value 6.', 'grid-system' ) },
	{ label: '7', value: '7', description: __( 'Order value 7.', 'grid-system' ) },
	{ label: '8', value: '8', description: __( 'Order value 8.', 'grid-system' ) },
	{ label: '9', value: '9', description: __( 'Order value 9.', 'grid-system' ) },
	{ label: '10', value: '10', description: __( 'Order value 10.', 'grid-system' ) },
	{ label: '11', value: '11', description: __( 'Order value 11.', 'grid-system' ) },
	{ label: '12', value: '12', description: __( 'Order value 12.', 'grid-system' ) },
];
// --- END ---

// Default template for new columns
const TEMPLATE = [
	[
		'core/paragraph',
		{ placeholder: __( 'Add content here...', 'grid-system' ) },
	],
];

/**
 * Re-usable component for the Reset button.
 */
const ResetButton = ( { onReset, attribute } ) => (
	<Button
		icon={ undo }
		label={ __( 'Reset', 'grid-system' ) }
		onClick={ onReset }
		isSmall
		isLink
		isDestructive
		disabled={ attribute === undefined } // Disable if already reset
		className="grid-system-reset-button"
	/>
);

/**
 * Re-usable component for settings dropdowns
 */
const SettingsDropdown = ( { label, value, onChange, options } ) => {
	// Find the selected option, defaulting to the first option if the value is undefined or not found
	const selectedOption =
		options.find( ( opt ) => opt.value === value ) ||
		options.find( ( opt ) => opt.value === undefined ) || // Explicit check for undefined option
		options[ 0 ];

	// Handle the icon specifically for the Visibility dropdown
	const iconProp =
		label === __( 'Visibility', 'grid-system' )
			? value
				? unseen
				: seen
			: undefined;

	return (
		<BaseControl
			label={ label }
			id={ `grid-system-setting-control-${ label.replace( /\s+/g, '-' ).toLowerCase() }` } // Make ID more robust
			className="grid-system-setting-dropdown"
		>
			<Dropdown
				contentClassName="grid-system-popover"
				popoverProps={ { placement: 'bottom-start' } }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button
						id={ `grid-system-setting-control-${ label.replace( /\s+/g, '-' ).toLowerCase() }` }
						onClick={ onToggle }
						aria-expanded={ isOpen }
						icon={ iconProp }
						variant="secondary"
						isPressed={ isOpen }
						className="grid-system-popover-toggle-button"
					>
						{ selectedOption.label }
						<span
							className="grid-system-popover-arrow"
							style={ {
								transform: isOpen
									? 'rotate(180deg)'
									: 'rotate(0deg)',
							} }
						>
							{ chevronDown }
						</span>
					</Button>
				) }
				renderContent={ ( { onClose } ) => (
					<>
						<InspectorPopoverHeader
							title={ label }
							onClose={ onClose }
						/>
						<div>
							<RadioControl
								selected={ value }
								options={ options }
								onChange={ ( val ) => {
									// Handle boolean conversion specifically for visibility
									const finalValue =
										label ===
										__( 'Visibility', 'grid-system' )
											? val === 'true'
											: val; // Keep other values (like order strings) as they are
									onChange( finalValue );
									onClose();
								} }
							/>
						</div>
					</>
				) }
			/>
		</BaseControl>
	);
};

/**
 * The edit function
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		xsNone,
		allSize,
		allOffset,
		orderXs,
		smNone,
		smSize,
		smOffset,
		orderSm,
		mdNone,
		mdSize,
		mdOffset,
		orderMd,
		lgNone,
		lgSize,
		lgOffset,
		orderLg,
		xlNone,
		xlSize,
		xlOffset,
		orderXl,
	} = attributes;

	// --- Smart Inheritance Logic ---
	const effAllSize = allSize;
	const effSmSize = smSize ?? effAllSize;
	const effMdSize = mdSize ?? effSmSize;
	const effLgSize = lgSize ?? effMdSize;
	const effXlSize = xlSize ?? effLgSize;

	const effAllOffset = allOffset || 0;
	const effSmOffset = smOffset ?? effAllOffset;
	const effMdOffset = mdOffset ?? effSmOffset;
	const effLgOffset = lgOffset ?? effMdOffset;
	const effXlOffset = xlOffset ?? effLgOffset;

	const effOrderXs = orderXs;
	const effOrderSm = orderSm ?? effOrderXs;
	const effOrderMd = orderMd ?? effOrderSm;
	const effOrderLg = orderLg ?? effOrderMd;
	const effOrderXl = orderXl ?? effOrderLg;
	// --- End Smart Inheritance Logic ---

	const blockProps = useBlockProps( {
		className: getColumnClasses( attributes ),
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
		templateLock: false,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ responsiveSizeNames.all }
					icon={ xsNone ? 'hidden' : '' }
				>
					<BaseControl help={ breakpointHelpText.all } />
					<BaseControl>
						<SettingsDropdown
							label={ __( 'Visibility', 'grid-system' ) }
							value={ xsNone }
							onChange={ ( value ) =>
								setAttributes( { xsNone: value } )
							}
							options={ VISIBILITY_OPTIONS }
						/>
						{ xsNone ? (
							<Notice status="warning" isDismissible={ false }>
								{ __(
									'Column is hidden at this breakpoint.',
									'grid-system'
								) }
							</Notice>
						) : (
							<>
								<RangeControl
									label={ __( 'Columns', 'grid-system' ) }
									value={ effAllSize }
									onChange={ ( value ) =>
										setAttributes( { allSize: value } )
									}
									min={ 1 }
									max={ 12 }
								/>
								<RangeControl
									label={ __( 'Offset', 'grid-system' ) }
									value={ effAllOffset }
									onChange={ ( value ) =>
										setAttributes( { allOffset: value } )
									}
									min={ 0 }
									max={ 11 }
								/>
								<SettingsDropdown
									label={ __( 'Order', 'grid-system' ) }
									value={ effOrderXs }
									options={ ORDER_OPTIONS }
									onChange={ ( value ) =>
										setAttributes( { orderXs: value } )
									}
								/>
							</>
						) }
					</BaseControl>
				</PanelBody>

				<PanelBody
					title={ responsiveSizeNames.sm }
					icon={ smNone ? 'hidden' : '' }
				>
					<BaseControl help={ breakpointHelpText.sm } />
					<BaseControl>
						<SettingsDropdown
							label={ __( 'Visibility', 'grid-system' ) }
							value={ smNone }
							onChange={ ( value ) =>
								setAttributes( { smNone: value } )
							}
							options={ VISIBILITY_OPTIONS }
						/>
						{ smNone ? (
							<Notice status="warning" isDismissible={ false }>
								{ __(
									'Column is hidden at this breakpoint.',
									'grid-system'
								) }
							</Notice>
						) : (
							<>
								<Flex>
									<FlexItem isBlock>
										<RangeControl
											label={ __(
												'Columns',
												'grid-system'
											) }
											value={ effSmSize }
											onChange={ ( value ) =>
												setAttributes( {
													smSize: value,
												} )
											}
											min={ 1 }
											max={ 12 }
										/>
									</FlexItem>
									<ResetButton
										attribute={ smSize }
										onReset={ () =>
											setAttributes( {
												smSize: undefined,
											} )
										}
									/>
								</Flex>
								<Flex>
									<FlexItem isBlock>
										<RangeControl
											label={ __(
												'Offset',
												'grid-system'
											) }
											value={ effSmOffset }
											onChange={ ( value ) =>
												setAttributes( {
													smOffset: value,
												} )
											}
											min={ 0 }
											max={ 11 }
										/>
									</FlexItem>
									<ResetButton
										attribute={ smOffset }
										onReset={ () =>
											setAttributes( {
												smOffset: undefined,
											} )
										}
									/>
								</Flex>
								<Flex>
									<FlexItem isBlock>
										<SettingsDropdown
											label={ __(
												'Order',
												'grid-system'
											) }
											value={ effOrderSm }
											options={ ORDER_OPTIONS }
											onChange={ ( value ) =>
												setAttributes( {
													orderSm: value,
												} )
											}
										/>
									</FlexItem>
									<ResetButton
										attribute={ orderSm }
										onReset={ () =>
											setAttributes( {
												orderSm: undefined,
											} )
										}
									/>
								</Flex>
							</>
						) }
					</BaseControl>
				</PanelBody>

				<PanelBody
					title={ responsiveSizeNames.md }
					icon={ mdNone ? 'hidden' : '' }
				>
					<BaseControl help={ breakpointHelpText.md } />
					<BaseControl>
						<SettingsDropdown
							label={ __( 'Visibility', 'grid-system' ) }
							value={ mdNone }
							onChange={ ( value ) =>
								setAttributes( { mdNone: value } )
							}
							options={ VISIBILITY_OPTIONS }
						/>
						{ mdNone ? (
							<Notice status="warning" isDismissible={ false }>
								{ __(
									'Column is hidden at this breakpoint.',
									'grid-system'
								) }
							</Notice>
						) : (
							<>
								<Flex>
									<FlexItem isBlock>
										<RangeControl
											label={ __(
												'Columns',
												'grid-system'
											) }
											value={ effMdSize }
											onChange={ ( value ) =>
												setAttributes( {
													mdSize: value,
												} )
											}
											min={ 1 }
											max={ 12 }
										/>
									</FlexItem>
									<ResetButton
										attribute={ mdSize }
										onReset={ () =>
											setAttributes( {
												mdSize: undefined,
											} )
										}
									/>
								</Flex>
								<Flex>
									<FlexItem isBlock>
										<RangeControl
											label={ __(
												'Offset',
												'grid-system'
											) }
											value={ effMdOffset }
											onChange={ ( value ) =>
												setAttributes( {
													mdOffset: value,
												} )
											}
											min={ 0 }
											max={ 11 }
										/>
									</FlexItem>
									<ResetButton
										attribute={ mdOffset }
										onReset={ () =>
											setAttributes( {
												mdOffset: undefined,
											} )
										}
									/>
								</Flex>
								<Flex>
									<FlexItem isBlock>
										<SettingsDropdown
											label={ __(
												'Order',
												'grid-system'
											) }
											value={ effOrderMd }
											options={ ORDER_OPTIONS }
											onChange={ ( value ) =>
												setAttributes( {
													orderMd: value,
												} )
											}
										/>
									</FlexItem>
									<ResetButton
										attribute={ orderMd }
										onReset={ () =>
											setAttributes( {
												orderMd: undefined,
											} )
										}
									/>
								</Flex>
							</>
						) }
					</BaseControl>
				</PanelBody>

				<PanelBody
					title={ responsiveSizeNames.lg }
					icon={ lgNone ? 'hidden' : '' }
				>
					<BaseControl help={ breakpointHelpText.lg } />
					<BaseControl>
						<SettingsDropdown
							label={ __( 'Visibility', 'grid-system' ) }
							value={ lgNone }
							onChange={ ( value ) =>
								setAttributes( { lgNone: value } )
							}
							options={ VISIBILITY_OPTIONS }
						/>
						{ lgNone ? (
							<Notice status="warning" isDismissible={ false }>
								{ __(
									'Column is hidden at this breakpoint.',
									'grid-system'
								) }
							</Notice>
						) : (
							<>
								<Flex>
									<FlexItem isBlock>
										<RangeControl
											label={ __(
												'Columns',
												'grid-system'
											) }
											value={ effLgSize }
											onChange={ ( value ) =>
												setAttributes( {
													lgSize: value,
												} )
											}
											min={ 1 }
											max={ 12 }
										/>
									</FlexItem>
									<ResetButton
										attribute={ lgSize }
										onReset={ () =>
											setAttributes( {
												lgSize: undefined,
											} )
										}
									/>
								</Flex>
								<Flex>
									<FlexItem isBlock>
										<RangeControl
											label={ __(
												'Offset',
												'grid-system'
											) }
											value={ effLgOffset }
											onChange={ ( value ) =>
												setAttributes( {
													lgOffset: value,
												} )
											}
											min={ 0 }
											max={ 11 }
										/>
									</FlexItem>
									<ResetButton
										attribute={ lgOffset }
										onReset={ () =>
											setAttributes( {
												lgOffset: undefined,
											} )
										}
									/>
								</Flex>
								<Flex>
									<FlexItem isBlock>
										<SettingsDropdown
											label={ __(
												'Order',
												'grid-system'
											) }
											value={ effOrderLg }
											options={ ORDER_OPTIONS }
											onChange={ ( value ) =>
												setAttributes( {
													orderLg: value,
												} )
											}
										/>
									</FlexItem>
									<ResetButton
										attribute={ orderLg }
										onReset={ () =>
											setAttributes( {
												orderLg: undefined,
											} )
										}
									/>
								</Flex>
							</>
						) }
					</BaseControl>
				</PanelBody>

				<PanelBody
					title={ responsiveSizeNames.xl }
					icon={ xlNone ? 'hidden' : '' }
				>
					<BaseControl help={ breakpointHelpText.xl } />
					<BaseControl>
						<SettingsDropdown
							label={ __( 'Visibility', 'grid-system' ) }
							value={ xlNone }
							onChange={ ( value ) =>
								setAttributes( { xlNone: value } )
							}
							options={ VISIBILITY_OPTIONS }
						/>
						{ xlNone ? (
							<Notice status="warning" isDismissible={ false }>
								{ __(
									'Column is hidden at this breakpoint.',
									'grid-system'
								) }
							</Notice>
						) : (
							<>
								<Flex>
									<FlexItem isBlock>
										<RangeControl
											label={ __(
												'Columns',
												'grid-system'
											) }
											value={ effXlSize }
											onChange={ ( value ) =>
												setAttributes( {
													xlSize: value,
												} )
											}
											min={ 1 }
											max={ 12 }
										/>
									</FlexItem>
									<ResetButton
										attribute={ xlSize }
										onReset={ () =>
											setAttributes( {
												xlSize: undefined,
											} )
										}
									/>
								</Flex>
								<Flex>
									<FlexItem isBlock>
										<RangeControl
											label={ __(
												'Offset',
												'grid-system'
											) }
											value={ effXlOffset }
											onChange={ ( value ) =>
												setAttributes( {
													xlOffset: value,
												} )
											}
											min={ 0 }
											max={ 11 }
										/>
									</FlexItem>
									<ResetButton
										attribute={ xlOffset }
										onReset={ () =>
											setAttributes( {
												xlOffset: undefined,
											} )
										}
									/>
								</Flex>
								<Flex>
									<FlexItem isBlock>
										<SettingsDropdown
											label={ __(
												'Order',
												'grid-system'
											) }
											value={ effOrderXl }
											options={ ORDER_OPTIONS }
											onChange={ ( value ) =>
												setAttributes( {
													orderXl: value,
												} )
											}
										/>
									</FlexItem>
									<ResetButton
										attribute={ orderXl }
										onReset={ () =>
											setAttributes( {
												orderXl: undefined,
											} )
										}
									/>
								</Flex>
							</>
						) }
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			{ /* This div renders the block wrapper AND the InnerBlocks */ }
			<div { ...innerBlocksProps } />
		</>
	);
}