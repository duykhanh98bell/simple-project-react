import React, { useState } from 'react';

export const Login = (props) => {
  const [state, setState] = useState(null);
  const onChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    props.dataLogin(state);
  };
  return (
    <div className='body'>
      <div className='wrapperr'>
        <div className='title'>Login Form</div>
        <form onSubmit={onSubmit}>
          <div className='field'>
            <input
              id='username'
              name='username'
              type='text'
              required
              onChange={onChange}
              data-testid='username'
            />
            <label htmlFor='username'>Username</label>
          </div>
          <div className='field'>
            <input
              name='password'
              type='password'
              required
              onChange={onChange}
              data-testid='password'
              id='password'
            />
            <label htmlFor='password'>Password</label>
          </div>
          <div className='content'>
            <div className='checkbox'>
              <input type='checkbox' id='remember-me' />
              <div htmlFor='remember-me'>Remember me</div>
            </div>
            <div className='pass-link'>
              <div>Forgot password?</div>
            </div>
          </div>
          <div className='field'>
            <input type='submit' defaultValue='Login' data-testid='log' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
