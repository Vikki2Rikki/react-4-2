import React, { useEffect, useState } from 'react';
import UsersList from './UsersList/UsersList';
import { getAllUsers } from 'api/users';
//import SearchUsersForm from 'components/Forms/SearchUsersForm/SearchUsersForm';
//import data from '../../users.json';
//import FilterUsersForm from 'components/Forms/FilterUsersForm/FilterUsersForm';

const Users = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   setIsLoading(true);
  //   getAllUsers()
  //     .then(data => setUsers(data.users))
  //     .catch(err => {
  //       setError(error.message);
  //       console.log(err);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getAllUsers();
      setUsers(data.users);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <UsersList users={users} />
    </>
  );
};

export default Users;
