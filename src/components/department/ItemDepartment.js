import React from 'react';

export const ItemDepartment = (props) => {
  const onDelete = (id) => {
    props.onDelete(id);
  };
  const onEdit = (id) => {
    props.editDepart(id);
  };
  const detail = (id) => {
    props.employeeIn(id);
    props.onListDetail(1);
  };

  return (
    <tr>
      <th>{props.index + 1}</th>
      <td>{props.name}</td>
      <td>{props.officephone}</td>
      <td>{props.manager}</td>
      <td>
        <div
          type='button'
          className='btn btn-info'
          onClick={() => detail(props.id)}
        >
          Chi tiết
        </div>
        <div
          type='button'
          onClick={() => onEdit(props.id)}
          className='btn btn-warning'
        >
          Sửa
        </div>
        <div
          type='button'
          onClick={() => onDelete(props.id)}
          className='btn btn-danger'
        >
          Xóa
        </div>
      </td>
    </tr>
  );
};

export default ItemDepartment;
