import { Button, FormGroup, Grid, Paper, TextField } from '@mui/material';
import React from 'react';
import useDoLogin from '~/modules/auth/hooks/useDoLogin';

import { useTranslation } from '~/utils/i18n';

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const { t } = useTranslation();
  const { register, errors, onSubmit } = useDoLogin();
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <Paper style={{ padding: 40 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register('identifier')}
                id="identifier"
                label={t('email')}
                type="email"
                error={!!errors.identifier?.message}
                helperText={errors.identifier?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register('password')}
                id="password"
                label={t('password')}
                type="password"
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item>
              <Button fullWidth type="submit" variant="contained">
                {t('enter')}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </FormGroup>
    </form>
  );
};

export default LoginForm;
