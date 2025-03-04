( function( $ ) {
	$(document).ready(function( $ ){
		$( document ).on( 'click', '.product-search-filter-terms:not(.filter-dead) .product-search-product_cat-filter-item a', filterItemOnClick );
		$( document ).on( 'click', '.product-search-filter-terms:not(.filter-dead) .product-search-product_brand-filter-item:not(.product-search-attribute-filter-item) a', filterItemOnClick );
		$( document ).on( 'click', '.product-search-filter-terms:not(.filter-dead) .product-search-product_tag-filter-item', filterItemOnClick );
		$( document ).on( 'click', '.product-search-filter-terms:not(.filter-dead) .product-search-attribute-filter-item:not(.product-search-product_cat-filter-item) a', filterItemOnClick );
	});

	filterItemOnClick = function( e ) {
		var container  = $( this ).closest( '.product-search-filter-terms' ),
			origin_id  = $( container ).attr( 'id' ),
			clear      = $( this ).parent().data( 'term' ) === '',
			clear_tags = $( this ).data( 'term' ) === '',
			taxonomy   = origin_id.indexOf( 'tag' ) >= 0 ? 'product_tag' : $( this ).parent().data( 'taxonomy' ),
			term       = origin_id.indexOf( 'tag' ) >= 0 ? $( this ).data('term') : $( this ).parent().data( 'term' ),
			term_name  = $( this ).find( '.term-name' ).prop( 'innerHTML' );

		// Create buttons
		// @todo if clear is clicked remove those containers too
		// @todo remove logs
		if ( document.getElementById( 'wps-dynamic-clear-filters' ) !== null ) {
			if ( !!term ) { 
				if ( document.getElementById( 'clear-filter-' + taxonomy + '-' + term ) === null ) {
					$( '#wps-dynamic-clear-filters' ).append( '<a class="clear-filter-term" id="clear-filter-' + taxonomy + '-' + term + '">' + term_name + '</a>' );
					$( document ).on( 'click', '#clear-filter-' + taxonomy + '-' + term, { container: '#' + origin_id, taxonomy: taxonomy, term: term }, termClearOnClick );
				} else {
					$( '#clear-filter-' + taxonomy + '-' + term ).remove();
				}
			} else if ( clear ) {
				var clear_option = $( this ).closest( '.nav-back' );
				// Clear for attribute
				if ( $( clear_option ).data( 'taxonomy' ) ) {
					var cleared_taxonomy = $( clear_option ).data( 'taxonomy' );
				}
				// Clear for product_cat, product_brand
				if ( !cleared_taxonomy ) {
					if ( $( this ).closest( '.nav-back' ) ) {
						if ( $( clear_option ).has( '[class^=product-search-]' ) ) {
							var dirty_class = $( clear_option ).prop( 'class' );
							if ( dirty_class.indexOf( 'product_cat' ) >= 0 ) {
								var cleared_taxonomy = 'product_cat';
							} else {
								if ( dirty_class.indexOf( 'product_brand' ) >= 0 ) {
									var cleared_taxonomy = 'product_brand';
								}
							}
						}
					}
				}
				if ( cleared_taxonomy ) {
					var clear_taxonomy_filters = 'clear-filter-' + cleared_taxonomy;
					$('[id^="'+ clear_taxonomy_filters +'"]').remove();
				}
			} else if ( clear_tags ) {
				// Clear for tag
				var cleared_taxonomy = 'product_tag';
				var clear_taxonomy_filters = 'clear-filter-' + cleared_taxonomy;
				$('[id^="'+ clear_taxonomy_filters +'"]').remove();
			}
		}

		return false;
	}

	termClearOnClick = function( e ) {

		var container    = e.data.container,
			origin_id    = $( container ).attr( 'id' ),
			multiple     = $( container ).data( 'multiple' ),
			clear        = $( container ).data( 'term' ) === '',
			taxonomy     = e.data.taxonomy,
			current_term = e.data.term,
			filter_item  = '',
			current_taxonomy = '';

		if ( multiple && !clear ) {
			var action = 'add';
		} else {
			var action = 'replace';
		}

		if ( typeof e.preventDefault === 'function' ) {
			e.preventDefault();
		}
		if ( typeof e.stopImmediatePropagation === 'function' ) {
			e.stopImmediatePropagation();
		}
		if ( typeof e.stopPropagation === 'function' ) {
			e.stopPropagation();
		}

		if ( taxonomy === 'product_cat' ) {
			filter_item = '.cat-item-' + current_term;
			current_taxonomy = 'current-cat';
		} else if ( taxonomy.indexOf( 'pa_' ) >= 0 ) {
			filter_item = '.' + taxonomy + '-item-' + current_term;
			current_taxonomy = 'current-' + taxonomy;
		} else if ( taxonomy === 'product_brand' ) {
			filter_item = '.product_brand-item-' + current_term;
			current_taxonomy = 'current-product_brand';
		} else if ( taxonomy === 'product_tag' ) {
			filter_item = '.tag-link-' + current_term;
			current_taxonomy = 'current-tag';
		} else {
			console.log( 'Taxonomy not supported' );
		}

		if ( $( filter_item ).hasClass( current_taxonomy ) && $( filter_item ).data( 'term' ) === current_term ) {
			$( filter_item ).removeClass( current_taxonomy );
			$( filter_item + ' a').addClass( 'loading-term-filter' );
			if ( multiple ) {
				$( '.product-filter-field' ).first().trigger( 'ixTermFilter', [ current_term, taxonomy, 'remove', origin_id ] );
			} else {
				$( '.product-filter-field' ).first().trigger( 'ixTermFilter', [ '', taxonomy, null, origin_id ] );
			}
			$( '#clear-filter-' + taxonomy + '-' + current_term ).remove();
		}

		return false;
	};

} )( jQuery );