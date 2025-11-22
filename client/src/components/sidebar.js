import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { locator, session } from '../utils/globalutils';
import { Notyf } from 'notyf';

function Sidebar() {
  const [deptOpen, setDeptOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false); 
  const notfy = new Notyf();
  const location = useLocation();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sess = await session();
        setUser(sess);
      } catch (err) {
        console.error("Session fetch failed:", err);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    setOpenSidebar(false);
  }, [location.pathname]);

  const departmentname = user?.departmentName;
  let url = "/";
  let status_url = () => window.location.href = "/";

  if (departmentname) {
    url = `/department/${departmentname}`;

    switch (departmentname) {
      case 'Administration':
      case 'Management':
        status_url = locator.getAdministrative_project_status;
        break;
      case 'Studio':
        status_url = locator.getProject_status_studio;
        break;
      case 'Warehouse':
        status_url = locator.getProject_status_warehouse;
        break;
      case 'Workshop':
        status_url = locator.getProject_status_workshop;
        break;
      default:
        status_url = () => window.location.href = "/";
    }
  }

  const departments = [
    { name: 'All Departments', url: '/departments/all' },
    { name: 'Administration', url: '/administration/project-status' },
    { name: 'Management', url: '/management/project-status' },
    { name: 'Studio', url: '/studio/project-status' },
    { name: 'Workshop', url: '/workshop/project-status' },
    { name: 'Warehouse', url: '/warehouse/project-status' },
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-2 left-4 z-[100] bg-gray-900 text-white px-2 py-1 rounded-lg shadow"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        <i className="bx bx-menu text-2xl"></i>
      </button>

      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setOpenSidebar(false)}
        ></div>
      )}

      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col z-50
          transform transition-transform duration-300

          ${openSidebar ? "translate-x-0" : "-translate-x-64"} 
          lg:translate-x-0   /* ALWAYS visible on large screens */
        `}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex space-x-3 flex-row">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>

            <div className="flex flex-col">
              <h2 className="font-bold text-white text-xl">PROJECT</h2>
              <h2 className="text-sm text-gray-300">REPORT</h2>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">

          <NavLink
            to={url}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            <i className="bx bx-home text-2xl"></i>
            <span>HOME</span>
          </NavLink>

          {typeof status_url === "string" ? (
            <NavLink
              to={status_url}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`
              }
            >
              <i className="bx bx-pulse text-2xl"></i>
              <span>STATUS</span>
            </NavLink>
          ) : (
            <button
              onClick={status_url}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left text-gray-300 hover:bg-gray-800"
            >
              <i className="bx bx-pulse text-2xl"></i>
              <span>STATUS</span>
            </button>
          )}

          <NavLink
            to="/p/completed-projects"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            <i className="bx bx-check-circle text-2xl"></i>
            <span>COMPLETED TASKS</span>
          </NavLink>

          <div className="relative">
            <button
              onClick={() => setDeptOpen(!deptOpen)}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${
                location.pathname.includes('/department')
                  ? 'bg-gradient-to-br from-green-500 to-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <i className="bx bx-building text-2xl"></i>
                <span>DEPARTMENTS</span>
              </div>

              <i className={`bx bx-chevron-${deptOpen ? 'up' : 'down'} text-xl`}></i>
            </button>

            {deptOpen && (
              <div className="ml-8 mt-1 space-y-1">
                {departments.map((dept) => (
                  <NavLink
                    key={dept.url}
                    to={dept.url}
                    end
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#3D5A73] text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`
                    }
                  >
                    {dept.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="p-3">
          <button
            className="flex items-center space-x-3 w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            onClick={locator.logout}
          >
            <i className="bx bx-log-out text-xl"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
