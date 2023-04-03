import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Customer } from '~/modules/customers/types';

interface DetailsProps {
  customer: Customer;
}

const Details: React.FC<DetailsProps> = ({ customer }: DetailsProps) => {
  const fullName = [customer.name, customer.lastName].join(' ');

  return (<>
    <CardContent>
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {fullName}
    </Typography>
    <Typography variant="h5" component="div">
      {customer.country.name}
    </Typography>
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
      {customer.group.name}
    </Typography>
    <Typography variant="body2">
      {customer.licenseType.name}
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Learn More</Button>
  </CardActions>
  </>
  )
};

export default Details;
