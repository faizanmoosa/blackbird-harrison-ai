import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';

export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailLabel, setEmailLabel] = useState('Email Address');
  const [passwordLabel, setPasswordLabel] = useState('Password');
  const [emailHelper, setEmailHelper] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');
  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
  const validatePassword = (password) => {
    let check1 = false;
    let check2 = false;
    let check3 = false;
    let check4 = containsSpecialChars(password);

    if (password.length >= 8) {
      check1 = true;
    }

    for (let i = 0; i < password.length; i++) {
      if (password[i] == password[i].toUpperCase()) {
        check2 = true;
      }

      if (password[i] >= '0' && password[i] <= '9') {
        check3 = true;
      }
    }

    return check1 && check2 && check3 && check4;
  };
  function emailFunc() {
    setEmailError(true);
    setEmailLabel('Error');
    setEmailHelper('Incorrect entry.');
  }
  function passwordFunc() {
    setPasswordError(true);
    setPasswordLabel('Error');
    setPasswordHelper('Incorrect entry.');
  }
  const validateForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    var validator = require('email-validator');

    if (!validator.validate(email) && !validatePassword(password)) {
      emailFunc();
      passwordFunc();
      return false;
    }

    if (!validator.validate(email)) {
      emailFunc();
      return false;
    } else {
      setEmailError(false);
      setEmailLabel('Email Address');
      setEmailHelper('');
    }

    if (!validatePassword(password)) {
      passwordFunc();
      return false;
    } else {
      setPasswordError(false);
      setPasswordLabel('Password');
      setPasswordHelper('');
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if (validateForm(event)) {
      setShowAlert('Login Successful');
    }
  };

  return (
    <>
      {showAlert && (
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      )}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              my: 2,
            }}
          >
            <img src={logo} width='147' alt='harrison.ai' />
          </Box>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label={emailLabel}
              name='email'
              autoComplete='email'
              autoFocus
              error={emailError}
              helperText={emailHelper}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label={passwordLabel}
              type='password'
              id='password'
              autoComplete='current-password'
              error={passwordError}
              helperText={passwordHelper}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
