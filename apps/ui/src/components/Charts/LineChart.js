import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

const LineChart = ({ elementId, data }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    if (!chartRef.current) {
      chartRef.current = am4core.create(elementId, am4charts.XYChart);
      chartRef.current.data = data;
      chartRef.current.data = chartRef.current.data.map(element => {
        element.created_at = new Date(element.created_at * 1000);
        return element;
      });

      var dateAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());
      var valueAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;

      //valueAxis.min = 0;
      
      var series = chartRef.current.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "created_at";
      series.dataFields.openValueY = "temperature";
      series.dataFields.valueY = "humidity";
      series.tooltipText = "temperature: {openValueY.value} humidity: {valueY.value}";
      series.sequencedInterpolation = true;
      series.fillOpacity = 0.3;
      series.defaultState.transitionDuration = 1000;
      series.tensionX = 0.8;
      
      var series2 = chartRef.current.series.push(new am4charts.LineSeries());
      series2.dataFields.dateX = "created_at";
      series2.dataFields.valueY = "temperature";
      series2.sequencedInterpolation = true;
      series2.defaultState.transitionDuration = 1500;
      series2.stroke = chartRef.current.colors.getIndex(6);
      series2.tensionX = 0.8;
      
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