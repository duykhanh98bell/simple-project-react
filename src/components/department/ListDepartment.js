import React from 'react';
import ItemDepartment from './ItemDepartment';

export const ListDepartment = (props) => {
  const printItem = () => {
    if (props.listDepartment !== null) {
      return props.listDepartment.map((value, index) => (
        <ItemDepartment
          key={index}
          index={index}
          id={value._id}
          name={value.name}
          officephone={value.officephone}
          manager={value.manager}
          onDelete={props.onDelete}
          editDepart={props.editDepart}
          employeeIn={props.employeeIn}
          onListDetail={props.onListDetail}
        />
      ));
    }
  };
  return (
    <div>
      <h1>List</h1>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Office Phone</th>
            <th>Manager</th>
            <th width='300'>Option</th>
          </tr>
        </thead>
        <tbody>{printItem()}</tbody>
      </table>
    </div>
  );
};

export default ListDepartment;
