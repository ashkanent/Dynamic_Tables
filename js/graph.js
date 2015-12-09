// var data = [{
//         "Client": "ABC",
//         "sale": "202",
//         "year": "2000"
//     }, {
//         "Client": "ABC",
//         "sale": "215",
//         "year": "2002"
//     }, {
//         "Client": "ABC",
//         "sale": "179",
//         "year": "2004"
//     }, {
//         "Client": "ABC",
//         "sale": "199",
//         "year": "2006"
//     }, {
//         "Client": "ABC",
//         "sale": "134",
//         "year": "2008"
//     }, {
//         "Client": "ABC",
//         "sale": "176",
//         "year": "2010"
//     }, {
//         "Client": "XYZ",
//         "sale": "100",
//         "year": "2000"
//     }, {
//         "Client": "XYZ",
//         "sale": "215",
//         "year": "2002"
//     }, {
//         "Client": "XYZ",
//         "sale": "179",
//         "year": "2004"
//     }, {
//         "Client": "XYZ",
//         "sale": "199",
//         "year": "2006"
//     }, {
//         "Client": "DEF",
//         "sale": "134",
//         "year": "2008"
//     }, {
//         "Client": "DEF",
//         "sale": "176",
//         "year": "2013"
//     }];
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var data = [];



function create_new_canvas() {
    $("#graphWrapper").html('<svg id="visualisation" width="1000" height="500"></svg>');
}


function DrawChart() {
    
    // sort data based on "Column"                    
    var dataGroup = d3.nest()
        .key(function(d) {return d.Column;})
        .entries(data);

    console.log(JSON.stringify(dataGroup));

    var color = d3.scale.category10();

    // to handle negative values:
    var minimum_column_value = Math.min(d3.min(data, function(d) {return parseInt(d.row);}), 0);
    console.log("min value is:" + minimum_column_value);

    var vis = d3.select("#visualisation"),
        WIDTH = 1000,
        HEIGHT = 500,
        MARGINS = {
            top: 50,
            right: 20,
            bottom: 50,
            left: 50
        },

        // defining the legend space:
        lSpace = WIDTH/dataGroup.length;

        // defining 'range' and 'domain' for x axis to create scale:
        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1, d3.max(data, function(d) {
            return parseInt(d.col);
        })]),


        // defining 'range' and 'domain' for y axis to create scale:
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([minimum_column_value, d3.max(data, function(d) {
            return parseInt(d.row) + 10;
        })]),

        xAxis = d3.svg.axis()
        .scale(xScale).ticks(2),

        yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
    
    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);

    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);
        
    var lineGen = d3.svg.line()
        .x(function(d) {
            return xScale(d.col);
        })
        .y(function(d) {
            return yScale(d.row);
        })
        //.interpolate("basis");


    dataGroup.forEach(function(d,i) {
        vis.append('svg:path')
        .attr('d', lineGen(d.values))
        .attr('stroke', function(d,j) { 
                return "hsl(" + Math.random() * 360 + ",100%,50%)";
        })
        .attr('stroke-width', 2)
        .attr('id', 'line_'+d.key)
        .attr('fill', 'none');
        vis.append("text")
            .attr("x", (lSpace/2)+i*lSpace)
            .attr("y", HEIGHT - 10)
            .style("fill", d3.select("#line_" + d.key).style("stroke"))     // applying the same line color to the text
            .attr("class","legend")
            .on('click',function(){
                var active   = d.active ? false : true;
                var opacity = active ? 0 : 1;
                d3.select("#line_" + d.key).style("opacity", opacity);
                d.active = active;
            })
            .text(d.key);
    });
    
}



function update_data() {

    var number_of_columns = ($("th").length - 1), 
        number_of_cell = 0;

    // cycle through all the data cells and add them to data:
        
    $(".numeric").each(function() {
        
        var newObject = {};

        var Column_String = ':eq(' + ((number_of_cell%number_of_columns) + 1) + ')';    // find number of column
        newObject["Column"] =  $("tbody").children(':eq(0)').children(Column_String).children().val(); // it returns the value in the column header

        newObject["col"] = (parseInt(number_of_cell/number_of_columns) + 1) + '';

        newObject["row"] = $(this).val();

        // add new object to data array:

        data.push(newObject);

        number_of_cell++;
    });

    console.log(data);
}





// updating the graph:

function graph_update() {
    // clear data
    data = [];
    // create the new JSON object for updated data:
    update_data();
    // clear previous canvas:
    create_new_canvas();
    // draw and show the updated chart:
    DrawChart();
}



function hide_graph(header) {
    d3.select("#line_" + header).style("opacity", 0);
}


function show_graph(header) {
    d3.select("#line_" + header).style("opacity", 1);
}


// update graph when a cell data is changed:

$(document).on('change', '.numeric, .tableHeader', graph_update);









