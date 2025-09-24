import pool from "../dbconnector.js";

const UpdateStatus = async (status, jobnumber, assignedTo = null) => {
  try {
    let sql;
    let params;

    if (status.startsWith("complete") && assignedTo !== null) {

      sql = `
        UPDATE projectTasks
        SET status = ?, assignedTo = ?
        WHERE jobCardNo = ?;
      `;
      params = [status, assignedTo, jobnumber];
    } else {

      sql = `
        UPDATE projectTasks
        SET status = ?
        WHERE jobCardNo = ?;
      `;
      params = [status, jobnumber];
    }

    const [result] = await pool.query(sql, params);

    if (result.affectedRows > 0) {
      return {
        success: true,
        message: `${status} was successful`,
      };
    } else {
      throw new Error("No rows were updated. Invalid jobCardNo?");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    throw new Error("Failed to update field: " + error.message);
  }
};

export default UpdateStatus;
