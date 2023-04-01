import React, { useEffect } from 'react';
import { Button, Grid, TextField, FormGroup } from '@mui/material';
import { Customer } from '~/modules/customers/types';
import useEditCustomer from '~/modules/customers/hooks/useEditCustomer';

interface EditFormProps {
  customer: Customer;
  title?: string;
  onCloseModal: () => void;
}

const EditForm: React.FC<EditFormProps> = (props: EditFormProps) => {
  const { customer, title = "Edit customer", onCloseModal } = props;
    const { register, errors, onSubmit, isSubmitSuccessful } = useEditCustomer(customer);
    useEffect(() => {
      isSubmitSuccessful && onCloseModal();      
    },[isSubmitSuccessful]);
    return (
    <form onSubmit={onSubmit}>
    <FormGroup>
      <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
            {...register('id')}
            id="id"
            label="Id"
            type="id"
            error={!!errors.id?.message}
            helperText={errors.id?.message}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
            {...register('name')}
            id="name"
            label="Name"
            type="name"
            error={!!errors.name?.message}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item>
          <Button onClick={onCloseModal} variant="outlined">Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </Grid>
      </Grid>
      </FormGroup>
    </form>
  )
};

export default EditForm;
