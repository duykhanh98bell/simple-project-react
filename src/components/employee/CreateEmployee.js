import React, { useState } from 'react';

export const CreateEmployee = (props) => {
  const [state, setState] = useState();
  const [filename, setFilename] = useState();
  const [name, setName] = useState('Choose file');

  const handleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.dataEmployee(state, filename);
    props.offTask();
  };

  const renderOption = () => {
    if (props.listDepartment !== null) {
      return props.listDepartment.map((value, index) => {
        return (
          <option key={index} value={value._id}>
            {value.name}
          </option>
        );
      });
    }
  };

  return (
    <div>
      <h1>Create Employee</h1>
      <div className='content'>
        <form onSubmit={(event) => onSubmit(event)}>
          <div className='form-group row'>
            <div className='col-sm-5'>
              <div className='form-group row'>
                <label htmlFor='name' className='col-sm-2 col-form-label'>
                  Name
                </label>
                <div className='col-sm-10'>
                  <input
                    name='name'
                    type='text'
                    className='form-control'
                    id='name'
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='jobtitle' className='col-sm-2 col-form-label'>
                  jobtitle
                </label>
                <div className='col-sm-10'>
                  <input
                    name='jobtitle'
                    type='text'
                    className='form-control'
                    id='jobtitle'
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='form-group row'>
                <label htmlFor='photo' className='col-sm-2 col-form-label'>
                  photo
                </label>
                <div className='custom-file col-sm-10'>
                  <input
                    type='file'
                    className='custom-file-input'
                    id='photo'
                    aria-describedby='inputGroupFileAddon01'
                    name='photo'
                    onChange={(e) => {
                      const photo = e.target.files[0];
                      setFilename(photo);
                      setName(photo.name);
                    }}
                  />
                  <label
                    className='custom-file-label'
                    htmlFor='inputGroupFile01'
                  >
                    {name}
                  </label>
                </div>
              </div>
            </div>
            <div className='col-sm-1'></div>
            <div className='col-sm-6'>
              <div className='form-group row'>
                <label htmlFor='cellphone' className='col-sm-2 col-form-label'>
                  cellphone
                </label>
                <div className='col-sm-10'>
                  <input
                    name='cellphone'
                    type='text'
                    className='form-control'
                    id='cellphone'
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label htmlFor='email' className='col-sm-2 col-form-label'>
                  email
                </label>
                <div className='col-sm-10'>
                  <input
                    name='email'
                    type='email'
                    className='form-control'
                    id='email'
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='form-group row'>
                <label
                  htmlFor='department_id'
                  className='col-sm-2 col-form-label'
                >
                  Department
                </label>
                <div className='col-sm-10'>
                  <select
                    className='form-control'
                    name='department_id'
                    id='department_id'
                    onChange={handleChange}
                  >
                    <option defaultValue='selected'>Select one</option>
                    {renderOption()}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='form-group row'>
            <div className='col-sm-10 offset-sm-2'>
              <button type='submit' className='btn btn-primary'>
                Save
              </button>
              <div onClick={props.offTask} className='btn btn-warning'>
                Close
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
