import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { toast } from 'react-hot-toast';
import { useSignIn } from 'react-auth-kit';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import { login, setUpRecaptcha } from '../../../store/actions/auth';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getUserById } from '../../../store/actions/profile';
import { getUserIdFromToken } from '../../../utils/decode-token';
import { getProjectByAssociate } from '../../../store/actions/project';

// assets
import { CheckCircleOutlined } from '@ant-design/icons';
import { LOGIN_FULFILLED, LOGIN_REJECTED } from '../../../store/types';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signIn = useSignIn();
  const year = String(dayjs().year());
  const { loading } = useAppSelector((state: any) => state.auth);

  const [response, setResponse] = useState<any>(null);
  const [flag, setFlag] = useState<boolean>(false);
  const [verified, setVerified] = useState<{ status: boolean, message: string }>({
    status: false,
    message: ""
  });

  // loading
  const [loadSendOTP, setLoadSendOTP] = useState<boolean>(false);
  const [loadVerifyOTP, setLoadVerifyOTP] = useState<boolean>(false);

  const handleSendOTP = async (phone: string) => {
    setLoadSendOTP(true);

    try {
      if (phone !== '') {
        const response = await setUpRecaptcha(phone);
        setResponse(response);
        setFlag(true);
        toast.success("OTP code has been sent to your phone number");
      }
      setLoadSendOTP(false);
    } catch (error: any) {
      toast.error("Error sending OTP");
      setLoadSendOTP(false);
    }
  }

  const handleVerifyOTP = async (otp: string) => {
    setLoadVerifyOTP(true);

    try {
      await response?.confirm(otp);

      setVerified({
        status: true,
        message: "Your number has been verified"
      })
      toast.success("Your number has been verified");
      setLoadVerifyOTP(false);
    } catch (error: any) {
      toast.error("Error verifying OTP");
      setLoadVerifyOTP(false);
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          no_hp: '',
          otp: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          no_hp: Yup.string().max(15).test('+62', 'The number must start with +62', (value) => {
            const searchTerm = '+62';
            const indexOfFirst = value?.indexOf(searchTerm);

            return indexOfFirst === 0
          }),
          otp: Yup.string().min(6).max(6).required('OTP number is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const data = {
              no_hp: values.no_hp
            }

            if (verified.status) {
              const res = await dispatch(login(data));
              const token = res.payload?.data;
              const tokenUserId = getUserIdFromToken(token);

              if (res.type === LOGIN_FULFILLED) {
                // set data login in cookie
                signIn({
                  token,
                  expiresIn: 43200,
                  tokenType: 'Bearer',
                  authState: {
                    phone: values.no_hp
                  }
                });

                dispatch(getUserById({ token, tokenUserId }))
                dispatch(getProjectByAssociate({ token, tokenUserId, year }))

                // navigate to dashboard page
                navigate('/dashboard');
                toast.success("Login successful");

                setStatus({ success: true });
                setSubmitting(false);
              }

              if (res.type === LOGIN_REJECTED) {
                toast.error(res.payload as any);
                setStatus({ success: false });
                setSubmitting(false);
              }
            }
          } catch (err: any) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* ============ Phone ============ */}
              {!verified.status && <Grid item xs={12} sx={{ display: flag ? 'none' : 'block' }}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="no_hp-signup">Phone</InputLabel>
                  <Stack direction='row' spacing={1}>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.no_hp && errors.no_hp)}
                      id="no_hp-signup"
                      type="phone"
                      value={values.no_hp}
                      name="no_hp"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="+62..."
                    />
                    <Button
                      size='small'
                      color='info'
                      variant='contained'
                      disabled={Boolean(touched.no_hp && errors.no_hp)}
                      sx={{ width: '30%' }}
                      onClick={() => handleSendOTP(values.no_hp)}
                    >
                      {loadSendOTP ? (
                        <CircularProgress sx={{ color: "#fff" }} size={16} />
                      ) : "Send OTP"}
                    </Button>
                  </Stack>
                  {touched.no_hp && errors.no_hp && (
                    <FormHelperText error id="helper-text-no_hp-signup">
                      {errors.no_hp}
                    </FormHelperText>
                  )}
                  <div id="recaptcha-container"></div>
                </Stack>
              </Grid>}
              {/* ============ OTP ============ */}
              {!verified.status && <Grid item xs={12} sx={{ display: flag ? 'block' : 'none' }}>
                <Stack spacing={1}>
                  <Stack direction='row' justifyContent='space-between'>
                    <InputLabel htmlFor="otp-signup">OTP Number</InputLabel>
                    {verified.status && (
                      <Stack spacing={0.5} direction='row' alignItems='center'>
                        <CheckCircleOutlined style={{ fontSize: 12, color: 'green' }} />
                        <Typography variant='caption' color='green'>{verified.message}</Typography>
                      </Stack>
                    )}
                  </Stack>
                  <Stack direction='row' spacing={1}>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.otp && errors.otp)}
                      id="otp-signup"
                      type="text"
                      value={values.otp}
                      name="otp"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="******"
                      disabled={verified.status}
                    />
                    <Button
                      size='small'
                      color='info'
                      variant='contained'
                      disabled={Boolean(touched.otp && errors.otp) || verified.status}
                      sx={{ width: '30%' }}
                      onClick={() => handleVerifyOTP(values.otp)}
                    >
                      {loadVerifyOTP ? (
                        <CircularProgress sx={{ color: "#fff" }} size={16} />
                      ) : "Verify OTP"}
                    </Button>
                  </Stack>
                  {touched.otp && errors.otp && (
                    <FormHelperText error id="helper-text-otp-signup">
                      {errors.otp}
                    </FormHelperText>
                  )}
                  <div id="recaptcha-container"></div>
                </Stack>
              </Grid>}

              {verified.status && <Grid item xs={12}>
                <Stack spacing={0.5} direction='row' alignItems='center' justifyContent='center'>
                  <CheckCircleOutlined style={{ fontSize: 18, color: 'green' }} />
                  <Typography variant='h4' sx={{ color: 'darkseagreen' }}>
                    {verified.message}
                  </Typography>
                </Stack>
              </Grid>}

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}

              {verified.status && (
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                      {loading && <CircularProgress sx={{ mr: 1.5, color: "#fff" }} size={17} />} <span>Login</span>
                    </Button>
                  </AnimateButton>
                </Grid>
              )}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
