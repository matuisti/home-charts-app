import React, { useEffect, useState } from 'react';
import { getSensorData } from '../../api/api';
import LineChart from '../Charts/LineChart';

const Overview = () => {
  const [state, setState] = useState({
    loading: true,
    lineChartData: []
  });

  useEffect(() => {
    getSensorData().then((response) => {
      setState({
        ...state,
        lineChartData: response,
        loading: false
      });
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div>
      { !state.loading &&
      <LineChart 
        elementId={'line-chart-body'}
        data={state.lineChartData} />}
    </div>
  );
};

export default Overview;