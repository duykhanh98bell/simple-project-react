import React, { useState, useEffect } from 'react';
import Employee from './employee/Employee';
import Department from './department/Department';
import Register from './auth/Register';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export const Home = (props) => {
  const [department, setDepartment] = useState(null);
  const [oneDepart, setOneDepart] = useState('');
  const [employee, setEmployee] = useState(null);
  const [oneEmployee, setOneEmployee] = useState('');
  const [employeeIn, setEmployeeIn] = useState(null);

  useEffect(() => {
    getDepartment().then((res) => setDepartment(res));
    getEmployee().then((res) => setEmployee(res));
  }, []); // gọi list trước khi load trang để có dữ liệu hiển thị

  //  Start Department
  const getDepartment = () =>
    axios
      .get('/department', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => res.data)
      .catch((err) => err);

  const addDepartment = (payload) => {
    axios
      .post('/department/', payload, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => err)
      .then(() => getDepartment().then((res) => setDepartment(res)));
  };

  const onDelete = (id) => {
    axios
      .delete('/department/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => err)
      .then(() => getDepartment().then((res) => setDepartment(res)));
  };

  const findDepart = (id) => {
    axios
      .get('/department/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => setOneDepart(res.data))
      .catch((err) => err);
  };

  const saveUpdate = (payload) => {
    axios
      .put(
        '/department/' + payload._id,
        {
          name: payload.name,
          officephone: payload.officephone,
          manager: payload.manager,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((res) => console.log(res.data.message))
      .catch((err) => err)
      .then(() => getDepartment().then((res) => setDepartment(res)));
  };
  // End Department

  // Start Employee
  const getEmployee = () =>
    axios
      .get('/employee', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => res.data.all)
      .catch((err) => err);

  const addEmployee = async (data, filename) => {
    const formData = new FormData();
    formData.append('photo', filename);
    formData.append('name', data.name);
    formData.append('jobtitle', data.jobtitle);
    formData.append('cellphone', data.cellphone);
    formData.append('email', data.email);
    formData.append('department_id', data.department_id);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios
        .post('/employee/', formData, config)
        .then((res) => console.log(res.data))
        .catch((err) => err)
        .then(() => getEmployee().then((res) => setEmployee(res)));
      return res;
    } catch (err) {
      return err.response;
    }
  };

  const DeleteEmp = async (id) => {
    try {
      const res = await axios
        .delete('/employee/' + id, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((res) => console.log(res.data))
        .catch((err) => err)
        .then(() => getEmployee().then((res) => setEmployee(res)));
      return res.data.message;
    } catch (err) {
      return err;
    }
  };

  const idEm = (id) => {
    axios
      .get('/employee/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => setOneEmployee(res.data))
      .catch((err) => err);
  };

  const saveEditEmployee = async (payload, filename) => {
    const formData = new FormData();
    if (filename !== null) {
      formData.append('photo', filename);
    }
    formData.append('name', payload.name);
    formData.append('cellphone', payload.cellphone);
    formData.append('department_id', payload.department_id);
    formData.append('email', payload.email);
    formData.append('jobtitle', payload.jobtitle);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    try {
      const res = await axios
        .put('/employee/' + payload.id, formData, config)
        .then((res) => console.log(res.data))
        .then(() => getEmployee().then((res) => setEmployee(res)))
        .catch((err) => err);
      return res;
    } catch (err) {
      return err;
    }
  };
  // End Employee
  const findEmployeIn = (id) => {
    axios
      .get('/department/employeein/' + id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => setEmployeeIn(res.data))
      .catch((err) => err);
  };

  const out = () => {
    axios
      .delete('/auth/logout', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        localStorage.removeItem('token');
        console.log(res.data);
      })
      .catch((err) => err);
    props.outLogin();
  };
  return (
    <Router>
      <div className='row'>
        <div className='col-2'>
          <div className='wrapper'>
            <nav id='sidebar'>
              <div className='title'>Side Menu</div>
              <ul className='list-items'>
                <li>
                  <div type='button' className='btn'>
                    <i className='fas fa-home'></i>
                    <Link to='/employee'>Employee</Link>
                  </div>
                </li>

                <li>
                  <div type='button' className='btn'>
                    <i className='fas fa-sliders-h'></i>
                    <Link to='/department'>Department </Link>
                  </div>
                </li>

                <li>
                  <div type='button' className='btn'>
                    <i className='fas fa-user'></i>
                    <Link to='/register'>New User </Link>
                  </div>
                </li>
                <li>
                  <div type='button' className='btn' onClick={out}>
                    <i className='fas fa-user'></i>
                    <Link to='/'>Logout </Link>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <Switch>
          <Route path='/employee'>
            <Employee
              listEmployee={employee}
              listDepartment={department}
              dataEmployee={addEmployee}
              onDeleteEmp={DeleteEmp}
              sendIdEm={idEm}
              sendOneEm={oneEmployee}
              dataEditEmployee={saveEditEmployee}
            />
          </Route>
          <Route path='/department'>
            <Department
              listDepartment={department}
              postDepartment={addDepartment}
              onDelete={onDelete}
              editDepart={findDepart}
              oneDepart={oneDepart}
              postUpdateDepartment={saveUpdate}
              employeeIn={findEmployeIn}
              listEmIn={employeeIn}
            />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Home;
