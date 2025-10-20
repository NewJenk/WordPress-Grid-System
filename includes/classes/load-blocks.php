<?php

namespace GRID_SYSTEM;

class LoadBlocks {

    public function __construct() {

        // Register Gutenberg blocks.
        add_action( 'init', array($this, 'blocks_init'), 20 );

    }




    /**
     * Registers the block using the metadata loaded from the `block.json` file.
     * Behind the scenes, it registers also all assets so they can be enqueued
     * through the block editor in the corresponding context.
     *
     * @see https://developer.wordpress.org/reference/functions/register_block_type/
     */
    function blocks_init() {

        register_block_type( GRID_SYSTEM_PLUGIN_PATH . '/build/blocks/container');
        register_block_type( GRID_SYSTEM_PLUGIN_PATH . '/build/blocks/row');
        register_block_type( GRID_SYSTEM_PLUGIN_PATH . '/build/blocks/column');
        register_block_type( GRID_SYSTEM_PLUGIN_PATH . '/build/blocks/responsive-spacer');

    }



}
