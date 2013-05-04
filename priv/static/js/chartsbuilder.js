/**
 * Charts utility for BigDesk.
 * @author Lukas Vlcek (twitter: @lukasvlcek)
 */
;
var chartsBuilder = (function() {

    var _default = {
        chart : {
            borderWidth: 1,
            borderColor : '#eee',
            plotBackgroundColor : '#f7f7f7',
            marginRight: 105,
            marginBottom: 30,
            marginTop: 35,
            spacingTop: 0,
            spacingRight: 0,
            spacingBottom: 0
        }
    };

    // use client local time
    Highcharts.setOptions({
    global: {
        useUTC: false
        }
    });

    var buildChColumn = function(renderTo) { 
		return new Highcharts.Chart({
			chart: {
			renderTo: renderTo,
			type: 'spline',
			marginRight: 10,			
			events: {
				load: function() {

					// set up the updating of the chart each second
					var series = this.series[0];
					setInterval(function() {
						var x = (new Date()).getTime(), // current time
							y = Math.random();
						series.addPoint([x, y], true, true);
					}, 1000);
				}
			}			
		},
		title: {
			text: 'Live random data'
		},
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150
		},
		yAxis: {
			title: {
				text: 'Value'
			},
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
		},
		tooltip: {
			formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
					Highcharts.numberFormat(this.y, 2);
			}
		},
		legend: {
			enabled: false
		},
		exporting: {
			enabled: false
		},
		series: [{
			name: 'Random data',
			data:[]
			/*
			data: (function() {
				// generate an array of random data
				var data = [],
					time = (new Date()).getTime(),
					i;

				for (i = -19; i <= 0; i++) {
					data.push({
						x: time + i * 1000,
						y: Math.random()
					});
				}
				return data;
			})()
		*/	
		}]
      
		});
   };
   
    var buildChSample = function(renderTo) { 
		return new Highcharts.Chart({
			chart : {
				renderTo : renderTo,
				type : 'column'
			},
			title : {
				text : 'Monthly Average Rainfall'
			},
			subtitle : {
				text : 'Source: WorldClimate.com'
			},
			xAxis : {
				categories : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Rainfall (mm)'
				}
			},
			legend : {
				layout : 'vertical',
				backgroundColor : '#FFFFFF',
				align : 'left',
				verticalAlign : 'top',
				x : 100,
				y : 70,
				floating : true,
				shadow : true
			},
			tooltip : {
				formatter : function() {
					return '' + this.x + ': ' + this.y + ' mm';
				}
			},
			plotOptions : {
				column : {
					pointPadding : 0.2,
					borderWidth : 0
				}
			},
			series : [{
				name : 'Tokyo',
				//data : [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
	            data:[]
			}, {
				name : 'New York',
				data : [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

			}, {
				name : 'London',
				data : [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

			}, {
				name : 'Berlin',
				data : [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

			}]
		});
   };


    return {
        buildChColumn : buildChColumn,        
        buildChSample : buildChSample,
    }
})();