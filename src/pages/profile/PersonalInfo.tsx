import { useEffect } from 'react';

// material-ui
import {
  Box,
  Button,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// import 
import { getBankDestination } from '../../store/actions/bank';
import { useAppDispatch, useAppSelector } from '../../store';
import { Profile } from '../../types';

// components
import MainCard from '../../components/MainCard';

// ==============================|| PROFILE - PERSONAL INFO ||============================== //

interface PersonalInfoProps {
  profile: Profile
}

const PersonalInfo = ({ profile }: PersonalInfoProps) => {
  const dispatch = useAppDispatch();
  const { banks } = useAppSelector((state: any) => state.bank);

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  useEffect(() => {
    dispatch(getBankDestination())
  }, []);

  return (
    <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
      <Formik
        initialValues={{
          name: profile.name,
          job: profile.job,
          email: profile.email,
          bank_code: profile.bank_code,
          address: profile.address,
          no_hp: profile.no_hp,
          bank_atas_nama: profile.bank_atas_nama,
          no_rek_associate: profile.no_rek_associate,
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(50).required('First Name is required.'),
          job: Yup.string().max(30).required('Last Name is required.'),
          email: Yup.string().email('Invalid email address.').max(255).required('Email is required.'),
          bank_code: Yup.string().required('Bank code is required.'),
          bank_atas_nama: Yup.string().required('Bank Name is required.'),
          no_rek_associate: Yup.string().required('Account Number is required.'),
          no_hp: Yup.number()
            .test('len', 'Contact should be exactly 10 digit', (val) => val?.toString().length === 10)
            .required('Phone number is required'),
          address: Yup.string().min(50, 'Address to short.').required('Address is required'),
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
          try {
            console.log("Values : ", values);

            setStatus({ success: false });
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                {/* ============ Name ============ */}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-name">Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-name"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Name"
                      autoFocus
                    // inputRef={inputRef}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText error id="personal-name-helper">
                        {errors.name}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* ============ Email ============ */}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-email">Email</InputLabel>
                    <TextField
                      type="email"
                      fullWidth
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="personal-email"
                      placeholder="Email Address"
                    />
                    {touched.email && errors.email && (
                      <FormHelperText error id="personal-email-helper">
                        {errors.email}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* ============ Job ============ */}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-last-name">Job</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-last-name"
                      value={values.job}
                      name="job"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                    {touched.job && errors.job && (
                      <FormHelperText error id="personal-last-name-helper">
                        {errors.job}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* ============ Phone ============ */}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-last-name">Phone</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-last-name"
                      value={values.no_hp}
                      name="no_hp"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                    {touched.no_hp && errors.no_hp && (
                      <FormHelperText error id="personal-last-name-helper">
                        {errors.no_hp}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <CardHeader title="Bank Information" />
            <Divider />
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={3}>
                {/* ============ Bank Code ============ */}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="bank_code-signup">Bank</InputLabel>
                    <Select name="bank_code" labelId='bank_code-signup' value={values.bank_code} label="Bank" onChange={handleChange} onBlur={(handleBlur)}>
                      {banks?.map((bank: any) => (
                        <MenuItem key={bank.id} id={bank.bank_code} value={bank.bank_code}>{bank.nama_bank_destination}</MenuItem>
                      ))}
                    </Select>
                    {/* {touched.bank_code && errors.bank_code && (
                      <FormHelperText error id="personal-bank_code-helper">
                        {errors.bank_code}
                      </FormHelperText>
                    )} */}
                  </Stack>
                </Grid>
                {/* ============ Account Number ============ */}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-no_rek_associate">Account Number</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-no_rek_associate"
                      value={values.no_rek_associate}
                      name="no_rek_associate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder=""
                    />
                    {touched.no_rek_associate && errors.no_rek_associate && (
                      <FormHelperText error id="personal-no_rek_associate-helper">
                        {errors.no_rek_associate}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                {/* ============ Bank Name ============ */}
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="personal-bank_atas_nama">Your Bank Name</InputLabel>
                    <TextField
                      fullWidth
                      id="personal-bank_atas_nama"
                      value={values.bank_atas_nama}
                      name="bank_atas_nama"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder=""
                    />
                    {touched.bank_atas_nama && errors.bank_atas_nama && (
                      <FormHelperText error id="personal-bank_atas_nama-helper">
                        {errors.bank_atas_nama}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
            <CardHeader title="Address" />
            <Divider />
            <Box sx={{ p: 2.5 }}>
              {/* ============ Address ============ */}
              <TextField
                multiline
                rows={5}
                fullWidth
                value={values.address}
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                id="personal-address"
                placeholder="address"
              />
              {touched.address && errors.address && (
                <FormHelperText error id="personal-address-helper">
                  {errors.address}
                </FormHelperText>
              )}
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit" variant="contained">
                  Save
                </Button>
              </Stack>
            </Box>
          </form>
        )}
      </Formik>
    </MainCard>
  )
}

export default PersonalInfo