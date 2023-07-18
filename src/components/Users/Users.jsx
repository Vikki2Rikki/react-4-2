import React, { useEffect, useMemo, useRef, useState } from 'react';
import UsersList from './UsersList/UsersList';
import { getAllUsers } from 'api/users';
import Modal from 'components/Modal/Modal';

const Users = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const sortedUsers = useMemo(() => {
    return users?.toSorted((a, b) => {
      console.log('Sorting');
      return a.firstName.localeCompare(b.firstName);
    });
  }, [users]);

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

  // useREf
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>show</button>
      <button onClick={handleFocus}>Focus</button>
      <input type="text" ref={inputRef} />

      {showModal && <Modal closeModal={() => setShowModal(false)}>Modal</Modal>}
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <UsersList users={sortedUsers} />
    </>
  );
};

export default Users;

//======================
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

//   useEffect(() => {
//     getUsers();
//   }, []);

//   const getUsers = async () => {
//     setIsLoading(true);
//     setError('');
//     try {
//       const data = await getAllUsers();
//       setUsers(data.users);
//       setIsLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {isLoading && <h2>Loading...</h2>}
//       {error && <h2>{error}</h2>}
//       <UsersList users={users} />
//     </>
//   );
// };

// export default Users;
