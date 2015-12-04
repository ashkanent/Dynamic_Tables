var $table = $('<table></table>');
var $row = $('<tr>5</tr>');
var $col = $('<td>5</td>');
var $col_header = $('<th>head</th>');


$("#tableUpdate").click(function() {
	var numberOfRows = $("#row").val();
	var numberOfColumns = $("#col").val();

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
				tableString += "<td>" + i + "</td>";
			else if (i === 0)
				tableString += "<th><input type=text></th>";
			else
				tableString += "<td><input type=text></td>";
		}
		tableString += "</tr>"
	}

	$newTable.children().html(tableString);


});