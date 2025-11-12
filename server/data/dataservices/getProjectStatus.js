import pool from "../dbconnector.js";

const statuses = async (department) => {

  const selectDepartment = (department) => {
    switch (department) {
      case 'administration': return 1;
      case 'management': return 2;
      case 'studio': return 3;
      case 'workshop': return 4;
      case 'warehouse': return 5;
      default:
        console.error("Invalid department found");
        return null;
    }
  };

  const depID = selectDepartment(department);
  if (!depID) return [];

  const completed_status = 'completed';

  try {
    const task_sql = `
      SELECT jobCardNo, taskName, assignedTo, status 
      FROM projectTasks 
      WHERE status != ? AND assignedTo = ?
    `;
    const [task_result] = await pool.query(task_sql, [completed_status, depID]);

    if (task_result.length === 0) return [];

    const allProjectStatus = [];

    for (const task of task_result) {
      const [project_result] = await pool.query(
        `SELECT projectID, jobCardNo, clientContactName, jobDetails, preparedBy, deliveryDate, totalCharge
         FROM projects WHERE jobCardNo = ?`,
        [task.jobCardNo]
      );

      const [department_result] = await pool.query(
        `SELECT departName, departmentID FROM departments WHERE departmentID = ?`,
        [task.assignedTo]
      );

      if (project_result.length > 0 && department_result.length > 0) {
        allProjectStatus.push({
          jobCardNo: task.jobCardNo,
          taskName: task.taskName,
          departmentName: department_result[0].departName,
          status: task.status,
          projectID: project_result[0].projectID,
          clientContactName: project_result[0].clientContactName,
          jobDetails: project_result[0].jobDetails,
          preparedBy: project_result[0].preparedBy,
          deliveryDate: project_result[0].deliveryDate,
          totalCharge: project_result[0].totalCharge
        });
      }
    }

    return allProjectStatus;

  } catch (error) {
    console.error('Error in statuses:', error);
    throw new Error("Problem With the Connection. Please try again later");
  }
};



export default statuses;
