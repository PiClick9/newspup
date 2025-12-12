jQuery(document).ready(function($) {
	"use strict";
    $('img').Lazy();

	/*document.addEventListener('long-press', function(e) {
	  //console.log(e.target);
		alert(e.target)
	});*/
	
	document.addEventListener('contextmenu', transData)
});

function transData() {
	var broswerInfo = navigator.userAgent;
	if(broswerInfo.indexOf("NewspubPartners") > -1){
		var selection = window.getSelection();
		if(Common.isNotEmpty(selection)) {
			window.Android.send(selection + '');	
		}
	}
}

function b_floating_close() {
	$('#b_floating').remove();
}

function s_floating_close() {
	$('#s_floating').remove();
}