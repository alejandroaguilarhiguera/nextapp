import React, { useEffect } from 'react';
import { Button, Grid, TextField, FormGroup } from '@mui/material';
import useAddCustomer from '~/modules/customers/hooks/useAddCustomer';

interface NewFormProps {
  title: string;
  onCloseModal: () => void;
}
  
const NewForm: React.FC<NewFormProps> = (props: NewFormProps) => {
  const { title = 'New customer', onCloseModal } = props;
  const { register, errors, onSubmit, isSubmitSuccessful } = useAddCustomer();
  useEffect(() => {
    isSubmitSuccessful && onCloseModal();      
  },[isSubmitSuccessful]);
    return (
      <form onSubmit={onSubmit}>
        <FormGroup>
          <Grid container spacing={2} columnSpacing={2} rowSpacing={2}>
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
            <Grid item xs={12}>
              <Button onClick={onCloseModal} variant="outlined">Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </Grid>
          </Grid>
        </FormGroup>
      </form>
    )
};

export default NewForm;
