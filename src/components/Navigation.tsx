import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <div className="bg-gray-500 px-5 shadow-md">
      <nav className="container flex justify-between items-center h-[50px] mx-auto text-white">
        <h3 className="font-bold">Github Search</h3>

        <span>
          <Link to="/" className="mr-2">Home</Link>
          <Link to="/favourites">Favourites</Link>
        </span>
      </nav>
    </div>
  )
}
