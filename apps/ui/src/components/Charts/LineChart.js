import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4lang_fi_FI from "@amcharts/amcharts4/lang/fi_FI";


const LineChart = ({ elementId, data }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) {
      chartRef.current = am4core.create(elementId, am4charts.XYChart);
      chartRef.current.data = data;
      chartRef.current.data = chartRef.current.data.map(element => {
        element.created_at = new Date(parseInt(element.created_at))
        return element;
      });

      chartRef.current.dateFormatter.dateFormat = "d/M/yy";
      chartRef.current.language.locale = am4lang_fi_FI;
      chartRef.current.logo.disabled = true;

      var dateAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());
      dateAxis.dateFormats.setKey("day", "d/M/yy");
      dateAxis.periodChangeDateFormats.setKey("day", "d/M/yy");
      dateAxis.groupData = true;


      var valueAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;

      //valueAxis.min = 0;
      
      var series = chartRef.current.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "created_at";
      series.dataFields.valueY = "humidity";
      series.dataFields.openValueY = "temperature";
      series.tooltipText = "temperature: {openValueY.value} humidity: {valueY.value}";
      series.sequencedInterpolation = true;
      series.fillOpacity = 0.3;
      series.defaultState.transitionDuration = 1000;
      series.tensionX = 0.8;
      series.dateFormatter.dateFormat = "d/M/yy";
      series.name = "Lämpötila °C"
      
      var series2 = chartRef.current.series.push(new am4charts.LineSeries());
      series2.dataFields.dateX = "created_at";
      series2.dataFields.valueY = "temperature";
      series2.sequencedInterpolation = true;
      series2.defaultState.transitionDuration = 1500;
      series2.stroke = chartRef.current.colors.getIndex(6);
      series2.tensionX = 0.8;
      series2.dateFormatter.dateFormat = "d/M/yy";
      series2.name = "Kosteus %"
      
      chartRef.current.cursor = new am4charts.XYCursor();
      chartRef.current.cursor.xAxis = dateAxis;
      chartRef.current.scrollbarX = new am4core.Scrollbar();

      chartRef.current.legend = new am4charts.Legend();
      chartRef.current.legend.position = "bottom";
    }

    return () => {
      chartRef.current && chartRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = data;
    }
  }, [data]);

  useEffect(() => {
    return () => {
      chartRef.current && chartRef.current.dispose();
    };
  }, []);

  return (
    <div id={elementId} style={{ width: "100%", height: "700px" }} />
  );
};

export default LineChart;