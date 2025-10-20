import { useBlockProps } from '@wordpress/block-editor';
import { getSpacerClasses } from './utils';

/**
 * The save function.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: getSpacerClasses( attributes ),
		'aria-hidden': 'true', // Spacers are purely presentational
	} );

	// Save an empty div; the spacing is handled by CSS classes
	return <div { ...blockProps } />;
}