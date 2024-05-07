import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/UserSlice";

const Login = () => {

    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [afterSubmit, setAfterSubmit] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (evt) => {
        console.log(evt.target.name);
        console.log(evt.target.value);
        setLoginData({
            ...loginData,
            [evt.target.name]: evt.target.value
        });
    };

    const handleLoginSubmit = (evt) => {
        evt.preventDefault();
        console.log(loginData);
        UserService.loginUser(loginData)
            .then((response) => {
                console.log(response);
                setAfterSubmit(`Hi ${loginData.username}! You've logged in successfully!`);
                setTimeout(() => {
                    setLoginData({ username: '', password: '' });
                    dispatch(userLogin(response));
                    navigate('/profile');
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
                setLoginData({ username: '', password: '' });
                setAfterSubmit(`Invalid credentials!`);
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center mb-4" style={{ color: 'blue' }}>Login</h1>
                            <form onSubmit={handleLoginSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="username" value={loginData.username}
                                        onChange={handleChange} autoFocus required placeholder="Username" />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password" value={loginData.password}
                                        onChange={handleChange} required placeholder="Password" />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                                </div>
                            </form>
                            {afterSubmit && <p className="text-center">{afterSubmit}</p>}
                            <p className="text-center">Not yet registered? <Link to={'/register'}>Register</Link> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;