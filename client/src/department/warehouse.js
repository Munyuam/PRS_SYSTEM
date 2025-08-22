import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Dboard from '../components/Dboard'

function Warehouse() {
  return (
    <div>
      <p>
        <Sidebar/>
        <Navbar/>
        <Dboard/>
      </p>
    </div>
  )
}

export default Warehouse
