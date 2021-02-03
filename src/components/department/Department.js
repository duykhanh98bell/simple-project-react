import React, { useState } from 'react';
import CreateDepartment from './CreateDepartment';
import ListDepartment from './ListDepartment';
import EditDepartment from './EditDepartment';
import DetailDepartment from './DetailDepartment';
export const Department = (props) => {
  const [taskCreate, setTaskCreate] = useState(0);
  const [taskDetail, setTaskDetail] = useState(0);

  const editTask = (id) => {
    setTaskCreate(2);
    props.editDepart(id);
  };
  const checkTask = () => {
    if (taskCreate === 0) {
      return (
        <button onClick={() => setTaskCreate(1)} className='btn btn-success'>
          Create Department
        </button>
      );
    } else if (taskCreate === 1) {
      return (
        <CreateDepartment
          offTask={() => setTaskCreate(0)}
          close={() => setTaskCreate(0)}
          postDepartment={props.postDepartment}
        />
      );
    } else {
      return (
        <EditDepartment
          offTask={() => setTaskCreate(0)}
          close={() => setTaskCreate(0)}
          oneDepart={props.oneDepart}
          postUpdateDepartment={props.postUpdateDepartment}
        />
      );
    }
  };
  const checkDetail = () => {
    if (taskDetail === 0) {
      return (
        <ListDepartment
          listDepartment={props.listDepartment}
          editDepart={editTask}
          onDelete={props.onDelete}
          employeeIn={props.employeeIn}
          onListDetail={() => setTaskDetail(1)}
        />
      );
    } else {
      return (
        <DetailDepartment
          listEmIn={props.listEmIn}
          offDetail={(off) => setTaskDetail(off)}
        />
      );
    }
  };

  return (
    <div className='col-9'>
      {checkTask()} {checkDetail()}
    </div>
  );
};

export default Department;
