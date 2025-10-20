import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	CheckboxControl,
} from '@wordpress/components';

const TEMPLATE = [
	[
		'grid-system/row',
		{},
		[
			[
				'grid-system/column',
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: __(
								'Type / to add a block',
								'grid-system'
							),
						},
					],
				],
			],
		],
	],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the user will see when 'editing' the block.
 *
 * @param {Object}   props               Block props.
 *@param {Object} props.attributes Block attributes.
setAttributes
 */
export default function Edit( { attributes, setAttributes } ) {
	const { setWidthClass } = attributes;

	// useBlockProps automatically adds 'alignfull' from block.json
	const blockProps = useBlockProps( {
		className: setWidthClass ? 'container-fluid' : 'container',
	} );

	// useInnerBlocksProps applies the correct classes and settings for InnerBlocks.
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: TEMPLATE,
		templateLock: false,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Width', 'grid-system' ) }>
					<PanelRow>
						<CheckboxControl
							label={ __( 'Full Width', 'grid-system' ) }
							help={ __(
								'Will use the class "container-fluid" instead of "container", so will display full width of the viewport.',
								'grid-system'
							) }
							checked={ setWidthClass }
							onChange={ ( value ) =>
								setAttributes( { setWidthClass: value } )
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			{ /*
			  * Render the wrapper and InnerBlocks
			  * Spreading { ...innerBlocksProps } onto this <div>
			  * applies all classes and renders the InnerBlocks component
			  * *inside* this div. It's the modern equivalent of:
			  * <div {...blockProps}><InnerBlocks .../></div>
			  */ }
			<div { ...innerBlocksProps } />
		</>
	);
}