import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import useCountries from '~/hooks/useCountries';
import useEditCustomer from '~/modules/customers/hooks/useEditCustomer';
import { Customer } from '~/modules/customers/types';

interface EditFormProps {
  customer: Customer;
  title?: string;
  onCloseModal: () => void;
}

const EditForm: React.FC<EditFormProps> = (props: EditFormProps) => {
  const { title = 'Edit customer', onCloseModal } = props;
  const { register, getValues, errors, onSubmit, isSubmitSuccessful } = useEditCustomer(
    props.customer,
  );
  const { countries } = useCountries();
  useEffect(() => {
    isSubmitSuccessful && onCloseModal();
  }, [isSubmitSuccessful]);

  if (!getValues('countryId')) return <>loading</>;
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <Grid container spacing={2}>
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
            <FormControl fullWidth>
              <InputLabel id={'countryId'}>Country</InputLabel>
              <Select
                {...register('countryId')}
                labelId="countryId"
                label="Country"
                sx={{ width: '270px' }}
                required
                defaultValue={getValues('countryId')}
                error={!!errors.countryId}
              >
                <MenuItem value={''}>Choose an option</MenuItem>
                {countries?.map(({ id, name }) => (
                  <MenuItem key={id} value={id.toString()}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button onClick={onCloseModal} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </FormGroup>
    </form>
  );
};

export default EditForm;
