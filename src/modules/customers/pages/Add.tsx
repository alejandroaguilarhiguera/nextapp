import { Box, Modal } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import NewForm from '~/modules/customers/components/NewForm';

import Layout from '~/components/Layout';
import { useTranslation } from '~/utils/i18n';

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

interface Props {}

const Add: NextPage<Props> = (props: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    !open && router.back();
  }, [open]);
  return (
    <Layout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewForm onCloseModal={handleClose} title={t('New customer')} />
        </Box>
      </Modal>
    </Layout>
  );
};

export default Add;
