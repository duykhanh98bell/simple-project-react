import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Register = (props) => {
  const [state, setState] = useState(null);
  const [list, setList] = useState(null);
  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post('/users', state, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(() => getUsers().then((res) => setList(res)))
      .catch((err) => err);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get('/users', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => setList(res.data))
      .catch((err) => err);
  };

  const onDelete = (id) => {
    axios
      .delete('/users/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(() => getUsers().then((res) => setList(res)))
      .catch((err) => err);
  };
  const checkUser = (value) => {
    if (localStorage.getItem('username') === value.username) {
      return (
        <td>
          <div type='button' className='btn btn-success'>
            Hello
          </div>
        </td>
      );
    } else {
      return (
        <td>
          <div
            type='button'
            className='btn btn-danger'
            onClick={() => onDelete(value._id)}
          >
            Xóa
          </div>
        </td>
      );
    }
  };
  const loopUsers = () => {
    if (list !== null) {
      return list.map((value, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            <td>{value.username}</td>
            <td>{value.email}</td>
            <td>{value.role}</td>
            <td>{value.loginfirst ? 'Rồi' : 'Chưa'}</td>
            {checkUser(value)}
          </tr>
        );
      });
    }
  };
  return (
    <div className='col-9'>
      <h1>Register</h1>
      <div className='content'>
        <form onSubmit={onSubmit}>
          <div className='form-group row'>
            <div className='col-sm-5'>
              <div className='form-group row'>
                <label htmlFor='username' className='col-lg-3 col-form-label'>
                  Username
                </label>
                <div className='col-lg-9'>
                  <input
                    name='username'
                    type='text'
                    className='form-control'
                    id='username'
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='email' className='col-lg-3 col-form-label'>
                  Email
                </label>
                <div className='col-lg-9'>
                  <input
                    name='email'
                    type='email'
                    className='form-control'
                    id='email'
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='role' className='col-lg-3 col-form-label'>
                  Role
                </label>
                <div className='col-lg-9'>
                  <input
                    name='role'
                    type='text'
                    className='form-control'
                    id='role'
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <div className='col-sm-10 offset-sm-2'>
              <button type='submit' className='btn btn-primary'>
                Register
              </button>
              {/* <div className='btn btn-warning'>Close</div> */}
            </div>
          </div>
        </form>
      </div>
      <h1>List</h1>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Login First</th>
            <th width='300'>Option</th>
          </tr>
        </thead>
        <tbody>{loopUsers()}</tbody>
      </table>
    </div>
  );
};

export default Register;
