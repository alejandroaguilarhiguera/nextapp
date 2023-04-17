import { Box, Button, FormControl, Grid, Modal, Skeleton } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import EditForm from '~/modules/customers/components/EditForm';
import useCustomer from '~/modules/customers/hooks/useCustomer';

import Layout from '~/components/Layout';

interface Props {}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #fff',
  boxShadow: 24,
  p: 4,
};

const Edit: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const id = Number(router.query.id);
  const { customer, isLoading, isValidating } = useCustomer(id);
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    !open && router.back();
  }, [open]);

  if (isLoading || isValidating) {
    return (
      <Layout>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Skeleton animation="wave" height={60} />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Skeleton animation="wave" height={60} />
                </FormControl>
              </Grid>
              <Grid item>
                <Button disabled variant="outlined">
                  Cancel
                </Button>
                <Button disabled variant="contained">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Layout>
    );
  }
  if (!customer) {
    return <></>;
  }
  return (
    <Layout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditForm onCloseModal={handleClose} customer={customer} title="Edit customer" />
        </Box>
      </Modal>
    </Layout>
  );
};

export default Edit;
