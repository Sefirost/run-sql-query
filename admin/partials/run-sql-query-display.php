<?php

/**
 * Provides a admin area view for the plugin
 *
 * @since      1.0.0
 *
 * @package    Run_SQL_Query
 * @subpackage Run_SQL_Query/admin/partials
 */
?>

<div class="wrap">
	<h1>Run SQL Query</h1>
	<?php wp_nonce_field( 'run_sql_query' ); ?>
	<p>
	<label>Table: </label>
	<?php
		$output = '<select name="table" id="table"><option></option>';
		foreach ( $this->tables as $table ) {
			$output .= "<option value='".esc_attr( $table )."'>".esc_html( $table )."</option>";
		}
		$output .= "</select>";
		print $output;
	?>
	</p>
	<label>Query</label>
	<div class="form-field">
		<textarea id="query" rows="3" cols="60"></textarea>
	</div>
	<p>
		<input type="button" id="run_query_button" class="button button-primary" value="Run Query" />
	</p>
	
	<div id="status" style="display:none">
		<h3>Status</h3>
		<span id="status_detail"></span>
		<img id="loading_gif" src="/wp-admin/images/loading.gif">
	</div>

	<div id="error" style="display:none">
		<h3>Error</h3>
		<div id="error_detail"></div>
	</div>

	<div id="results" style="display:none">
		<h3>Results</h3>
		<strong>Query: </strong><em id="raw_query"></em>
		<p>
			<input type="button" id="export_button" class="button button-primary" value="Export to CSV" style="display:none" />
		</p>
		<div id="results_detail"></div>
	</div>
	
</div>
