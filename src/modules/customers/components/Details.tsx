import React from 'react';
import {
    Grid,
    Paper
 } from '@mui/material';


interface DetailsProps {   
}
  
const Details: React.FC<DetailsProps> = (props: DetailsProps) => {
  return (<Grid container spacing={2}>
      <Grid item xs={12}>

          <Paper elevation={3}>Details</Paper>
      </Grid>
  </Grid>
  )
};

export default Details;
