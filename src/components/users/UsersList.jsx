import React from 'react';
import UsersListTable from './UsersListTable';

function UsersList() {
  return (
    <div>
      <UsersListTable
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
