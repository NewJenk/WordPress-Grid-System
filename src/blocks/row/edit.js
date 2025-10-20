import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	__experimentalInspectorPopoverHeader as InspectorPopoverHeader,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	Button,
	BaseControl,
	Dropdown,
	RadioControl,
	Flex,
	FlexItem,
} from '@wordpress/components';
import { chevronDown, undo } from '@wordpress/icons';

// Shared utilities
import { getRowClasses } from './utils';

// Default template for a new row is one column
const TEMPLATE = [ [ 'grid-system/column', {} ] ];

// Define translatable labels
const responsiveSizeNames = {
	all: __( 'Extra Small Viewports', 'grid-system' ),
	sm: __( 'Small Viewports', 'grid-system' ),
	md: __( 'Medium Viewports', 'grid-system' ),
	lg: __( 'Large Viewports', 'grid-system' ),
	xl: __( 'Extra Large Viewports', 'grid-system' ),
};

// Vertical alignment options
const VERTICAL_ALIGNMENT_OPTIONS = [
	{
		label: __( 'Align Top', 'grid-system' ),
		value: 'start',
		description: __( 'Aligns items to the top of the row.', 'grid-system' ),
	},
	{
		label: __( 'Align Middle', 'grid-system' ),
		value: 'center',
		description: __(
			'Aligns items to the center (vertical) of the row.',
			'grid-system'
		),
	},
	{
		label: __( 'Align Bottom', 'grid-system' ),
		value: 'end',
		description: __(
			'Aligns items to the bottom of the row.',
			'grid-system'
		),
	},
];

// Horizontal alignment options
const HORIZONTAL_ALIGNMENT_OPTIONS = [
	{
		label: __( 'Align Left (Start)', 'grid-system' ),
		value: 'start',
		description: __( 'Aligns columns to the left.', 'grid-system' ),
	},
	{
		label: __( 'Align Center', 'grid-system' ),
		value: 'center',
		description: __( 'Aligns columns to the center.', 'grid-system' ),
	},
	{
		label: __( 'Align Right (End)', 'grid-system' ),
		value: 'end',
		description: __( 'Aligns columns to the right.', 'grid-system' ),
	},
	{
		label: __( 'Space Between', 'grid-system' ),
		value: 'between',
		description: __(
			'Distributes columns evenly; first at start, last at end.',
			'grid-system'
		),
	},
	{
		label: __( 'Space Around', 'grid-system' ),
		value: 'around',
		description: __(
			'Distributes columns evenly with equal space around them.',
			'grid-system'
		),
	},
];

/**
 * Re-usable component for the alignment dropdown.
 */
