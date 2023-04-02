import React from 'react';
import { Button, Grid, TextField, FormGroup } from '@mui/material';
import useDoLogin from '~/modules/auth/hooks/useDoLogin';

interface LoginFormProps {   
}
  
const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const { register, errors, onSubmit } = useDoLogin();

  return (
    <form onSubmit={onSubmit}>
    <FormGroup>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <TextField
            {...register('identifier')}
            id="identifier"
            label="Email"
            type="email"
            error={!!errors.identifier?.message}
            helperText={errors.identifier?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('password')}
            id="password"
            label="Password"
            type="password"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">Enter</Button>
        </Grid>
      </Grid>
    </FormGroup>
    </form>
  )
};

export default LoginForm;
