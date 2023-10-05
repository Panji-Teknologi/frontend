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
import { CloudUploadOutlined } from '@ant-design/icons';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-hot-toast';
import SignatureCanvas from 'react-signature-canvas';
import dayjs from 'dayjs';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import { useAppDispatch, useAppSelector } from '../../../store';
import { register } from '../../../store/actions/auth';
import { getBankDestination, getSalesMaster } from '../../../store/actions/bank';
import { FileSize } from '../../../utils/file-size';
import { REGISTER_FULFILLED, REGISTER_REJECTED } from '../../../store/types';

import './styles.modules.css'
import { Sales } from '../../../store/reducers/bank';

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
  const { banks, sales } = useAppSelector((state: any) => state.bank);
  const { loading } = useAppSelector((state: any) => state.auth);

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]

  const [sign, setSign] = useState<null | any>(null);
  const [fileSelected, setFileSelected] = useState<File>()

  useEffect(() => {
    dispatch(getBankDestination())
    dispatch(getSalesMaster())
  }, []);

  const handleResetSign = () => {
    sign.clear();
  }

  interface Values {
    name: string
    email: string
    address: string
    job: string
    no_hp: string
    bank_code: string
    bank_atas_nama: string
    no_rek_associate: string
    master_sales_employee_id?: string
    sumber_informasi: string
    other_sumber_informasi?: string
    submit: null,
    ktp_image: null,
  }

  const initialValues: Values = {
    name: '',
    email: '',
    address: '',
    job: '',
    no_hp: '',
    bank_code: '',
    bank_atas_nama: '',
    no_rek_associate: '',
    master_sales_employee_id: '',
    sumber_informasi: '0',
    other_sumber_informasi: '',
    submit: null,
    ktp_image: null,
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          address: Yup.string().max(255).required('Address is required'),
          job: Yup.string().max(50).required('Job is required'),
          no_hp: Yup.string().max(15).test('+62', 'The number must start with +62', (value) => {
            const searchTerm = '+62';
            const indexOfFirst = value?.indexOf(searchTerm);

            return indexOfFirst === 0
          }),
          master_sales_employee_id: Yup.string().required("Sales is required"),
          other_sumber_informasi: Yup.string().optional(),
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
              create_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              term_of_service_signature: toBase64,
              master_sales_employee_id: values.master_sales_employee_id,
              sumber_informasi: values.sumber_informasi,
              other_sumber_informasi: values.other_sumber_informasi
            };

            if (values.sumber_informasi === '0' || values.sumber_informasi === '1') {
              delete data.other_sumber_informasi;
            }

            if (values.sumber_informasi === '1' || values.sumber_informasi === '2') {
              delete data.master_sales_employee_id
            }

            // 0 = sales => sales master id
            // 1 = individu => sumber_informasi = 1
            // 2 = other => input other_sumber_informasi

            const response = await dispatch(register(data))

            if (response.type === REGISTER_FULFILLED) {
              setStatus({ success: true });
              setSubmitting(false);
              toast.success("Your account registration has been successful");
              navigate("/login");
            }

            if (response.type === REGISTER_REJECTED) {
              toast.error(response.payload as any);
              setStatus({ success: false });
              setSubmitting(false);
            }

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
                    type="text"
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
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="job-signup">Job*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.job && errors.job)}
                    id="job-signup"
                    type="text"
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
              <Grid item xs={12} md={6}>
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
                  </Stack>
                  {touched.no_hp && errors.no_hp && (
                    <FormHelperText error id="helper-text-no_hp-signup">
                      {errors.no_hp}
                    </FormHelperText>
                  )}
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
                {touched.bank_code && errors.bank_code && (
                  <FormHelperText error id="helper-text-bank_code-signup">
                    {errors.bank_code}
                  </FormHelperText>
                )}
              </Grid>
              {/* ============ Bank Name ============ */}
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="bank_atas_nama-signup">Your Bank Name</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.bank_atas_nama && errors.bank_atas_nama)}
                    id="bank_atas_nama-signup"
                    type="text"
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
                    type="text"
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
              {/* ============ Sumber Informasi ============ */}
              <Grid item xs={12} md={values.sumber_informasi === '1' ? 12 : 6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="sumber_informasi-signup">Resources Info</InputLabel>
                  <Select name="sumber_informasi" labelId='sumber_informasi-signup' value={values.sumber_informasi} label="Resources" onChange={handleChange} onBlur={(handleBlur)}>
                    <MenuItem value="0">
                      Sales
                    </MenuItem>
                    <MenuItem value="1">
                      Individu
                    </MenuItem>
                    <MenuItem value="2">
                      Other
                    </MenuItem>
                  </Select>
                </Stack>
                {touched.sumber_informasi && errors.sumber_informasi && (
                  <FormHelperText error id="helper-text-sumber_informasi-signup">
                    {errors.sumber_informasi}
                  </FormHelperText>
                )}
              </Grid>
              {/* ============ Sales Master ============ */}
              {values.sumber_informasi === '0' && (
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="master_sales_employee_id-signup">Sales Name</InputLabel>
                    <Select name="master_sales_employee_id" labelId='master_sales_employee_id-signup' value={values.master_sales_employee_id} label="Sales" onChange={handleChange} onBlur={(handleBlur)}>
                      {sales?.map((sales: Sales) => (
                        <MenuItem key={sales.master_sales_employee_id} value={sales.master_sales_employee_id}>
                          {sales.sales_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                  {touched.master_sales_employee_id && errors.master_sales_employee_id && (
                    <FormHelperText error id="helper-text-master_sales_employee_id-signup">
                      {errors.master_sales_employee_id}
                    </FormHelperText>
                  )}
                </Grid>
              )}
              {values.sumber_informasi === '2' && (
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="other_sumber_informasi-signup">Other</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.other_sumber_informasi && errors.other_sumber_informasi)}
                      id="other_sumber_informasi-signup"
                      type="phone"
                      value={values.other_sumber_informasi}
                      name="other_sumber_informasi"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Insert a name..."
                    />
                  </Stack>
                  {touched.other_sumber_informasi && errors.other_sumber_informasi && (
                    <FormHelperText error id="helper-text-other_sumber_informasi-signup">
                      {errors.other_sumber_informasi}
                    </FormHelperText>
                  )}
                </Grid>
              )}
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
