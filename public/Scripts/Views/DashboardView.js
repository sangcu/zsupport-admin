Support.Me.DashboardView = Ember.View.extend({
	templateName:'Dashboard',
	dataBinding:'controller.trafficModel',	
	didInsertElement:function(){

		var language=this.get("controller.language");

		console.log('Dashboard did insert');
		var self=this;
		     // Set a callback to run when the Google Visualization API is loaded.
      


      // Callback that creates and populates a data table, 
      // instantiates the pie chart, passes in the data and
      // draws it.
      	function drawChart() {

		      // Create the data table.
		      var data = new google.visualization.DataTable();
		      data.addColumn('string', 'Topping');
		      data.addColumn('number', 'Slices');
		      data.addRows([
		        [language.Connected, 250],
		        [language.Drop, 50],        
		        [language.Completed, 240]
		      ]);

		      // Set chart options
		      var options = {
		      				'legend':'center',
		      				animation:{
						        duration: 5000,
						        easing: 'out',
						      },
		                     'width':400,
		                     'height':250};

		      // Instantiate and draw our chart, passing in some options.
		      var chart = new google.visualization.PieChart(document.getElementById('statusChart'));
		      chart.draw(data, options);
	    }

    	function drawChartLines(){

	        var data = google.visualization.arrayToDataTable([
	          [language.Day, language.Traffic, language.Connected],
	          ['1',  1000,      950],
	          ['2',  1170,      1167],
	          ['3',  1660,       1120],
	          ['4',  8660,       7080],
	          ['5',  2660,       1576],
	          ['6',  660,       500],
	          ['7',  7660,       7660],
	          ['8',  9660,       8790],
	          ['9',  1660,       1587],
	          ['10',  3660,       3126],
	          ['11',  160,       130],
	          ['12',  2660,       1020],
	          ['13',  9660,       1820],
	          ['14',  6660,       1120],
	          ['15',  3660,       1920],
	          ['16',  7660,       1120],
	          ['17',  2030,      540]
	        ]);

	        var options = {	          	          
	          animation:{
		        duration: 5000,
		        easing: 'out',
		      }
	        };

	        var chart = new google.visualization.LineChart(document.getElementById('trafficChart'));
	        chart.draw(data, options);
	    }

	    Ember.run.scheduleOnce('afterRender', this, function(){
			google.setOnLoadCallback(drawChart);
			
			if(google && google.visualization &&google.visualization.PieChart){
	    		drawChart();
	    		drawChartLines();
	    	}

	    });
	}
});
Em.TEMPLATES["Dashboard"] = Em.Handlebars.compile(
	'<div class="dashboard-container">'+		
		'<div><div class="chartbox header-chart">{{language.TrafficMonitor}}</div><div id="trafficChart"  style="width:100%;height:300px"></div></div>'+    
		'<div><div class="chartbox header-chart">{{language.TicketStatus}}</div><div id="statusChart" style="width:400px;height:250px"></div></div>'+    
		'<div><div class="chartbox header-chart">{{language.EmployeeStatistic}}</div><div id="employeeChart"></div></div>'+    
	'</div>'
);