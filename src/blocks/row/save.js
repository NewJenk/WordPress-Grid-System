import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { getRowClasses } from './utils';

/**
 * The save function.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: getRowClasses( attributes ),
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}