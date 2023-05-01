import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import textLogo from '../../assets/text_logo.svg';
import LoginForm from '../components/admin-login/LoginForm';
import { login } from '../slices/adminAuth';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Enter a valid email!').required('This field is required!'),
  password: Yup.string().required('This field is required!'),
});

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.adminAuth);
  const [loading, setLoading] = useState(false);
  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    // console.log(formValue)
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/');
        // window.location.reload();
        // toast.success('Succesfully logged in');
        setLoading(false);
        console.log('logged in!');
      })
      .catch((err) => {
        // toast.error(Errormessage.message);
        console.log(err);
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
      <Box sx={{ flex: '0 0 50%', bgcolor: 'primary.main' }} />
      <Box
        sx={{
          flex: '0 0 50%',
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
              width: 'min(35vw,440px)',
              height: 'min(15vw,180px)',
              position: 'relative',
            }}
          >
            <img
              src={textLogo}
              alt="logo"
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </Box>

          <LoginForm formik={formik} loading={loading} />
        </Box>
      </Box>
    </Box>
  );
}
