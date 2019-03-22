<?php

/**
 * Plugin Name:       Run SQL Query
 * Plugin URI:        https://github.com/Sefirost/run-sql-query
 * Description:       Run SQL queries on your WordPress database, to operate use the plugin page under Tools &gt; <a href="tools.php?page=run-sql-query">Run SQL Query</a> to operate.
 * Version:           1.0.0
 * Author:            Fabricio Carella
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       run-sql-query
 * Network: True
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-run-sql-query.php';

/**
 * Begins execution of the plugin.
 *
 * @since    1.0.0
 */
function run_sql_query() {

	$plugin = new Run_SQL_Query();
	$plugin->run();

}
run_sql_query();
