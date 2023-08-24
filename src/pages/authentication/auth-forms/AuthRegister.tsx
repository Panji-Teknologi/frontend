import { ChangeEvent, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  Link,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Select,
  MenuItem,
  Box,
  CircularProgress
} from '@mui/material';

import { styled } from "@mui/material/styles"

// assets
import { CheckCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-hot-toast';
import SignatureCanvas from 'react-signature-canvas';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import { useAppDispatch, useAppSelector } from '../../../store';
import { register, setUpRecaptcha } from '../../../store/actions/auth';
import { getBankDestination } from '../../../store/actions/bank';
import { FileSize } from '../../../utils/file-size';

import './styles.modules.css'

type FileEvent = ChangeEvent<HTMLInputElement> & {
  target: EventTarget & { files: FileList };
};

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { banks } = useAppSelector((state: any) => state.bank);
  const { loading } = useAppSelector((state: any) => state.auth);

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]

  const [sign, setSign] = useState<null | any>(null);
  const [response, setResponse] = useState<any>(null);
  const [flag, setFlag] = useState<boolean>(false);
  const [verified, setVerified] = useState<{ status: boolean, message: string }>({
    status: false,
    message: ""
  });
  const [fileSelected, setFileSelected] = useState<File>()

  // loading
  const [loadSendOTP, setLoadSendOTP] = useState<boolean>(false);
  const [loadVerifyOTP, setLoadVerifyOTP] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getBankDestination())
  }, []);

  const handleResetSign = () => {
    sign.clear();
  }

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
          name: '',
          email: '',
          address: '',
          job: '',
          no_hp: '',
          otp: '',
          bank_code: '',
          bank_atas_nama: '',
          no_rek_associate: '',
          submit: null,
          ktp_image: null,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          address: Yup.string().max(255).required('Address is required'),
          job: Yup.string().max(50).required('Job is required'),
          otp: Yup.string().min(6).max(6).required('OTP number is required'),
          no_hp: Yup.string().max(15).test('+62', 'The number must start with +62', (value) => {
            const searchTerm = '+62';
            const indexOfFirst = value?.indexOf(searchTerm);

            return indexOfFirst === 0
          }),
          ktp_image: Yup.mixed().required('Please upload an image').test(
            "FILE_SIZE",
            "Uploaded file is too big",
            (value: any) => !value || (value && value.size <= 1024 * 1024)
          ).test(
            "FILE_FORMAT",
            "Uploaded file has unsupported format",
            (value: any) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
          )
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const toBase64 = sign.getTrimmedCanvas().toDataURL('image/png')

            const data = {
              name: values.name,
              email: values.email,
              address: values.address,
              job: values.job,
              no_hp: values.no_hp,
              bank_code: values.bank_code,
              bank_atas_nama: values.bank_atas_nama,
              no_rek_associate: values.no_rek_associate,
              ktp_image: values.ktp_image,
              create_date: new Date(),
              term_of_service_signature: toBase64,
              master_sales_employee_id: '1',
              sumber_informasi: '0'
            };

            await dispatch(register(data))

            setStatus({ success: false });
            setSubmitting(false);
            toast.success("Your account registration has been successful");
            navigate("/login");
          } catch (err: any) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            toast.error("Your account registration failed");
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* ============ Name ============ */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name-signup">Name*</InputLabel>
                  <OutlinedInput
                    id="name-login"
                    type="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Tatang"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error id="helper-text-name-signup">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* ============ Email ============ */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-signup">Email*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="helper-text-email-signup">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Stack>
              </Grid>
              {/* ============ Address ============ */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address-signup">Address</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.address && errors.address)}
                    id="address-signup"
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                  />
                  {touched.address && errors.address && (
                    <FormHelperText error id="helper-text-address-signup">
                      {errors.address}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* ============ Job ============ */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="job-signup">Job*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.job && errors.job)}
                    id="job-signup"
                    type="job"
                    value={values.job}
                    name="job"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Sales..."
                  />
                  {touched.job && errors.job && (
                    <FormHelperText error id="helper-text-job-signup">
                      {errors.job}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* ============ Phone ============ */}
              <Grid item xs={12} sx={{ display: flag ? 'none' : 'block' }}>
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
              </Grid>
              {/* ============ OTP ============ */}
              <Grid item xs={12} sx={{ display: flag ? 'block' : 'none' }}>
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
              </Grid>
              {/* ============ Bank Code ============ */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="bank_code-signup">Bank</InputLabel>
                  <Select name="bank_code" labelId='bank_code-signup' value={values.bank_code} label="Bank" onChange={handleChange} onBlur={(handleBlur)}>
                    {banks?.map((bank: any) => (
                      <MenuItem key={bank.id} id={bank.bank_code} value={bank.bank_code}>{bank.nama_bank_destination}</MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Grid>
              {/* ============ Bank Name ============ */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="bank_atas_nama-signup">Your Bank Name</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.bank_atas_nama && errors.bank_atas_nama)}
                    id="bank_atas_nama-signup"
                    type="phone"
                    value={values.bank_atas_nama}
                    name="bank_atas_nama"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                  />
                  {touched.bank_atas_nama && errors.bank_atas_nama && (
                    <FormHelperText error id="helper-text-bank_atas_nama-signup">
                      {errors.bank_atas_nama}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* ============ Acoount Number ============ */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="no_rek_associate-signup">Account Bank Number</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.no_rek_associate && errors.no_rek_associate)}
                    id="no_rek_associate-signup"
                    type="phone"
                    value={values.no_rek_associate}
                    name="no_rek_associate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                  />
                  {touched.no_rek_associate && errors.no_rek_associate && (
                    <FormHelperText error id="helper-text-no_rek_associate-signup">
                      {errors.no_rek_associate}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* ============ Upload KTP Image ============ */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="ktp_image-signup">KTP Image</InputLabel>
                  <Button
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    variant="outlined"
                    color="primary"
                    startIcon={
                      <CloudUploadOutlined />
                    }
                  >
                    Upload a file
                    <VisuallyHiddenInput
                      type="file"
                      name="ktp_image"
                      onChange={(e: FileEvent) => {
                        console.log('e.target.files[0]', e.target.files[0]);

                        setFieldValue('ktp_image', e.target.files[0])
                        setFileSelected(e.target.files[0])
                      }}
                      accept='image/*'
                    />
                  </Button>
                  <FormHelperText id="helper-text-ktp_image-signup">
                    {fileSelected?.name} ({FileSize(Number(fileSelected?.size))})
                  </FormHelperText>
                  {touched.ktp_image && errors.ktp_image && (
                    <FormHelperText error id="helper-text-ktp_image-signup">
                      {errors.ktp_image}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {/* ============ Signature ============ */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Stack direction='row' justifyContent='space-between'>
                    <InputLabel>Signature</InputLabel>
                    <Link color='primary' sx={{ cursor: 'pointer' }} onClick={handleResetSign}>Reset</Link>
                  </Stack>
                  <Box sx={{ border: '1px solid #ccc' }} className="signature-wrapper">
                    <SignatureCanvas
                      canvasProps={{ className: 'signature' }}
                      ref={data => setSign(data)}
                    />
                  </Box>
                </Stack>
              </Grid>
              {/* ============ ToS & PP ============ */}
              <Grid item xs={12}>
                <Typography variant="body2">
                  By Signing up, you agree to our &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms of Service
                  </Link>
                  &nbsp; and &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              {/* ============ Submit Account ============ */}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {loading && <CircularProgress sx={{ mr: 1.5, color: "#fff" }} size={17} />} <span>Create Account</span>
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
