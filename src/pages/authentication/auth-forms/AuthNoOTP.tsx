import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    CircularProgress,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-hot-toast';
import { useSignIn } from 'react-auth-kit';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton';
import { login } from '../../../store/actions/auth';
import { useAppDispatch, useAppSelector } from '../../../store';

// assets
import { LOGIN_FULFILLED, LOGIN_REJECTED } from '../../../store/types';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthNoOTP = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const signIn = useSignIn();
    const { loading } = useAppSelector((state: any) => state.auth);


    return (
        <>
            <Formik
                initialValues={{
                    no_hp: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    no_hp: Yup.string().max(15).test('+62', 'The number must start with +62', (value) => {
                        const searchTerm = '+62';
                        const indexOfFirst = value?.indexOf(searchTerm);

                        return indexOfFirst === 0
                    }),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const data = {
                            no_hp: values.no_hp
                        }
                        const res = await dispatch(login(data))

                        if (res.type === LOGIN_FULFILLED) {
                            // set data login in cookie
                            signIn({
                                token: res.payload?.data?.data,
                                expiresIn: 43200,
                                tokenType: 'Bearer',
                                authState: {
                                    phone: values.no_hp
                                }
                            });

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
                            <Grid item xs={12}>
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
                                    <div id="recaptcha-container"></div>
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                        {loading && <CircularProgress sx={{ mr: 1.5, color: "#fff" }} size={17} />} <span>Login Without OTP</span>
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

export default AuthNoOTP;
