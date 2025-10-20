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

import { column } from '@wordpress/icons';

// Import styles
// import './style.scss'; // Front-end and editor styles
// import './editor.scss'; // Editor-only styles

/**
 * Register the block.
 */
registerBlockType( metadata.name, {
	icon: {
		src: column
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