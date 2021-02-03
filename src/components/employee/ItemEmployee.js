import React from 'react';

export const ItemEmployee = (props) => {
  return (
    <tr>
      <th scope='row'>{props.index + 1}</th>
      <td>{props.name}</td>
      <td>{props.jobtitle}</td>
      <td>{props.cellphone}</td>
      <td>{props.email}</td>
      <td>
        <img
          src={'http://localhost:3000/' + props.photo}
          className='img-responsive'
          alt=''
          width='100'
        />
      </td>
      <td>
        {/* <div type='button' className='btn btn-info'>
          Chi tiết
        </div> */}
        <div
          type='button'
          className='btn btn-warning'
          onClick={() => props.onEdit(props.id)}
        >
          Sửa
        </div>
        <div
          type='button'
          className='btn btn-danger'
          onClick={() => props.onDeleteEmp(props.id)}
        >
          Xóa
        </div>
      </td>
    </tr>
  );
};

export default ItemEmployee;
