import React, {useState} from 'react'
import SearchUsers from '../components/SearchUsers'
import Repos from '../components/Repos'


export default function HomePage() {
  const [username, setUsername] = useState('')
  const selectUserHandler = (username: string) => {
    setUsername(username)
  }

  return (
    <div className="pt-10 py-10">
      <SearchUsers
        onSelectUser={selectUserHandler}
      />

      <Repos
        username={username}
      />
    </div>
  )
}
