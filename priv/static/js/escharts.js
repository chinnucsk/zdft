;(function() {
	var chart;
	//var chCacheSize = chartsBuilder.buildChCacheSize("chart");

	/*
	"entries" : [ {
	"time" : 1293840000000,
	"count" : 1
	}, {
	"time" : 1293926400000,
	"count" : 2
	}, ...*/
	//var chart;
	//chart = chartsBuilder.buildChColumn("chart");
	$.ajax({
		url : 'http://10.34.130.31:9200/dashboard/article/_search?pretty=true',
		type : 'POST',
		data : JSON.stringify({
			"query" : {
				"match_all" : {}
			},
			"facets" : {
				"published_on" : {
					"date_histogram" : {
						"field" : "published",
						"interval" : "day"
					}
				}
			}
		}),
		dataType : 'json',
		processData : false,
		success : function(json, statusText, xhr) {
			return buildDateHistFacetChart(json, "chart");
		},
		error : function(xhr, message, error) {
			console.error("Error while loading data from ElasticSearch", message);
			throw (error);
		}
	});

	function buildDateHistFacetChart(json, renderTo) {

		var options = {
			chart : {
				renderTo : renderTo,
				type : 'areaspline', //line, spline, area, areaspline, column, bar, pie and scatter
				marginRight : 10,

			},
			title : {
				text : 'Published_on Count'
			},
			xAxis : {
				type : 'datetime',
				tickPixelInterval : 150
			},
			yAxis : {
				title : {
					text : 'Count'
				},
				plotLines : [{
					value : 0,
					width : 1,
					color : '#808080'
				}]
			},
			tooltip : {
				formatter : function() {
					return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + Highcharts.numberFormat(this.y, 2);
				}
			},
			legend : {
				enabled : false
			},
			exporting : {
				enabled : false
			},
			series : []
		};

		var entries = json.facets.published_on.entries;

		var series = {
			data : (function() {
				var data = [];
				for( i = 0; i <= entries.length - 1; i++) {
					data.push({
						x : entries[i].time,
						y : entries[i].count
					});
				}
				return data;
			})()
		};

		options.series.push(series);
		chart = new Highcharts.Chart(options);
	};

	//Bind event handler
	$('#chart_type').change(function() {
		//var type1 = $(this).children('option:selected').val();
		var type = $('#chart_type').val();
		var options = chart.options;
		chart.destroy();
		options.chart.type = type;
		chart = new Highcharts.Chart(options);
	});

	$('#search').click(function() {
		//var type1 = $(this).children('option:selected').val();
		var searchString = $('#queryString').val();
		jQuery.ajax({
			url : 'http://10.34.130.31:9200/_search?pretty=true',
			type : 'POST',
			data : JSON.stringify({
				"query" : {
					"query_string" : {
						"query" : searchString
					}
				}

			}),
			dataType : 'json',
			processData : false,
			success : function(json, statusText, xhr) {
				return displaySearchResult(json, "searchResult");
			},
			error : function(xhr, message, error) {
				console.error("Error while loading data from ElasticSearch", message);
				throw (error);
			}
		});

	});
	
	function displaySearchResult(json, renderTo) {
		var total = json.hits.total;		
		alert("search result:"+total);
		$('#searchResult').html(JSON.stringify(json));
		
	};

})();
