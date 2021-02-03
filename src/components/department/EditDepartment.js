import React, { useEffect, useState } from 'react';

export const EditDepartment = (props) => {
  const [department, setDepartment] = useState({
    id: '',
    name: '',
    officephone: '',
    manager: '',
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setDepartment({
      ...department,
      [event.target.name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.offTask(0);
    props.postUpdateDepartment(department);
  };

  useEffect(() => {
    if (props.oneDepart !== null) {
      setDepartment(props.oneDepart);
    }
  }, [props.oneDepart]);

  return (
    <div>
      <h1>Edit Department</h1>
      <div className='content'>
        <form onSubmit={(event) => onSubmit(event)}>
          <input
            name='id'
            type='hidden'
            value={department.id}
            onChange={handleChange}
          />
          <div className='form-group row'>
            <div className='col-sm-5'>
              <div className='form-group row'>
                <label htmlFor='name' className='col-lg-3 col-form-label'>
                  Name
                </label>
                <div className='col-lg-9'>
                  <input
                    name='name'
                    type='text'
                    className='form-control'
                    id='name'
                    value={department.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label
                  htmlFor='officephone'
                  className='col-lg-3 col-form-label'
                >
                  officephone
                </label>
                <div className='col-lg-9'>
                  <input
                    name='officephone'
                    type='text'
                    className='form-control'
                    id='officephone'
                    value={department.officephone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='manager' className='col-lg-3 col-form-label'>
                  manager
                </label>
                <div className='col-lg-9'>
                  <input
                    name='manager'
                    type='text'
                    className='form-control'
                    id='manager'
                    value={department.manager}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <div className='col-sm-10 offset-sm-2'>
              <button type='submit' className='btn btn-primary'>
                Save
              </button>
              <div onClick={props.close} className='btn btn-warning'>
                Close
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;
