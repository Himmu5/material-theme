import React, { useEffect } from 'react';
import UsersListTable from './UsersListTable';
import api from '../../utils/api';

function UsersList({ page }) {
  useEffect(() => {
    api.users
      .list()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <UsersListTable
        page={page}
        rows={[
          {
            si_no: 1,
            name: 'Mark Spectre',
            email: 'mark@email.com',
            phone: '+91 9852552221',
            location: 'Ernakulam',
            education: 'B Tech, 3rd Sem CUSAT',
            course: 'Getting started with..',
            progress: '70%',
            purchased: 'Yes',
          },
          {
            si_no: 2,
            name: 'Mark Spectre',
            email: 'mark@email.com',
            phone: '+91 9852552221',
            location: 'Ernakulam',
            education: 'B Tech, 3rd Sem CUSAT',
            course: 'Getting started with..',
            progress: '70%',
            purchased: 'Yes',
          },
        ]}
      />
    </div>
  );
}

export default UsersList;
