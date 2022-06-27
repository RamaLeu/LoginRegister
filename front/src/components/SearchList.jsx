import React from 'react';
import UserList from './UserList';


function SearchList({ filteredUsers }) {
  const filtered = filteredUsers.map(person => <UserList key={person.id} users={person} />);
  return (
    <div>
      {filtered}
    </div>
  );
}

export default SearchList