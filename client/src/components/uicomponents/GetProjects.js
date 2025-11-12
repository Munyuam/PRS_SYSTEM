import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { getProgress, newproject,locator, getStageName,formatCash, session } from "../../utils/globalutils";

function GetProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const loadProjects = async () => {
    try {
      const response = await fetch("/getProjects");
      if (response.ok) {
        const data = await response.json();
        const activeProjects = data.filter(item => item.assignedTo !== -1 && item.taskName !== null);
        setProjects(activeProjects);
      } else {
        console.log("Error occurred while connecting to database");
      }
    } catch (error) {
      console.log("Error while connecting to database", error);
    }
  };

  useEffect(() => {
    loadProjects();

    const fetchSession = async ()=>{
      const sess = await session();
      setUser(sess);
    }

    fetchSession();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.jobDetails.toLowerCase().includes(search.toLowerCase()) ||
    project.clientContactName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const departmentname = user?.departmentName;
  let status_url;

  if(departmentname){
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
  
  return (
    <div className="bg-gray-50 w-[80%] mx-[20%] px-6 py-8">
      <h1 className="text-4xl font-bold mb-6">Project List</h1>

      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="text"
            placeholder="Search projects..."
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
            onClick={status_url}
          >
            View Status
          </button>
          <button
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium"
            onClick={newproject}
          >
            Add Project
          </button>
        </div>
      </div>

      {displayedProjects.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-md">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 font-thin">
                <th className="px-4 py-2 text-gray-600">JOB DETAILS</th>
                <th className="px-4 py-2 text-gray-600">CLIENT</th>
                <th className="px-4 py-2 text-gray-600">STATUS</th>
                <th className="px-4 py-2 text-gray-600">PROGRESS</th>
                <th className="px-4 py-2 text-gray-600">TOTAL (MWK)</th>
                <th className="px-4 py-2 text-gray-600">DEPARTMENT</th>
              </tr>
            </thead>
            <tbody className="bg-white rounded-md">
              {displayedProjects.map((item, index) => {
                const stageName = getStageName(item.projectStatus);
                const firstWord = stageName?.split(" ")[0];

                return (
                  <tr
                    key={index}
                    className="text-[17px] border-b border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-4 py-2">{item.jobDetails}</td>
                    <td className="px-4 py-2">{item.clientContactName}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {firstWord}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <ProgressBar
                        completed={getProgress(item.projectStatus)}
                        bgColor="#56A672"
                        baseBgColor="#e5e7eb"
                        height="15px"
                        labelAlignment="center"
                      />
                    </td>
                    <td className="px-4 py-2">{formatCash(Math.floor(item.totalCharge))}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {item.departmentName}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-16">
          <p className="text-gray-500 mb-4">No projects available for your department</p>
          <button
            className="px-6 py-2 rounded-md bg-green-400 text-white hover:bg-green-500 transition"
            onClick={newproject}
          >
            Create First Project
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-md border ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetProjects;
