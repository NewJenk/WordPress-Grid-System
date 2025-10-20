/**
 * Block: Row
 */

import { registerBlockType } from '@wordpress/blocks';

// Import block metadata
import metadata from './block.json';

// Import components
import Edit from './edit';
import save from './save';

import { columns } from '@wordpress/icons';

/**
 * Register the block.
 */
registerBlockType( metadata.name, {
	icon: {
		src: columns
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