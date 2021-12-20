import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4lang_fi_FI from '@amcharts/amcharts4/lang/fi_FI';
import { styled } from '@mui/material/styles';

const Chart = styled('div')({
  width: '100%', 
  height: '100%',
});

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

      chartRef.current.dateFormatter.dateFormat = 'd/M/yy';
      chartRef.current.language.locale = am4lang_fi_FI;
      chartRef.current.logo.disabled = true;

      let dateAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());
      dateAxis.dateFormats.setKey('day', 'd/M/yy');
      dateAxis.periodChangeDateFormats.setKey('day', 'd/M/yy');
      dateAxis.groupData = true;

      let valueAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      
      let series = chartRef.current.series.push(new am4charts.LineSeries());

      // const bullet = series.bullets.push(new am4charts.CircleBullet());
      // bullet.circle.stroke = am4core.color("#fff");
      // bullet.circle.strokeWidth = 4;

      // let circle = bullet.createChild(am4core.Circle);
      // circle.width = 8;
      // circle.height = 8;
      // let bullethover = bullet.states.create("hover");
      // bullethover.properties.scale = 1.3;

      series.dataFields.dateX = 'created_at';
      series.dataFields.valueY = 'humidity';
      series.dataFields.openValueY = 'temperature';
      series.tooltipText = 'lämpötila: {openValueY.value} kosteus: {valueY.value}';
      series.sequencedInterpolation = true;
      series.fillOpacity = 0.2;
      series.defaultState.transitionDuration = 1000;
      series.tensionX = 0.8;
      series.dateFormatter.dateFormat = 'd/M/yy';
      series.name = 'Kosteus %';

      series.events.once('datavalidated', () => {
        const lastDate = new Date(data[data.length - 1].created_at);
        const firstDate = new Date(lastDate.getTime() - 3600000);
        dateAxis.zoomToDates(firstDate, lastDate);
      })
      
      let series2 = chartRef.current.series.push(new am4charts.LineSeries());
      series2.stroke = am4core.color("red");
      
      // let bullet2 = series2.bullets.push(new am4charts.CircleBullet());
      // bullet2.circle.stroke = am4core.color("#fff");
      // bullet2.circle.strokeWidth = 4;

      // let circle2 = bullet2.createChild(am4core.Circle);
      // circle2.fill = am4core.color("red");
      // circle2.width = 8;
      // circle2.height = 8;
      // let bullethover2 = bullet2.states.create("hover");
      // bullethover2.properties.scale = 1.3;
      
      series2.dataFields.dateX = 'created_at';
      series2.dataFields.valueY = 'temperature';
      series2.sequencedInterpolation = true;
      series2.defaultState.transitionDuration = 1500;
      series2.tensionX = 0.8;
      series2.dateFormatter.dateFormat = 'd/M/yy';
      series2.name = 'Lämpötila °C';
      
      chartRef.current.cursor = new am4charts.XYCursor();
      chartRef.current.cursor.xAxis = dateAxis;
      let scrollbar = new am4charts.XYChartScrollbar();
      scrollbar.series.push(series);
      chartRef.current.scrollbarX = scrollbar;

      chartRef.current.legend = new am4charts.Legend();
      chartRef.current.legend.position = 'bottom';
    }

    return () => {
      chartRef.current && chartRef.current.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Chart id={elementId} />
  );
};

export default LineChart;