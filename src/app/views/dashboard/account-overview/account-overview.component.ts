import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'mci-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  private chart: am4charts.PieChart;
  private navChart: am4charts.XYChart;
  top5WinnersList = [];
  top5LoosersList = [];

  constructor(private zone: NgZone) { }

  ngOnInit(): void {
    this.loadTop5Winners();
    this.loadTop5Loosers();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.loadAssetAllocationChart();
        this.loadPerformanceNavChart();
      }, 100);
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  loadAssetAllocationChart() {
    const chart = am4core.create('assetAllocationChart', am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0;
    chart.radius  = 70;

    chart.legend = new am4charts.Legend();

    chart.data = [
      {
        country: 'Cash',
        litres: 501.9
      },
      {
        country: 'Municipal',
        litres: 301.9
      },
      {
        country: 'Corporate',
        litres: 201.1

      },
      {
        country: 'CMO',
        litres: 165.8

      },
      {
        country: 'MBS',
        litres: 139.9
      },
    ];

    const series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'litres';
    series.dataFields.category = 'country';
    series.alignLabels = false;

    this.chart = chart;
  }

  loadTop5Winners() {
    this.top5WinnersList = [
      {
        name: 'Group 2 Trust',
        gain: 5,
        percent: 12
      },
      {
        name: 'Charland',
        gain: 5,
        percent: 9
      }, {
        name: 'Fin Service',
        gain: 3.5,
        percent: 19
      } , {
        name: 'Suprgrp',
        gain: 2,
        percent: 23
      } , {
        name: 'Siltek',
        gain: 1.75,
        percent: 15
      }
    ];
  }

  loadTop5Loosers() {
    this.top5LoosersList = [
      {
        name: 'Portfolio 6',
        gain: 5,
        percent: 12
      },
      {
        name: 'Portfolio 3',
        gain: 5,
        percent: 9
      }, {
        name: 'Portfolio 9',
        gain: 3.5,
        percent: 19
      } , {
        name: 'Portfolio 7',
        gain: 2,
        percent: 23
      } , {
        name: 'Portfolio 6',
        gain: 1.75,
        percent: 15
      }
    ];
  }

  loadPerformanceNavChart1() {
    var chart = am4core.create("performanceNavChart", am4charts.XYChart);
    chart.padding(0, 15, 0, 15);

    // Load external data
    chart.dataSource.url = "https://www.amcharts.com/wp-content/uploads/assets/stock/MSFT.csv";
    chart.dataSource.parser = new am4core.CSVParser();
    // chart.dataSource.parser.options.useColumnNames = true;
    // chart.dataSource.parser.options.reverse = true;

    // the following line makes value axes to be arranged vertically.
    chart.leftAxesContainer.layout = "vertical";

    // uncomment this line if you want to change order of axes
    //chart.bottomAxesContainer.reverseOrder = true;

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.ticks.template.length = 8;
    dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = false;
    dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
    dateAxis.renderer.minLabelPosition = 0.01;
    dateAxis.renderer.maxLabelPosition = 0.99;
    dateAxis.keepSelection = true;
    dateAxis.minHeight = 30;

    dateAxis.groupData = true;
    dateAxis.minZoomCount = 5;

    // these two lines makes the axis to be initially zoomed-in
    // dateAxis.start = 0.7;
    // dateAxis.keepSelection = true;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.zIndex = 1;
    valueAxis.renderer.baseGrid.disabled = true;
    // height of axis
    valueAxis.height = am4core.percent(65);

    valueAxis.renderer.gridContainer.background.fill = am4core.color("#000000");
    valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.verticalCenter = "bottom";
    valueAxis.renderer.labels.template.padding(2, 2, 2, 2);

    //valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.renderer.fontSize = "0.8em"

    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "Date";
    series.dataFields.valueY = "Adj Close";
    series.tooltipText = "{valueY.value}";
    series.name = "MSFT: Value";
    series.defaultState.transitionDuration = 0;

    var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.tooltip.disabled = true;
    // height of axis
    valueAxis2.height = am4core.percent(35);
    valueAxis2.zIndex = 3
    // this makes gap between panels
    valueAxis2.marginTop = 30;
    valueAxis2.renderer.baseGrid.disabled = true;
    valueAxis2.renderer.inside = true;
    valueAxis2.renderer.labels.template.verticalCenter = "bottom";
    valueAxis2.renderer.labels.template.padding(2, 2, 2, 2);
    //valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis2.renderer.fontSize = "0.8em"

    valueAxis2.renderer.gridContainer.background.fill = am4core.color("#000000");
    valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;

    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.dateX = "Date";
    series2.dataFields.valueY = "Volume";
    series2.yAxis = valueAxis2;
    series2.tooltipText = "{valueY.value}";
    series2.name = "MSFT: Volume";
    // volume should be summed
    series2.groupFields.valueY = "sum";
    series2.defaultState.transitionDuration = 0;

    chart.cursor = new am4charts.XYCursor();

    var scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    scrollbarX.marginBottom = 20;
    scrollbarX.scrollbarChart.xAxes.getIndex(0).minHeight = undefined;
    chart.scrollbarX = scrollbarX;

  }
  loadPerformanceNavChart() {
    var chart = am4core.create("performanceNavChart", am4charts.XYChart);

    // Add data
    chart.data = generatechartData();
    function generatechartData() {
      var chartData = [];
      var firstDate = new Date();
      firstDate.setDate( firstDate.getDate() - 150 );
      var visits = -40;
      var b = 0.6;
      for ( var i = 0; i < 150; i++ ) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date( firstDate );
        newDate.setDate( newDate.getDate() + i );
        if(i > 80){
            b = 0.4;
        }
        visits += Math.round((Math.random()<b?1:-1)*Math.random()*10);

        chartData.push( {
          date: newDate,
          visits: visits
        } );
      }
      return chartData;
    }

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.dateX = "date";
    series.strokeWidth = 3;
    series.tooltipText = "{valueY.value}";
    series.fillOpacity = 0.1;

    // Create a range to change stroke for values below 0
    var range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = -1000;
    range.contents.stroke = chart.colors.getIndex(4);
    range.contents.fill = range.contents.stroke;
    range.contents.strokeOpacity = 0.7;
    range.contents.fillOpacity = 0.1;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();

    series.tooltip.getFillFromObject = false;
    // series.tooltip.adapter.add("x", (x, target)=>{
    //     if(series.tooltip.tooltipDataItem.v < 0){
    //         series.tooltip.background.fill = chart.colors.getIndex(4);
    //     }
    //     else{
    //         series.tooltip.background.fill = chart.colors.getIndex(0);
    //     }
    //     return x;
    // });
  }
}
