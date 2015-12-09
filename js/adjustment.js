//////////////////////
//  Ashkan Entezari // 
//////////////////////




if ($(window).width() < 900) {

	var tiny_contents = '<label for="row">Rows: </label><input type="text" id="row" name="row" size="5">';
	tiny_contents += '<label for="col"> Columns: </label><input type="text" id="col" name="col" size="5">';
	tiny_contents += '<button id="tableCreate">Create</button>';

	$("#table_toolbox").html(tiny_contents);
}

if ($(window).width() >= 900) {

	var big_contents = '<label for="row">Number of rows: </label><input type="text" id="row" name="row">';
	big_contents += '<label for="col"> Number of columns: </label><input type="text" id="col" name="col">';
	big_contents += '<button id="tableCreate">Create</button>';

	$("#table_toolbox").html(big_contents);
}

$(window).bind('resize', function() {
	if ($(window).width() < 900) {
		
		var tiny_contents = '<label for="row">Rows: </label><input type="text" id="row" name="row" size="5">';
		tiny_contents += '<label for="col"> Columns: </label><input type="text" id="col" name="col" size="5">';
		tiny_contents += '<button id="tableCreate">Create</button>';
		
		$("#table_toolbox").html(tiny_contents);
	}	
	else {

		var big_contents = '<label for="row">Number of rows: </label><input type="text" id="row" name="row">';
		big_contents += '<label for="col"> Number of columns: </label><input type="text" id="col" name="col">';
		big_contents += '<button id="tableCreate">Create</button>';

		$("#table_toolbox").html(big_contents);
	}
});