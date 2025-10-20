<?php
/**
 * Plugin Name:       Grid System
 * Plugin URI:        https://shaunjenkins.com/
 * Description:       A powerful grid system for WordPress. Includes 4 Gutenberg (Block Editor) blocks that allow you to create beautiful, flexible and responsive layouts.
 * Version:           1.0.0
 * Requires at least: 6.0.9
 * Tested up to:      6.8.2
 * Requires PHP:      7.4.30
 * Author:            Shaun Jenkins
 * Author URI:        https://shaunjenkins.com/
 * License:           GPLv3 or later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       grid-system
 * Domain Path:       /languages
 *
 * @package           Grid System
 * @author            Shaun Jenkins
 * @copyright         2025 Shaun Jenkins
 * @license           GPLv3
 * @link              https://shaunjenkins.com/
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GRID_SYSTEM_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'GRID_SYSTEM_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
            
// Include the Registry 
require_once plugin_dir_path(__FILE__) . 'includes/registry.php';
// Initiate the Registry
$registry = new GRID_SYSTEM\Registry();
$registry->build_registry();
/**
 * Add a filter to make the registry available to other parts of the plugin.
 *
 * @link https://tommcfarlin.com/registry-pattern-in-wordpress/
 */
add_filter('grid_system_registry', function () use ($registry) {
    return $registry;
});

// Example use
// Retrieve the registry using the filter 'grid_system_registry'
/* $the_test = apply_filters('grid_system_registry', null);
var_dump($the_test);
var_dump($the_test->get('service1')->doSomething()); */