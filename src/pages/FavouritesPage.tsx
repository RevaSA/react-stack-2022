import React from 'react'
import {useAppSelector} from '../hooks/redux'

export default function FavouritesPage() {
  const {favourites} = useAppSelector(state => state.github)

  if (favourites.length === 0) {
    return (
      <p className="text-center">No items.</p>
    )
  }

  return (
    <div className="container py-10 mx-auto">
      <ul className="list-none">
        {favourites.map((favourite) => (
          <li key={favourite}>
            <a
              href={favourite}
              className="hover:text-red-600 transition-colors"
              target="_blank"
              rel="noreferrer"
            >{favourite}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
