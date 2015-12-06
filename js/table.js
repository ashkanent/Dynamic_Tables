var $table = $('<table></table>');
var $row = $('<tr>5</tr>');
var $col = $('<td>5</td>');
var $col_header = $('<th>head</th>');


function createTable(numberOfRows, numberOfColumns) {
	// Create an empty table:
	var $newTable = $("#tableWrapper");
	$newTable.html($table);
	var tableString = '';

	for (var i=0; i<=numberOfRows; i++) {
		tableString += "<tr>";
		for (var j=0; j<=numberOfColumns; j++) {
			if (i === 0 && j === 0)
				tableString += "<th>Kooltra</th>";
			else if (j === 0)
				tableString += "<td>" + "<button id='rowDel'><bold>-</bold></button> " + i + "</td>";
			else if (i === 0)
				tableString += '<th><input type="text" maxlength="8" placeholder="Header..." size="10" id="tableHeader"></th>';
			else
				tableString += '<td><input type="text" class="numeric" maxlength="8" size="10"></td>';
		}
		tableString += "</tr>"
	}
	// Adding the plus button to enable adding a row:
	tableString += "<tr><td><button id='rowAdd'><bold>+</bold></button></tr>"

	$newTable.children().html(tableString);
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
			extraRowString += '<td><input type="text" class="numeric" maxlength="8" size="10"></td>';
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