const AlignmentDropdown = ( { label, value, onChange, options } ) => {
	const selectedOption =
		options.find( ( opt ) => opt.value === value ) || options[ 0 ];

	return (
		<BaseControl
			label={ label }
			id={ `grid-system-alignment-control-${ label }` }
			className="grid-system-alignment-dropdown"
		>
			<Dropdown
				contentClassName="grid-system-popover"
				popoverProps={ { placement: 'bottom-start' } }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<Button
						id={ `grid-system-alignment-control-${ label }` }
						onClick={ onToggle }
						aria-expanded={ isOpen }
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
									onChange( val );
									onClose(); // Close popover on selection
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
 * Re-usable component for the Reset button.
 */
const ResetButton = ( { onReset, attribute } ) => (
	<Button
		style={{ marginTop: '10px' }}
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
 * The edit function
 */
export default function Edit( { attributes, setAttributes } ) {
	const { noGutters } = attributes;

	// --- Smart Inheritance Logic ---
	// Calculate the *effective* (cascaded) value for each breakpoint.
	// The UI will show these values.
	const effAlignXs = attributes.alignItemsXs;
	const effAlignSm = attributes.alignItemsSm || effAlignXs;
	const effAlignMd = attributes.alignItemsMd || effAlignSm;
	const effAlignLg = attributes.alignItemsLg || effAlignMd;
	const effAlignXl = attributes.alignItemsXl || effAlignLg;

	const effJustifyXs = attributes.justifyContentXs;
	const effJustifySm = attributes.justifyContentSm || effJustifyXs;
	const effJustifyMd = attributes.justifyContentMd || effJustifySm;
	const effJustifyLg = attributes.justifyContentLg || effJustifyMd;
	const effJustifyXl = attributes.justifyContentXl || effJustifyLg;
	// --- End Smart Inheritance Logic ---

	const blockProps = useBlockProps( {
		className: getRowClasses( attributes ), // utils.js will handle the undefineds
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
		allowedBlocks: [ 'grid-system/column' ],
		orientation: 'horizontal',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Row Settings', 'grid-system' ) }>
					<ToggleControl
						label={ __( 'No Gutters', 'grid-system' ) }
						help={ __(
							'Removes the padding (gutters) from the columns within this row.',
							'grid-system'
						) }
						checked={ noGutters }
						onChange={ ( value ) =>
							setAttributes( { noGutters: value } )
						}
					/>
				</PanelBody>

				{ /* --- Breakpoint Panels --- */ }

				<PanelBody title={ responsiveSizeNames.all }>
					<AlignmentDropdown
						label={ __( 'Vertical Alignment', 'grid-system' ) }
						value={ effAlignXs } // Show effective value
						onChange={ ( val ) =>
							setAttributes( { alignItemsXs: val } )
						} // Set specific value
						options={ VERTICAL_ALIGNMENT_OPTIONS }
					/>
					<AlignmentDropdown
						label={ __( 'Horizontal Alignment', 'grid-system' ) }
						value={ effJustifyXs } // Show effective value
						onChange={ ( val ) =>
							setAttributes( { justifyContentXs: val } )
						} // Set specific value
						options={ HORIZONTAL_ALIGNMENT_OPTIONS }
					/>
				</PanelBody>

				<PanelBody title={ responsiveSizeNames.sm }>
					<Flex>
						<FlexItem isBlock>
							<AlignmentDropdown
								label={ __(
									'Vertical Alignment',
									'grid-system'
								) }
								value={ effAlignSm }
								onChange={ ( val ) =>
									setAttributes( { alignItemsSm: val } )
								}
								options={ VERTICAL_ALIGNMENT_OPTIONS }
							/>
						</FlexItem>
						<ResetButton
							attribute={ attributes.alignItemsSm }
							onReset={ () =>
								setAttributes( { alignItemsSm: undefined } )
							}
						/>
					</Flex>
					<Flex>
						<FlexItem isBlock>
							<AlignmentDropdown
								label={ __(
									'Horizontal Alignment',
									'grid-system'
								) }
								value={ effJustifySm }
								onChange={ ( val ) =>
									setAttributes( { justifyContentSm: val } )
								}
								options={ HORIZONTAL_ALIGNMENT_OPTIONS }
							/>
						</FlexItem>
						<ResetButton
							attribute={ attributes.justifyContentSm }
							onReset={ () =>
								setAttributes( {
									justifyContentSm: undefined,
								} )
							}
						/>
					</Flex>
				</PanelBody>

				<PanelBody title={ responsiveSizeNames.md }>
					<Flex>
						<FlexItem isBlock>
							<AlignmentDropdown
								label={ __(
									'Vertical Alignment',
									'grid-system'
								) }
								value={ effAlignMd }
								onChange={ ( val ) =>
									setAttributes( { alignItemsMd: val } )
								}
								options={ VERTICAL_ALIGNMENT_OPTIONS }
							/>
						</FlexItem>
						<ResetButton
							attribute={ attributes.alignItemsMd }
							onReset={ () =>
								setAttributes( { alignItemsMd: undefined } )
							}
						/>
					</Flex>
					<Flex>
						<FlexItem isBlock>
							<AlignmentDropdown
								label={ __(
									'Horizontal Alignment',
									'grid-system'
								) }
								value={ effJustifyMd }
								onChange={ ( val ) =>
									setAttributes( { justifyContentMd: val } )
								}
								options={ HORIZONTAL_ALIGNMENT_OPTIONS }
							/>
						</FlexItem>
						<ResetButton
							attribute={ attributes.justifyContentMd }
							onReset={ () =>
								setAttributes( {
									justifyContentMd: undefined,
								} )
							}
						/>
					</Flex>
				</PanelBody>

				<PanelBody title={ responsiveSizeNames.lg }>
					<Flex>
						<FlexItem isBlock>
							<AlignmentDropdown
								label={ __(
									'Vertical Alignment',
									'grid-system'
								) }
								value={ effAlignLg }
								onChange={ ( val ) =>
									setAttributes( { alignItemsLg: val } )
								}
								options={ VERTICAL_ALIGNMENT_OPTIONS }
							/>
						</FlexItem>
						<ResetButton
							attribute={ attributes.alignItemsLg }
							onReset={ () =>
								setAttributes( { alignItemsLg: undefined } )
							}
						/>
					</Flex>
					<Flex>
						<FlexItem isBlock>
							<AlignmentDropdown
								label={ __(
									'Horizontal Alignment',
									'grid-system'
								) }
								value={ effJustifyLg }
								onChange={ ( val ) =>
									setAttributes( { justifyContentLg: val } )
								}
								options={ HORIZONTAL_ALIGNMENT_OPTIONS }
							/>
						</FlexItem>
						<ResetButton
							attribute={ attributes.justifyContentLg }
							onReset={ () =>
								setAttributes( {
									justifyContentLg: undefined,
								} )
							}
						/>
					</Flex>
				</PanelBody>

				<PanelBody title={ responsiveSizeNames.xl }>
					<Flex>
						<FlexItem isBlock>
							<AlignmentDropdown
								label={ __(
									'Vertical Alignment',
									'grid-system'
								) }
								value={ effAlignXl }
								onChange={ ( val ) =>
									setAttributes( { alignItemsXl: val } )
								}
								options={ VERTICAL_ALIGNMENT_OPTIONS }
							/>
						</FlexItem>
						<ResetButton
							attribute={ attributes.alignItemsXl }
							onReset={ () =>
								setAttributes( { alignItemsXl: undefined } )
							}
						/>
					</Flex>
					<Flex>
						<FlexItem isBlock>
							<AlignmentDropdown
								label={ __(
									'Horizontal Alignment',
									'grid-system'
								) }
								value={ effJustifyXl }
								onChange={ ( val ) =>
									setAttributes( { justifyContentXl: val } )
								}
								options={ HORIZONTAL_ALIGNMENT_OPTIONS }
							/>
						</FlexItem>
						<ResetButton
							attribute={ attributes.justifyContentXl }
							onReset={ () =>
								setAttributes( {
									justifyContentXl: undefined,
								} )
							}
						/>
					</Flex>
				</PanelBody>
			</InspectorControls>

			{ /* This div renders the block wrapper AND the InnerBlocks */ }
			<div { ...innerBlocksProps } />
		</>
	);
}