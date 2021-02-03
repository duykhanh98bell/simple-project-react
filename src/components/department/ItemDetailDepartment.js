import React from 'react';

export const ItemDetailDepartment = (props) => {
  return (
    <tr>
      <th>{props.index + 1}</th>
      <td>{props.name}</td>
      <td>
        <img
          width='200'
          src={'/' + props.avatar}
          className='img-responsive'
          alt=''
        />
      </td>
      <td>{props.job}</td>
      <td>{props.phone}</td>
      <td>{props.email}</td>
    </tr>
  );
};

export default ItemDetailDepartment;
