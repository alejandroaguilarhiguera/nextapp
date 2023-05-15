import { MoreVert } from '@mui/icons-material';
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { mutate } from 'swr';
import useCustomers from '~/modules/customers/hooks/useCustomers';
import useDeleteCustomer from '~/modules/customers/hooks/useDeleteCustomer';

import { useTranslation } from '~/utils/i18n';

interface CustomerTableProps {}

const CustomerTable: React.FC<CustomerTableProps> = (props: CustomerTableProps) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [customerId, setCustomerId] = React.useState<number>(0);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const { customers } = useCustomers();
  const { onDelete } = useDeleteCustomer();
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('country')}</TableCell>
              <TableCell>{t('options')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers?.map((customer) => (
              <TableRow
                key={customer.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="customer">
                  {customer.name}
                </TableCell>
                <TableCell component="th" scope="customer">
                  {customer.country?.name}
                </TableCell>
                <TableCell component="th" scope="customer">
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(e) => {
                      setCustomerId(customer.id);
                      handleClick(e);
                    }}
                    aria-label="Open to show more"
                    title="Open to show more"
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link href={`customers/edit/${customerId}`}>{t('edit')}</Link>
        </MenuItem>
        <MenuItem>
          <Link href={`customers/${customerId}`}>{t('details')}</Link>
        </MenuItem>
        <MenuItem
          sx={{ color: 'red' }}
          onClick={async () => {
            setAnchorEl(null);
            const payload = await onDelete({ id: customerId });
            if (payload.id) {
              mutate(
                '/customers',
                customers?.filter(({ id }) => id !== payload.id),
                false,
              );
            }
          }}
        >
          <Typography className="capitalize">{t('delete')}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CustomerTable;
