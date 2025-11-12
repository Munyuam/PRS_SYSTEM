import pool from "../dbconnector.js";

const updateProfile = async (username, email, department, userId) => {
  if (!username || !email || !department || !userId) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

  try {
    const department_Id = await getDepartmentID(department);

    if (!department_Id) {
      return {
        success: false,
        message: "Invalid department selected.",
      };
    }

    const sql = "UPDATE users SET departmentID = ?, username = ?, email = ? WHERE userID = ?";
    const [result] = await pool.query(sql, [department_Id, username, email, userId]);

    if (result.affectedRows > 0) {
      return {
        success: true,
        message: "Profile updated successfully.",
      };
    } else {
      return {
        success: false,
        message: "No changes were made or user not found.",
      };
    }
  } catch (error) {
    console.error("An error occurred while updating profile:", error.message);
    return {
      success: false,
      message: "Database error occurred.",
    };
  }
};

async function getDepartmentID(department) {
  try {
    const sql = "SELECT departmentID FROM departments WHERE departName = ?";
    const [rows] = await pool.query(sql, [department]);

    if (rows.length > 0) {
      return rows[0].departmentID;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching department ID:", error.message);
    return null;
  }
}

export default updateProfile;
