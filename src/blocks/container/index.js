/**
 * Block: Container
 *
 * This file is the main entry point for the block,
 * which registers the block with WordPress.
 */

import { registerBlockType } from '@wordpress/blocks';

// Import block metadata
import metadata from './block.json';

// Import components
import Edit from './edit';
import save from './save';

const containerIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="24"
		height="24"
		aria-hidden="true"
		focusable="false"
	>
		<path
			fillRule="evenodd" // Changed from fill-rule
			clipRule="evenodd" // Changed from clip-rule
			d="M19,6H6C4.9,6,4,6.9,4,8v9c0,1.1,0.9,2,2,2h13c1.1,0,2-0.9,2-2V8C21,6.9,20.1,6,19,6z M16.5,7.5H19
    c0.3,0,0.5,0.2,0.5,0.5v9c0,0.3-0.2,0.5-0.5,0.5h-2.5l-0.2,0c-0.4,0-0.6,0-0.7,0c0,0-0.2,0-0.5,0l-0.1,0h-5l0,0c-0.4,0-0.7,0-0.8,0
    c0,0-0.4,0-0.7,0l0,0H6c-0.3,0-0.5-0.2-0.5-0.5V8c0-0.3,0.2-0.5,0.5-0.5h2.5 M15.9,7.7 M10,7.5h5"
		/>
	</svg>
);

// Import styles
// import './style.scss'; // Front-end and editor styles
// import './editor.scss'; // Editor-only styles

/**
 * Register the block.
 */
registerBlockType( metadata.name, {
	icon: {
		src: containerIcon
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );