var $table = $('<table id="tableID"></table>');
var $row = $('<tr>5</tr>');
var $col = $('<td>5</td>');
var $col_header = $('<th>head</th>');


function createTable(numberOfRows, numberOfColumns) {
	// Create an empty table:
	var $newTable = $("#tableWrapper");
	$newTable.html($table);
	var tableString = '';

	// create a bar for hide/unhide:

	var $hideBarDiv = $("<div></div>");
	$newTable.prepend($hideBarDiv);
	for (var i=0; i<=numberOfColumns; i++) {
		if(i === 0) {
			$hideBarDiv.append("<div id='hide_unhide' style='width: 68px'></div>");
		}
		else
			$hideBarDiv.append("<div id='hide_unhide' style='width: 133px'>Show: <input type='checkbox' class='hide' id='" + (i+1) + "' checked></div>");
	}

	// create the table:

	for (var i=0; i<=numberOfRows; i++) {
		tableString += "<tr>";
		for (var j=0; j<=numberOfColumns; j++) {
			if (i === 0 && j === 0)
				tableString += "<th style='width: 60px'>Kooltra</th>";
			else if (j === 0)
				tableString += "<td style='width: 54px'>" + "<button id='rowDel'><bold>-</bold></button> " + i + "</td>";
			else if (i === 0)
				tableString += '<th><input type="text" maxlength="17" placeholder="Header..." size="18" id="tableHeader"></th>';
			else
				tableString += '<td><input type="text" class="numeric" maxlength="14" size="16"></td>';
		}
		tableString += "</tr>"
	}
	// Adding the plus button to enable adding a row:
	tableString += "<tr><td><button id='rowAdd'><bold>+</bold></button></tr>"

	$newTable.children(':eq(1)').html(tableString);
}



// A function to update row numbers:
function updateRowNumbers(status) {
	var updatedRow = 0;
	var numberOfRows = $("tr").length;
	
	// if status is "1", a row has been deleted
	if(status === 1) {
		$("tbody").children().each(function() {
			if(updatedRow > 0 && updatedRow < (numberOfRows-1) ) {
				$(this).children(':eq(0)').html("<button id='rowDel'><bold>-</bold></button> " + updatedRow);
			}
			updatedRow++;
		});
	}
	else if (status === 2) {
		$("tr").last().prev().children(':eq(0)').html("<button id='rowDel'><bold>-</bold></button> " + (numberOfRows-2));
	}
}


// Create a new table when the "Create" button is clicked:

$("#tableCreate").click(function() {
	var numberOfRows = $("#row").val();
	var numberOfColumns = $("#col").val();

	createTable(numberOfRows, numberOfColumns);

	// set the table width:
	var tableWidth = 60 + (numberOfColumns*133);
	var tableWidthString = tableWidth + "px";
	$("table").css("width", tableWidthString);

});



// Validate the entries when "Validate" button is clicked

$("#validate").click(function() {
		$(".numeric").each(function() {
			if(isNaN($(this).val()))
				$(this).css("background","tomato");
			else
				$(this).css("background","white");
		});
	});




// Delete a row when "-" button is clicked:

$(document).on("click", "#rowDel", function() {
	$(this).parents(':eq(1)').remove();

	// update row numbers (1 indicates that a row has been deleted):
	updateRowNumbers(1);
	
});


// Add a row when "+" button is clicked:

$(document).on("click", "#rowAdd", function() {
	var extraRowString = '<tr>';
	var numberOfColumns = ($("td").length - 1) / ($("tr").length - 2);

	for(var i=0; i<numberOfColumns; i++) {
		if (i === 0)
			extraRowString += "<td>" + "<button id='rowDel'><bold>-</bold></button> " + i + "</td>";
		else
			extraRowString += '<td><input type="text" class="numeric" maxlength="14" size="16"></td>';
	}
	extraRowString += '</tr>'

	// Delete last row which contains "+" button:
	$(this).parents(':eq(1)').remove();
	
	// Add the new empty row:
	$("tbody").append(extraRowString);
	
	// Again, add the last row with "+" button:
	extraRowString = "<tr><td><button id='rowAdd'><bold>+</bold></button></tr>";
	$("tbody").append(extraRowString);
	
	// Update the row numbers (2 indicates a row has been added):
	updateRowNumbers(2);
});





// Hide/unhide columns:

$(document).on("change", ".hide", function() {
	
	// e.g. $('td:nth-child(2),th:nth-child(2)').hide();
	var colNum = $(this).attr("id");
	if(! $(this).prop("checked")) {
		$('td:nth-child('+colNum+'),th:nth-child('+colNum+')').hide();
		var $par = $(this).parent();
		$par.html("<input type=\"checkbox\" class=\"hide\" id=\"" + colNum + "\" >");
		$par.css("width", "5px");
		$par.css("margin-left", "-15px");
		$par.css("margin-right", "15px");

		// set the new table width:
		var $tableSelector = $("#tableID");
		var newTableWidth = parseInt($tableSelector.css("width")) - 129;
		$tableSelector.css("width", newTableWidth.toString()+"px");
	}
	else {
		$('td:nth-child('+colNum+'),th:nth-child('+colNum+')').show();
		var $par = $(this).parent();
		$par.html("Show: <input type=\"checkbox\" class=\"hide\" id=\"" + colNum + "\" checked>");
		$par.css("width", "133px");
		$par.css("margin-left", "0");
		$par.css("margin-right", "0");

		// set the new table width:
		var $tableSelector = $("#tableID");
		var newTableWidth = parseInt($tableSelector.css("width")) + 137;
		$tableSelector.css("width", newTableWidth.toString()+"px");
	}
});















