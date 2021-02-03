import React from 'react';
import ItemEmployee from './ItemEmployee';

export const ListEmployee = (props) => {
  const loopItem = () => {
    if (props.listEmployee !== null) {
      return props.listEmployee.map((value, index) => {
        return (
          <ItemEmployee
            key={index}
            index={index}
            id={value._id}
            name={value.name}
            jobtitle={value.jobtitle}
            cellphone={value.cellphone}
            email={value.email}
            photo={value.photo}
            onDeleteEmp={props.onDeleteEmp}
            onEdit={props.onEdit}
          />
        );
      });
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
            <th>Jobtitle</th>
            <th>Cellphone</th>
            <th>Email</th>
            <th>Photo</th>
            <th width='300'>Option</th>
          </tr>
        </thead>
        <tbody>{loopItem()}</tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
