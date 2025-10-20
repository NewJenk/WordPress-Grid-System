<?php

namespace GRID_SYSTEM;

class Assets {




	public function __construct() {

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );

		add_action( 'enqueue_block_assets', array( $this, 'enqueue_editor_content_assets' ) );

	}




	/**
	 * Enqueue Editor assets.
	 */
	function enqueue_editor_assets() {

		// Get the asset file created by the build process
		$asset_file = include( GRID_SYSTEM_PLUGIN_PATH . 'build/admin/editor-ui.asset.php');

		wp_enqueue_style(
			'grid-system-editor-ui',
			GRID_SYSTEM_PLUGIN_URL . 'build/admin/editor-ui.css',
			$asset_file['dependencies'], // Automatically loads dependencies (if any)
			$asset_file['version']
		);

	}




	/**
	 * Enqueue content assets but only in the Editor.
	 */
	function enqueue_editor_content_assets() {

		// Get the asset file created by the build process
		$asset_file = include( GRID_SYSTEM_PLUGIN_PATH . 'build/app/grid.asset.php');

		wp_enqueue_style(
			'grid-system-grid',
			GRID_SYSTEM_PLUGIN_URL . 'build/app/grid.css',
			$asset_file['dependencies'], // Automatically loads dependencies (if any)
			$asset_file['version']
		);

	}




}
