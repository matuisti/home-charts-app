import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import LineChart from '../Charts/LineChart';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import { getSensorData } from '../../api/api';

const CurrentDataGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
});

const ValueBox = styled(Paper)({
  padding: 20,
});

const LineChartContainer = styled(Paper)({
  marginTop: 20,
  marginBottom: 40,
});

const Overview = () => {
  const [state, setState] = useState({
    loading: true,
    sensorData: [],
    current: null
  });

  useEffect(() => {
    getSensorData().then((response) => {
      setState({
        ...state,
        sensorData: response,
        current: response[response.length -1],
        loading: false
      });
    }).catch((err) => {
      console.log(err);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !state.loading ? (
    <Container disableGutters={false} maxWidth="lg">
      <Box pt={2}>
        <CurrentDataGrid container spacing={2}>
          <Grid item xs={6} md={4}>
            <ValueBox>
              <DeviceThermostatIcon sx={{ padding: '11px', boxShadow: 6, borderRadius: '50%' }} fontSize="large" />
              <Typography pt={1} variant="h4">{state.current.temperature}°C</Typography>
              <Typography>lämpötila nyt</Typography>
            </ValueBox>
          </Grid>
          <Grid item xs={6} md={4}>
            <ValueBox>
              <InvertColorsIcon sx={{ padding: '11px', boxShadow: 6, borderRadius: '50%' }} fontSize="large" />
              <Typography pt={1} variant="h4">{state.current.humidity}°C</Typography>
              <Typography>kosteus nyt</Typography>
            </ValueBox>
          </Grid>
        </CurrentDataGrid>
        <LineChartContainer xs={12} md={12}>
          <LineChart 
            elementId='line-chart-body'
            data={state.sensorData} 
          />
        </LineChartContainer>
      </Box>
    </Container>
  ) : null;
};

export default Overview;