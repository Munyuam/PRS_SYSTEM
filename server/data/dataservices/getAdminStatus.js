import pool from "../dbconnector.js";

const AdminStatus = async () => {

  const completed_status = 'completed';

  try {
    const task_sql = `
      SELECT jobCardNo, taskName, assignedTo, status 
      FROM projectTasks 
      WHERE status != ? 
      AND assignedTo != 100 
      AND assignedTo != -1
    `;
    const [task_result] = await pool.query(task_sql, [completed_status]);  

    if (task_result.length === 0) {
      return [];
    }

    const allProjectStatus = [];

    for (const task of task_result) {
      const sqlProjects = `
        SELECT projectID, jobCardNo, clientContactName, jobDetails, preparedBy, deliveryDate, totalCharge
        FROM projects 
        WHERE jobCardNo = ?
      `;
      const [project_result] = await pool.query(sqlProjects, [task.jobCardNo]);

      const department_sql = `
        SELECT departName, departmentID 
        FROM departments 
        WHERE departmentID = ?
      `;
      const [department_result] = await pool.query(department_sql, [task.assignedTo]);

      if (project_result.length > 0 && department_result.length > 0) {

        const data = {
          jobCardNo: task.jobCardNo,
          taskName: task.taskName,
          departmentName: department_result[0].departName,
          status: task.status,
          assignedTo: task.assignedTo,
          projectID: project_result[0].projectID,
          clientContactName: project_result[0].clientContactName,
          jobDetails: project_result[0].jobDetails,
          preparedBy: project_result[0].preparedBy,
          deliveryDate: project_result[0].deliveryDate,
          totalCharge: project_result[0].totalCharge
        };

        allProjectStatus.push(data);

      } else {
        console.warn(`No matching project or department for jobCardNo: ${task.jobCardNo}`);
      }
    }

    return allProjectStatus;

  } catch (error) {
    throw new Error("Problem with the connection. Please try again later");
  }
};

export default AdminStatus;
