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
import useAddCustomer from '~/modules/customers/hooks/useAddCustomer';

interface NewFormProps {
  title: string;
  onCloseModal: () => void;
}

const NewForm: React.FC<NewFormProps> = (props: NewFormProps) => {
  const { title = 'New customer', onCloseModal } = props;
  const { register, errors, onSubmit, isSubmitSuccessful, getValues } = useAddCustomer();
  const { countries } = useCountries();
  useEffect(() => {
    isSubmitSuccessful && onCloseModal();
  }, [isSubmitSuccessful]);

  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        {/* <Grid container spacing={2} columnSpacing={2} rowSpacing={2}>
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
            <Button onClick={onCloseModal} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid> */}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register('name')}
              id="name"
              label="Name"
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
                error={!!errors.countryId}
              >
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

export default NewForm;
