import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../features/userSlice';
import "../styles/styles.css";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, status, error, addUserStatus } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(addUser());
  };

  const handleRefreshUsers = () => {
    dispatch(fetchUsers());
  };

  return (
    <div className="users-container">
      <h1>Список пользователей</h1>

      {status === 'loading' && <p className="loading">Загрузка пользователей...</p>}
      {status === 'failed' && <p className="error">Ошибка: {error}</p>}

      <ul className="users-list">
        {users.map((user, index) => (
          <li key={index} className="user-card">
            <span>{user.name}</span>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>

      {addUserStatus === 'loading' && <p className="loading">Загрузка...</p>}
      
      <button onClick={handleAddUser} disabled={addUserStatus === 'loading'}>
        ➕ Добавить пользователя
      </button>

      <button onClick={handleRefreshUsers} disabled={status === 'loading'}>
        🆙 Обновить список
      </button>
    </div>
  );
};

export default UsersList;
