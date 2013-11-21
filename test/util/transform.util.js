function getTransform(filePath) {
	var result = '';

	$.ajax('/index.php', {
		data: {
			xform: filePath
		},
		success: function(data, textStatus, jqXHR) {
			result = data;
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error('an error occurred obtaining transformation result', textStatus, errorThrown);
		},
		dataType: 'text',
		async: false
	});

	return result;
};

function getXform(filePath) {
	$.ajax(filePath, {
		success: function(data, textStatus, jqXHR) {
			result = data;
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.error('an error occurred when obtaining XForm', textStatus, errorThrown);
		},
		dataType: 'xml',
		async: false
	});

	return result;
}
