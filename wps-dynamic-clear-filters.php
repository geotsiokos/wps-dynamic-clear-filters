<?php
/**
 * Plugin Name: WPS Dynamic Clear Filters
 * Description: Renders a container with active filters, requires WooCommerce Product Search extension
 * Author: gtsiokos
 * Author URI: https://www.netpad.gr
 * Plugin URI: https://www.netpad.gr
 * Version: 1.0.0
 */

if( !defined( 'ABSPATH' ) ) {
	exit;
}

class WPS_Dynamic_Clear_Filters {

	public static function boot() {
	//	add_action( 'init', array( __CLASS__, 'init' ) );
	//}

	//public static function init() {
		if ( defined( 'WOO_PS_PLUGIN_VERSION' ) ) {
			add_shortcode( 'wps-clear-filters', array( __CLASS__, 'wps_dynamic_clear_filters' ) );
			add_action( 'wp_enqueue_scripts', array( __CLASS__, 'wp_enqueue_scripts' ) );
		}
	}

	public static function wp_enqueue_scripts() {
		wp_enqueue_script(
			'product-filters-clear',
			plugins_url( 'wps-dynamic-clear-filters' ) . '/js/product-filters-clear.js',
			array( 'jquery' ),
			'1.0.0'
		);
		wp_enqueue_style(
			'product-filters-clear-style',
			plugins_url( 'wps-dynamic-clear-filters' ) . '/css/product-filters-clear-style.css',
			array(),
			'1.0.0'
		);
	}

	public static function wps_dynamic_clear_filters( $atts ) {
		$output = '<p id="wps-dynamic-clear-filters"></p>';
		return $output;
	}

} WPS_Dynamic_Clear_Filters::boot();