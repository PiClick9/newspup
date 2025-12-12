$('#divPage > button').click(function(){
	var url = $('#formSearch [id=pagingUrl]').val();
	var dataPage = $(this).attr('data-page');
	$('#formSearch [id=currentPage]').val(dataPage - 1);
	Common.formSubmit($('#formSearch'), 'GET', url);
});