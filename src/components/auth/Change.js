import React, { useState } from 'react';

export const Change = (props) => {
  const [state, setState] = useState(null);
  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    props.changePass(state);
  };

  return (
    <div className='body'>
      <div className='wrapperr'>
        <div className='title'>Change First Login</div>
        <form onSubmit={onSubmit}>
          <div className='field'>
            <input
              type='password'
              name='password'
              required
              onChange={onChange}
              id='password'
            />
            <label htmlFor='password'>Password</label>
          </div>
          <div className='field'>
            <input
              type='password'
              name='newpassword'
              required
              onChange={onChange}
              id='newPassword'
            />
            <label htmlFor='newPassword'>New Password</label>
          </div>
          <div className='field'>
            <input
              type='password'
              name='repassword'
              required
              onChange={onChange}
              id='rePassword'
            />
            <label htmlFor='rePassword'>Re Password</label>
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
            <input type='submit' defaultValue='Login' data-testid='change' />
          </div>
          {/* <div className='signup-link'>
            Not a member? <a href='./register.html'>Signup now</a>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Change;
