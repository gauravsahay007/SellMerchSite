import React from 'react'
import { isAuthenticated } from '.'
import AdminDashboard from '../../user/AdminDashboard'
import { Navigate } from 'react-router-dom'

export default function AdminRoute() {
  return (
   (isAuthenticated() && isAuthenticated().user.role===1) ? <AdminDashboard/> : <Navigate to="/"/> 
  )
}
