import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as types from '../components/redux/actions/actionTypes';

export default function loginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const action = {username, password};
    /*
    const handleSubmit = async () => {
       const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
       try {
            const response = await axios({
                method: "POST",
                url: "http://127.0.0.1:8000/api/token/",
                data: {
                    username: username,
                    password: password
                },
                headers: headers
            });
            //handle success
            console.log(response);
            Cookies.set('jwt', response.data);
        } catch (error) {
            console.log(error);
        }
    };
    */

    const handleSubmit = () => {
        dispatch({type:types.LOGIN_REQUEST, action })
    }

    return (
        <div className="loginBox">
            <div className="lblBox">
                <label className="label" htmlFor="loginbox">
                    Enter Username and Password
                    <div className="unameInput">
                        <input 
                            type="text"
                            name="username"
                            placeholder='Enter username'
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="passwordInput">
                        <input 
                            type='password'
                            name='password'
                            placeholder='Enter password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="submitBtn">
                        <button onClick={handleSubmit} name='submit'>Submit</button>
                    </div>
                </label>
            </div>
        </div>
    );
}