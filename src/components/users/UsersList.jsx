import React, { useEffect, useState } from 'react';
import UsersListTable from './UsersListTable';
import api from '../../utils/api';

function UsersList({ page }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api.users
      .list()
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <UsersListTable page={page} rows={users} />
    </div>
  );
}

export default UsersList;
