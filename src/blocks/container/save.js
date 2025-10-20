import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const { setWidthClass } = attributes;

	// useBlockProps.save() correctly applies 'alignfull' from block.json
	const blockProps = useBlockProps.save( {
		className: setWidthClass ? 'container-fluid' : 'container',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}