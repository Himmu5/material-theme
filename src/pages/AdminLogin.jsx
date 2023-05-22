/* eslint-disable no-use-before-define */
import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import textLogo from '../../assets/text_logo.svg';
import LoginForm from '../components/admin-login/LoginForm';
import { login } from '../slices/adminAuth';
import loginSvg from '../../assets/login.svg';
import loginVector from '../../assets/loginvector.svg';
import { ToastContext } from '../components/contexts/ToastContext';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email!').required('Email is required!'),
  password: yup.string().required('Password is required!'),
});

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.adminAuth);
  const [loading, setLoading] = useState(false);
  const { createToast } = useContext(ToastContext);

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    // console.log(formValue)
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        createToast({ type: 'success', message: `Welcome back ${formik?.values?.email}` });
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, [1000]);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.code === 'ERR_NETWORK') {
          createToast({ type: 'error', message: 'Network error, try again!' });
        }
        console.log(err);
        if (
          err?.response?.data?.message
          && err.response.data.message === 'invalid credintials. please try again'
        ) createToast({ type: 'error', message: 'Invalid credentials, try again!' });
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isLoggedIn) {
      return navigate('/');
    }
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Box
        sx={{
          width: '50vw',
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            width: '40vw',
            height: '43vw',
            border: 2,
            opacity: 0.7,
            borderRadius: '50%',
            borderColor: '#E8EDF4',
            position: 'absolute',
            left: '-10vw',
            top: '-30vw',
          }}
        />
        <Box
          sx={{
            width: 'min(30vw,450px)',
            height: '12vw',
            position: 'relative',
          }}
        >
          <img
            src={textLogo}
            alt="logo"
            style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
          />
        </Box>

        <Box
          sx={{
            width: '45vw',
            height: '50vw',
            position: 'absolute',
            bottom: '-5vw',
            right: '-4vw',
            opacity: 0.8,
          }}
        >
          <img
            src={loginVector}
            alt="shape"
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          p: 10,
          bgcolor: '#E8EDF4',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            boxShadow: '0px 3.04038px 27.3634px rgba(0, 0, 0, 0.1)',
            bgcolor: '#ffffff',
          }}
        >
          <Box
            sx={{
              width: 'min(18vw,200px)',
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
              height: 'min(18vw,200px)',
              position: 'relative',
            }}
          >
            <img
              src={loginSvg}
              alt="login"
              style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
            />
          </Box>

          <LoginForm formik={formik} loading={loading} />
        </Box>
      </Box>
    </Box>
  );
}
