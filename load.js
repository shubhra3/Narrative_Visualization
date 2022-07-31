/** CS416 Summer 2022 Narrative Visualization Project - WDI Indicators Dataset
 *  Utilizes D3.js to visualize access to water, electricity, and sanitation
 *  for various countries around the world, allowing us to guage growth and
 *  to easily discern areas in dire need of development. 
 */

// years, countries to query
const yearStart = 2000;
const yearEnd = 2019;
const countriesToLoad = 300;

const margin = {top: 32, right: 128, bottom: 64, left: 64};
const svgWidth = 900;
const svgHeight = 600;
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;
const inner_width  = width - margin.left - margin.right;
const inner_height = height - margin.top - margin.bottom;

var parseTime = d3.timeParse("%Y");
var formatValue = d3.format("");
var floatFormatValue = d3.format(".3n");

const type = {
    electricityUrban: 0,
    electricityRural: 1,
    sanitationUrban: 2,
    sanitationRural: 3,
    waterUrban: 4,
    waterRural: 5,
}

const chart = d3.select('#chart')
                .attr("width", svgWidth)
                .attr("height", svgHeight)

const lineGraph = chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// x, y values
var xScale = d3.scaleLinear().range([0,width]);
var yScale = d3.scaleLinear().range([height, 0]);    

// x, y axes
var xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
var yAxis = d3.axisLeft().scale(yScale);

var line = d3.line()
             .x(function(d) { return xScale(d.date);})
             .y(function(d) { return yScale(d.value);})
             .curve(d3.curveLinear);

// Add svg canvas
var g = lineGraph.append("g")
                 .attr("width", svgWidth)
                 .attr("height", svgHeight)
                 .attr("transform", `translate(${margin.left},${margin.top})`);    

$('.close').click(function() {
    $('.alert').hide();
})

$('.alert').hide();

$("#toScene2").click(function() {
    lineGraph.selectAll("g").remove();
    $('#Scene1').hide();
    $('#Scene2').show();    
    draw("CAN", false, 0);
    draw("CAN", false, 1);
    draw("CAN", false, 2);
    draw("CAN", false, 3);
    draw("CAN", false, 4);
    draw("CAN", false, 5);
})

$("#toScene3").click(function() {
    lineGraph.selectAll("g").remove();
    $('#Scene2').hide();
    $('#Scene3').show();
    draw("CHN", false, 0);
    draw("CHN", false, 1);
    draw("CHN", false, 2);
    draw("CHN", false, 3);
    draw("CHN", false, 4);
    draw("CHN", false, 5);
})

$("#toScene4").click(function() {
    lineGraph.selectAll("g").remove();
    $('#Scene3').hide();
    $('#Scene4').show();
    draw("IND", false, 0);
    draw("IND", false, 1);
    draw("IND", false, 2);
    draw("IND", false, 3);
    draw("IND", false, 4);
    draw("IND", false, 5);
})

$("#toScene5").click(function() {
    lineGraph.selectAll("g").remove();
    $('#Scene4').hide();
    $('#Scene5').show();
    draw("NGA", false, 0);
    draw("NGA", false, 1);
    draw("NGA", false, 2);
    draw("NGA", false, 3);
    draw("NGA", false, 4);
    draw("NGA", false, 5);
})

$("#toScene6").click(function() {
    lineGraph.selectAll("g").remove();
    $('#Scene5').hide();
    loadCountries(generateListOfCountries);
    $('#Scene6').show();
    draw("WLD", true, 0);
    draw("WLD", true, 1);
    draw("WLD", true, 2);
    draw("WLD", true, 3);
    draw("WLD", true, 4);
    draw("WLD", true, 5);
})

$("#startOver").click(function() {
    lineGraph.selectAll("g").remove();
    $('#Scene6').hide();
    $("#country").hide();
    $("#Scene1").show();
    draw("WLD", false, 0);
    draw("WLD", false, 1);
    draw("WLD", false, 2);
    draw("WLD", false, 3);
    draw("WLD", false, 4);
    draw("WLD", false, 5);
})

