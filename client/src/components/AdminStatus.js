import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import GetAdminStatus from './uicomponents/GetAdminStatus'

function AdminStatus() {
  return (
    <>
    <Sidebar/>
    <Navbar/>
    <GetAdminStatus/>
    </>
  )
}

export default AdminStatus