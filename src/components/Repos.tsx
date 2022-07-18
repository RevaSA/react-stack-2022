import React from 'react'
import {useGetUserReposQuery} from '../store/github/github.api'
import RepoCard from './RepoCard'

interface ReposProps {
  username: string;
}

export default function Repos(props: ReposProps) {
  const { username } = props
  const {data: repos, isError, isFetching} = useGetUserReposQuery(username, {
    skip: username.length === 0,
    refetchOnFocus: true,
  })

  return (
    <div className="container mx-auto">
      {isFetching && (
        <p className="text-center">Loading repositories...</p>
      )}

      {isError && (
        <p className="text-center text-red-600">Something went wrong.</p>
      )}

      {repos?.map((repo) => (
        <RepoCard repo={repo} key={repo.id} />
      ))}
    </div>
  )
}
