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

import { useTranslation } from '~/utils/i18n';

interface EditFormProps {
  customer: Customer;
  title?: string;
  onCloseModal: () => void;
}

const EditForm: React.FC<EditFormProps> = (props: EditFormProps) => {
  const { t } = useTranslation();
  const { title = t('edit customer'), onCloseModal } = props;
  const { register, getValues, errors, onSubmit, isSubmitSuccessful } = useEditCustomer(
    props.customer,
  );
  const { countries } = useCountries();
  useEffect(() => {
    isSubmitSuccessful && onCloseModal();
  }, [isSubmitSuccessful]);

  if (!getValues('countryId')) return <>{t('loading')}</>;
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register('name')}
              id="name"
              label={t('name')}
              type="name"
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
                defaultValue={getValues('countryId')}
                error={!!errors.countryId}
              >
                <MenuItem value={''}>{t('choose an option')}</MenuItem>
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

export default EditForm;
