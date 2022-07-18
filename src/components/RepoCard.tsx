import React, {useState} from 'react'
import {IRepo} from '../models/models'
import {useAppSelector} from '../hooks/redux'
import {useActions} from '../hooks/actions'

interface RepoCardProps {
  repo: IRepo;
}

export default function Repos(props: RepoCardProps) {
  const { repo } = props
  const { favourites } = useAppSelector(state => state.github)
  const [isFavourite, setIsFavourite] = useState(favourites.includes(repo.html_url))
  const {addFavourite, removeFavourite} = useActions()

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addFavourite(repo.html_url)
    setIsFavourite(true)
  }

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    removeFavourite(repo.html_url)
    setIsFavourite(false)
  }

  return (
    <a href={repo.html_url}
       className="block border py-3 px-5 mb-2 rounded hover:shadow-md hover:bg-gray-100 transition-all"
       target="_blank"
       rel="noreferrer"
    >
      <h2 className="text-lg font-bold">{repo.full_name}</h2>

      <p className="text-sm">
        Forks: <span className="font-bold mr-2">{repo.forks}</span>
        Watchers: <span className="font-bold">{repo.watchers}</span>
      </p>

      <p className="text-sm font-thin mb-2">
        {repo.description}
      </p>

      {!isFavourite && (
        <button
          type="button"
          className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
          onClick={addToFavourite}
        >
          Add
        </button>
      )}

      {isFavourite && (
        <button
          type="button"
          className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
          onClick={removeFromFavourite}
        >
          Remove
        </button>
      )}
    </a>
  )
}
