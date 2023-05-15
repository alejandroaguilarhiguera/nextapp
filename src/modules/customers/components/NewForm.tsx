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

import { useTranslation } from '~/utils/i18n';

interface NewFormProps {
  title: string;
  onCloseModal: () => void;
}

const NewForm: React.FC<NewFormProps> = (props: NewFormProps) => {
  const { t } = useTranslation();
  const { title = t('New customer'), onCloseModal } = props;
  const { register, errors, onSubmit, isSubmitSuccessful, getValues } = useAddCustomer();
  const { countries } = useCountries();
  useEffect(() => {
    isSubmitSuccessful && onCloseModal();
  }, [isSubmitSuccessful]);

  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register('name')}
              id="name"
              label={t('name')}
              error={!!errors.name?.message}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id={'countryId'}>{t('country')}</InputLabel>
              <Select
                {...register('countryId')}
                labelId="countryId"
                label={t('country')}
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
              {t('cancel')}
            </Button>
            <Button type="submit" variant="contained">
              {t('save')}
            </Button>
          </Grid>
        </Grid>
      </FormGroup>
    </form>
  );
};

export default NewForm;
