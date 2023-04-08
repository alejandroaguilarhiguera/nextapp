import { Box, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';

const primary = red[500]; // #f44336

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h3" style={{ color: 'white' }}>
        401 | Unauthorized
      </Typography>
    </Box>
  );
}