$("#clearGraph").click(function() {
    lineGraph.selectAll("g").remove();
    $('#Scene6').show();
    draw("WLD", false, 0);
    draw("WLD", false, 1);
    draw("WLD", false, 2);
    draw("WLD", false, 3);
    draw("WLD", false, 4);
    draw("WLD", false, 5);
})

$("input[name='type']").click(function() {
    draw('WLD', $('input:radio[name=type]:checked').val());
})

$('#closeAlert').on('click', function() {
    $("#showAlert").hide();  
});

function load() {
    d3.json("https://api.worldbank.org/v2/country/all/indicator/SL.EMP.WORK.ZS?format=json&per_page=60&date=" + yearStart + ":" + yearEnd).then(function(d) {});
}


function loadCountries(callback) {
    if (typeof callback !== "function") throw new Error("Wrong callback in loadCountries");
    d3.json("https://api.worldbank.org/v2/country?format=json&per_page=" + countriesToLoad).then(callback);
}

// load queried data a given a country's code
function loadElectricityUrbanByCountryCode(countryCode, callback) {
    d3.json("https://api.worldbank.org/v2/country/" + countryCode + "/indicator/EG.ELC.ACCS.UR.ZS?format=json&per_page=60&date=" + yearStart + ":" + yearEnd)
      .then(callback);
}
function loadElectricityRuralByCountryCode(countryCode, callback) {
    d3.json("https://api.worldbank.org/v2/country/" + countryCode + "/indicator/EG.ELC.ACCS.RU.ZS?format=json&per_page=60&date=" + yearStart + ":" + yearEnd)
      .then(callback);
}
function loadSanitationUrbanByCountryCode(countryCode, callback) {
    d3.json("https://api.worldbank.org/v2/country/" + countryCode + "/indicator/SH.STA.BASS.UR.ZS?format=json&per_page=60&date=" + yearStart + ":" + yearEnd)
      .then(callback);
}
function loadSanitationRuralByCountryCode(countryCode, callback) {
    d3.json("https://api.worldbank.org/v2/country/" + countryCode + "/indicator/SH.STA.BASS.RU.ZS?format=json&per_page=60&date=" + yearStart + ":" + yearEnd)
      .then(callback);
}
function loadWaterUrbanByCountryCode(countryCode, callback) {
    d3.json("https://api.worldbank.org/v2/country/" + countryCode + "/indicator/SH.H2O.BASW.UR.ZS?format=json&per_page=60&date=" + yearStart + ":" + yearEnd)
      .then(callback);
}
function loadWaterRuralByCountryCode(countryCode, callback) {
    d3.json("https://api.worldbank.org/v2/country/" + countryCode + "/indicator/SH.H2O.BASW.RU.ZS?format=json&per_page=60&date=" + yearStart + ":" + yearEnd)
      .then(callback);
}

/**
 * 
 * @param countryCode: 3-digit country code
 * @param type: 
        const type = {
            electricityUrban: 0,
            electricityRural: 1,
            sanitationUrban: 2,
            sanitationRural: 3,
            waterUrban: 4,
            waterRural: 5,
        }
 * @param callback: callback function  
 */
function loadIndicatorByCountryCode(countryCode, type, callback) {
    if (type == "electricityUrban") {
        loadElectricityUrbanByCountryCode(countryCode, callback);
    } else if (type == "electricityRural") {
        loadElectricityRuralByCountryCode(countryCode, callback);
    } else if (type == "sanitationUrban") {
        loadSanitationUrbanByCountryCode(countryCode, callback);
    } else if (type == "sanitationRural") {
        loadSanitationRuralByCountryCode(countryCode, callback);
    } else if (type == "waterUrban") {
        loadWaterUrbanByCountryCode(countryCode, callback);
    } else if (type == "waterRural") {
        loadWaterRuralByCountryCode(countryCode, callback);
    } else {
        console.error("Invalid type parameter.", type);
    }
}

/**
 * callback function
 * @param countryCode: 3-digit country code to query within WDI dataset
 * @param countryLabel: true or false for drawing line tooltip 
 * @param type 
         const type = {
            electricityUrban: 0,
            electricityRural: 1,
            sanitationUrban: 2,
            sanitationRural: 3,
            waterUrban: 4,
            waterRural: 5,
        }
 */
