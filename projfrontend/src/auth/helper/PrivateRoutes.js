import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '.'
import UserDashboard from '../../user/UserDashboard'

export default function PrivateRoute() {
  return (
    (isAuthenticated()) ? <UserDashboard/> : <Navigate to="/"/>
  )
}
