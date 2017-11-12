$(function() {

	$("body").addClass("loaded");

});

$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})
/***********************************************
*        NProgress Settings
***********************************************/

// start load bar
NProgress.start();

// end loading bar
NProgress.done();
