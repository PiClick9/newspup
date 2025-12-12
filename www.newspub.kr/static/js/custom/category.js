jQuery(document).ready(function($) {
	"use strict";
    $('img').Lazy();

	var category = Common.getParameterByName('category');
	$('#category'+category).get(0).scrollIntoView({inline:'center', behavior: 'smooth'});
});