function draw(countryCode, countryLabel, type) {
    if (type == 0) {
        loadIndicatorByCountryCode(countryCode, "electricityUrban", drawGraph(countryCode, countryLabel, "DarkGreen"));
    } else if (type == 1) {
        loadIndicatorByCountryCode(countryCode, "electricityRural", drawGraph(countryCode, countryLabel, "LimeGreen"));
    } else if (type == 2) {
        loadIndicatorByCountryCode(countryCode, "sanitationUrban", drawGraph(countryCode, countryLabel, "Crimson"));
    } else if (type == 3) {
        loadIndicatorByCountryCode(countryCode, "sanitationRural", drawGraph(countryCode, countryLabel, "Coral"));
    } else if (type == 4) {
        loadIndicatorByCountryCode(countryCode, "waterUrban", drawGraph(countryCode, countryLabel, "RoyalBlue"));
    } else if (type == 5) {
        loadIndicatorByCountryCode(countryCode, "waterRural", drawGraph(countryCode, countryLabel, "SkyBlue"));
    } else {
        console.log("Error within draw() function, type:", type);
    }
}


/**
 * callback function to process d3.json() objects
 * @param countryCode: 3-digit country code to draw a linechart and also for label.
 * @param countryLabel: true of false for drawing line tooltip 
 * @param color: color string to to draw line chart. e.g, "red", "black", etc.
 */
function drawGraph(countryCode, countryLabel, color) {

    return function(data) {
        if (data == null || data[1] == null) {
            $('.alert').show();
            return;
        } else if (data[1].every(item => item["value"] == null)) {
            $('.alert').show();
            return;
        } else if (data[1].every(item => item["value"] == 0)) {
            $('.alert').show();
            return;
        }

        xScale.domain(d3.extent(data[1], function(d) { return d.date; }));
        yScale.domain([0, 100]);

        // Add x axis
        lineGraph.append('g')
                 .attr('transform', "translate(0," + height + ")")
                 .call(xAxis);
        lineGraph.append("text")             
                 .attr("transform",
                     "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
                 .style("text-anchor", "middle")
                 .text("Year");

        // Add y axis
        lineGraph.append('g')
                 .call(yAxis)
                 .attr("y", 6);
        lineGraph.append("text")
                 .attr("transform", "rotate(-90)")
                 .attr("y", 0 - margin.left)
                 .attr("x", 0 - (height / 2))
                 .attr("dy", "1em")
                 .style("text-anchor", "middle")
                 .text("Percentage");

        // D3 tooltip for datapoints 
        tip = d3.tip().attr('class', 'd3-tip').offset([-5, 5]).html(function(d) {
            return "<strong style='color:" + color + "'>" + countryCode + ": " + floatFormatValue(d.value)  + "</strong>"; 
        });   

        var path = lineGraph.append("g").append("path")
                            .attr("width", width).attr("height",height)
                            .datum(data[1].map((d, i) => {
                                return {
                                    date : d.date,
                                    value : d.value
                                };
                            }))
                            .attr("class", "line")
                            .attr("d", line)
                            .style("stroke", color);        

        lineGraph.append("g").selectAll(".dot")
                 .attr("width", width).attr("height",height)
                 .data(data[1]).enter().append("circle")
                 .attr("class", "dot") // assign class for css styling
                 .attr("cx", function(d) { return xScale(d.date); })
                 .attr("cy", function(d) { return yScale(d.value); })
                 .attr("r", 2.5).call(tip)
                 .on('mouseover', tip.show)
                 .on('mouseout', tip.hide);
    }
}

// callback function to add countries
function generateListOfCountries(data, i) {
    d3.select("body").select("#select_country").select("select").remove()

    d3.select("body")
      .select("#select_country")
      .append("select")
      .attr("id", "country")
      .selectAll("options")
      .data(data[1]).enter()
      .append("option")
      .attr("value", function(d) { return d.id; })
      .text(function (d, i) {return d.name;});

    d3.select("body").select("#select_country")
      .select("select").on("change", function() {
            draw(
                d3.select(this).property('value'), true,
                d3.select('input[name=type]:checked').node().value
            );
    });
}
