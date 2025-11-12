import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { locator, session } from '../utils/globalutils';
import { useEffect } from 'react';
import { useState } from 'react';

function Departments() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const data = await session();
      setUser(data);
    };

  fetchSession();
  }, []);

  function getstatusURL(){
    if(!user){
      console.log('user was not found please login');
      return 
    }
    
    const department = user.departmentName.toLowerCase();

    if(department === 'management' || department === 'administration'){
      return locator.getAdministrative_project_status
    }
    return locator.getProject_status_manager
  }

  const departments = [
    {
      id: 2,
      name: "Management",
      description: "Management and administrative tasks",
      icon: "bx bx-shield text-green-600",
      bgColor: "bg-green-100",
      link: getstatusURL(),
    },
    {
      id: 3,
      name: "Studio",
      description: "Creative design and development",
      icon: "bx bx-briefcase-alt text-pink-600",
      bgColor: "bg-pink-100",
      link: locator.getProject_status_studio,
    },
    {
      id: 4,
      name: "Workshop",
      description: "Production and manufacturing",
      icon: "bxr  bx-hard-hat text-2xl text-orange-600",
      bgColor: "bg-orange-100",
      link: locator.getProject_status_workshop,
    },
    {
      id: 5,
      name: "Warehouse",
      description: "Storage and inventory management",
      icon: "bx bx-cube text-teal-600",
      bgColor: "bg-teal-100",
      link: locator.getProject_status_warehouse,
    },
  ];

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="ml-64 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{dept.name}</h3>
                  <p className="text-gray-600 text-sm">{dept.description}</p>
                </div>
                <div className={`w-12 h-12 ${dept.bgColor} rounded-lg flex items-center justify-center`}>
                  <i className={`${dept.icon} bx-md`}></i>
                </div>
              </div>

              <button
                onClick={dept.link}
                className="text-blue-600 text-sm hover:underline mt-2 text-left"
              >
                Click to view department details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Departments;
