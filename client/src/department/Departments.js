import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { locator, session } from '../utils/globalutils';

function Departments() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const data = await session();
      setUser(data);
    };

    fetchSession();
  }, []);

  function getstatusURL(user) {
    if (!user) return;

    const department = user?.departmentName?.toLowerCase();

    if (department === 'management' || department === 'administration') {
      return locator.getAdministrative_project_status;
    }
    return locator.getProject_status_manager;
  }

  if (!user) {
    return (
      <div className="lg:ml-64 p-6">
        <p className="text-gray-500">Loading user info...</p>
      </div>
    );
  }

  const departments = [
    {
      id: 2,
      name: "Management",
      description: "Management and administrative tasks",
      icon: "bx bx-shield text-green-600",
      bgColor: "bg-green-100",
      link: user ? getstatusURL(user) : "#",
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
      icon: "bx bx-hard-hat text-orange-600",
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
      <Navbar hasSidebar={true} />
      <Sidebar />

      <div className="p-6 w-full lg:ml-64 transition-all">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Departments</h2>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <div 
              key={dept.id} 
              className="bg-white rounded-lg shadow p-6 flex flex-col justify-between hover:shadow-md transition"
            >
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
                className="text-blue-600 text-sm hover:underline mt-2"
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
