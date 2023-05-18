import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
    Link,
    Stack,
    IconButton,
    InputAdornment,
    TextField,
    Checkbox,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { axiosInstance, apiRequest } from '../../../services/core/axios';
import { useStateContext } from "../../../context/ContextProvider";
// import { axiosInstance, apiRequest } from '../../../'

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();
    const { setUser, setToken, token } = useStateContext()

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({});

    const onChangeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleClick = async () => {
        await apiRequest(() => axiosInstance.post(`/user/login`, form)).then((res) => {
            if (res.success) {
                setUser(res.data.user)
                setToken(res.data.access_token)
                navigate('/', { replace: true });
            } else {

                console.log(res);
            }
        })

    };

    return (
        <>
            <Stack spacing={3}>
                <TextField name="email" label="Email address"
                    valale={form.email} onChange={onChangeHandler} />
                <TextField
                    name="password"
                    label="Password"
                    valale={form.password}
                    onChange={onChangeHandler}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    <Iconify
                                        icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
            >
                <Checkbox name="remember" label="Remember me" />
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleClick}
            >
                Login
            </LoadingButton>
        </>
    );
}
