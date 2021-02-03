import React, { useState } from 'react';
import CreateEmployee from './CreateEmployee';
import EditEmployee from './EditEmployee';
import ListEmployee from './ListEmployee';

export const Employee = (props) => {
  const [taskEm, setTaskEm] = useState(0);

  const onEdit = (id) => {
    setTaskEm(2);
    props.sendIdEm(id);
  };

  const checkTaskEm = () => {
    if (taskEm === 1) {
      return (
        <CreateEmployee
          listDepartment={props.listDepartment}
          dataEmployee={props.dataEmployee}
          offTask={() => setTaskEm(0)}
        />
      );
    } else if (taskEm === 2) {
      return (
        <EditEmployee
          listDepartment={props.listDepartment}
          sendOneEm={props.sendOneEm}
          dataEditEmployee={props.dataEditEmployee}
          offTask={() => setTaskEm(0)}
        />
      );
    } else {
      return (
        <button onClick={() => setTaskEm(1)} className='btn btn-success'>
          Create Employee
        </button>
      );
    }
  };
  return (
    <div className='col-9'>
      {checkTaskEm()}
      <ListEmployee
        listEmployee={props.listEmployee}
        onDeleteEmp={props.onDeleteEmp}
        onEdit={onEdit}
      />
    </div>
  );
};

export default Employee;
