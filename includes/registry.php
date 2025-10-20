<?php

namespace GRID_SYSTEM;

/**
 * Load all the classes in 'includes/classes/'. Filenames must following the same format as this example: if the
 * classname is ThisIsATestClass, the filename for that class must be 'this-is-a-test-class.php' (capital
 * letters are substituted for lowercase letters and preceded by a dash, except the first letter, which is
 * converted to lowercase, but is not preceded by a dash).
 */
spl_autoload_register(function($class) {

    if ( false !== strpos( $class, 'GRID_SYSTEM' ) ) {

        $dirs = array(
            GRID_SYSTEM_PLUGIN_PATH . 'includes/classes/'
        );

        foreach ( $dirs as $dir ) {

            $remove_classname       = str_replace( 'GRID_SYSTEM\\', '', $class );
            $lower_case_and_convert = strtolower(preg_replace('/([a-zA-Z])(?=[A-Z])/', '$1-', $remove_classname));  /** @link https://stackoverflow.com/questions/10507789/camelcase-to-dash-two-capitals-next-to-each-other */

            $file = $lower_case_and_convert . '.php';

            $path = $dir . $file;

            // var_dump($path);

            if ( file_exists( $path ) ) {

                require_once $path;

            }

        }

    }

});

class Registry
{
    private $storage = [];

    /**
     * Initializes the plugin by creating an instance of an empty array.
     */
    public function __construct()
    {
        $this->storage = [];
    }

    private function add($id, $callable)
    {
        $this->storage[$id] = $callable;
    }

    public function get($id)
    {
        return array_key_exists($id, $this->storage) ? $this->storage[$id] : null;
    }

    // Create instances of classes and add them to the registry
    public function build_registry()
    {

        $this->add('LoadBlocks', new LoadBlocks());
        $this->add('Assets', new Assets());
        $this->add('I18n', new I18n());

    }

}
