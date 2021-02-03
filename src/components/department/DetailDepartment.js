import React from 'react';
import ItemDetailDepartment from './ItemDetailDepartment';

export const DetailDepartment = (props) => {
  const printItem = () => {
    if (props.listEmIn !== null) {
      return props.listEmIn.map((value, index) => (
        <ItemDetailDepartment
          key={index}
          index={index}
          name={value.name}
          avatar={value.photo}
          job={value.jobtitle}
          phone={value.cellphone}
          email={value.email}
        />
      ));
    }
  };
  const backList = () => {
    props.offDetail(0);
  };
  return (
    <div>
      <h1 onClick={() => backList()} className='btn btn-danger'>
        Back List Department
      </h1>
      <h1>Detail</h1>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Avatar</th>
            <th>job</th>
            <th>Phone</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>{printItem()}</tbody>
      </table>
    </div>
  );
};

export default DetailDepartment;
