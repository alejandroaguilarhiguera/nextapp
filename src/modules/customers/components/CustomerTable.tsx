import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Menu,
    MenuItem,
 } from '@mui/material';
 import { MoreVert } from '@mui/icons-material';
import useCustomers from '~/modules/customers/hooks/useCustomers';
import useDeleteCustomer from '~/modules/customers/hooks/useDeleteCustomer';

interface CustomerTableProps {   
}
  
const CustomerTable: React.FC<CustomerTableProps> = (props: CustomerTableProps) => {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Options</TableCell>
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
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={async () => {
                    const payload = await onDelete({ id: customerId });
                    if (payload.id) {
                      // TODO: Re-render
                    }
                    }}>
                     Delete
                  </MenuItem>
                </Menu>
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default CustomerTable;
