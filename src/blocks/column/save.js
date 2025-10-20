import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { getColumnClasses } from './utils';

/**
 * The save function.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: getColumnClasses( attributes ),
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}