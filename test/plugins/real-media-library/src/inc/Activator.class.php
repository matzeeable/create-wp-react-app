<?php
namespace MatthiasWeb\RML;
use MatthiasWeb\RML\base;

defined('ABSPATH') or die('No script kiddies please!'); // Avoid direct file request

/**
 * The activator class handles the plugin relevant activation hooks: Uninstall, activation,
 * deactivation and installation. The "installation" means installing needed database tables.
 */
class Activator extends base\Activator {
    /**
     * Method gets fired when the user activates the plugin.
     */
    public function activate() {
        // Your implementation...
    }

    /**
     * Method gets fired when the user deactivates the plugin.
     */
    public function deactivate() {
        // Your implementation...
    }

    /**
     * Install tables, stored procedures or whatever in the database.
     * This method is always called when the version bumps up or for
     * the first initial activation.
     *
     * @param boolean $errorlevel If true throw errors
     */
    public function dbDelta($errorlevel) {
        // Your table installation here...
        /*$table_name = $this->getTableName();
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            UNIQUE KEY id (id)
        ) $charset_collate;";
        dbDelta( $sql );
        
        if ($errorlevel) {
            $wpdb->print_error();
        }*/
    }
}
