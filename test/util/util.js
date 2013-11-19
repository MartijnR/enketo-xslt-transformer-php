function transform(filePath) {
	var result = '';

	$.ajax('/index.php', {
		data: {
			xform: 'test/form/' + filePath
		},
		success: function(data, textStatus, jqXHR) {
			result = data;
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error('an error occurred', textStatus, errorThrown);
		},
		dataType: 'text',
		async: false
	});

	return result;
};
