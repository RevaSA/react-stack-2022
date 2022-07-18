import React, {useEffect, useState} from 'react'
import {useSearchUsersQuery} from '../store/github/github.api'
import {useDebounce} from '../hooks/debouce';

interface SearchUsersProps {
  onSelectUser: (username: string) => void;
}

export default function SearchUsers(props: SearchUsersProps) {
  const [isDropdownShow, setIsDropdownShow] = useState(false)
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search)
  const {data: users, isError, isFetching} = useSearchUsersQuery(debounceSearch, {
    skip: debounceSearch.length < 3,
    refetchOnFocus: true,
  })

  useEffect(() => {
    setIsDropdownShow(!isFetching && debounceSearch.length >= 3 && users?.length! > 0)
  }, [isFetching, debounceSearch, users])

  const selectUserHandler = (username: string) => {
    setIsDropdownShow(false)
    setSearch('')
    props.onSelectUser(username)
  }

  return (
    <div className="relative w-[560px] mx-auto mb-10">
      <input
        type="text"
        className="border py-2 px-4 w-full h-[42px]"
        placeholder="Search for Github username..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {isFetching && (
        <p className="absolute top-[42px] right-0 left-0 text-center">Loading users...</p>
      )}

      {isError && (
        <p className="absolute top-[42px] right-0 left-0 text-center text-red-600">Something went wrong.</p>
      )}

      {isDropdownShow && (
        <ul className="list-none absolute top-[42px] right-0 left-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
          {users?.map(user => (
            <li
              className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              onClick={() => selectUserHandler(user.login)}
              key={user.id}
            >
              {user.login}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
