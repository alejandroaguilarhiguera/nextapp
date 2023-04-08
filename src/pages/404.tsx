import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h3" style={{ color: 'black' }}>
        404 | Not found
      </Typography>
    </Box>
  );
}
