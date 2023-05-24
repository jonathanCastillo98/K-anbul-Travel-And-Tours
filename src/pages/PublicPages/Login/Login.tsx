import "../../../../styles/css/login.css";
// Import React Stuff
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";

import loginImg from '../../../assets/loginAssets/loginImg.jpg'
import { getUserToken } from '../../../services';


import { useDispatch } from 'react-redux';
import { UserKey, logUser, resetUser } from '../../../redux/states/user';
import { clearLocalStorage } from '../../../utilities';
import { PrivateRoutes, PublicRoutes } from '../../../models';

const Login = () => {
    // Stuff to control the form
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { username: "", password: "" } });



    // To navigate other parte of the app
    const navigate = useNavigate();

    useEffect(() => {
        clearLocalStorage(UserKey);
        dispatch(resetUser())
        navigate(`/${PublicRoutes.LOGIN}`, { replace: false })
    }, [])

    const dispatch = useDispatch()
    // Handlers
    const handleFormSubmit = async (e: any) => {
        try {
            const result = await getUserToken(e.username, e.password);
            dispatch(logUser(result))
            navigate(`/home`, { replace: true })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="Wrapper">
            <div className="login__img-container">
                <img src={loginImg} alt="" className='login__img' />
            </div>
            <div className="WrapperForm">
                <form onSubmit={handleSubmit(handleFormSubmit)}>

                    <h2>Login</h2>
                    <div className="Input-box">
                        <span className="Icon">
                            <i className='bx bxs-envelope' ></i>
                        </span>
                        <input type="text" placeholder='Username' {...register('username', { required: true })} />
                    </div>
                    <div className="Input-box">
                        <span className="Icon">
                            <i className='bx bxs-lock-alt'></i>
                        </span>
                        <input type="password" placeholder='Password' {...register('password', { required: true })} />
                    </div>
                    <div className="Forgot-pass">
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button type="submit">Login</button>
                    <div className="Register-link">
                        <p>Don't have an account? <a href='/signInView'>Register</a></p>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Login