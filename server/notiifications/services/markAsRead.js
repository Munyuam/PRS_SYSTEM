import pool from "../../data/dbconnector.js";

const isRead = {
    markAsRead: async (notificationId, userId) => {       
        try {
            // First, get the notification to find the target department
            const getNotificationSql = 'SELECT targetDepartment FROM notifications WHERE id = ?';
            const [notification] = await pool.query(getNotificationSql, [notificationId]);
            
            if (!notification || notification.length === 0) {
                return {
                    success: false,
                    message: 'Notification not found!'
                };
            }
            
            const targetDepartment = notification[0].targetDepartment;

            const sql = 'INSERT INTO notificationReadStatus (notificationID, userID, readAt) VALUES (?, ?, NOW())';
            const [result] = await pool.query(sql, [notificationId, userId]);

            if (result.affectedRows === 0) {
                return {
                    success: false,
                    message: 'Failed to mark notification as read!'
                };
            }

            const checkUsersSql = `
                SELECT 
                    COUNT(DISTINCT u.userID) as totalUsers,
                    COUNT(DISTINCT nrs.userID) as usersRead
                FROM users u
                LEFT JOIN notificationReadStatus nrs ON u.userID = nrs.userID AND nrs.notificationID = ?
                WHERE u.departmentID = ?
            `;
            
            const [readStatus] = await pool.query(checkUsersSql, [notificationId, targetDepartment]);
            
            const allUsersRead = readStatus[0].usersRead === readStatus[0].totalUsers;

            return {
                success: true,
                message: 'Notification marked as read successfully',
                data: {
                    allUsersRead: allUsersRead,
                    usersRead: readStatus[0].usersRead,
                    totalUsers: readStatus[0].totalUsers
                }
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }, 

    markAllAsRead: async (userId) => {
        try {
            const getUnreadSql = `
                SELECT n.ID 
                FROM notifications n
                WHERE n.targetDepartment = (
                    SELECT departmentID FROM users WHERE userID = ?
                )
                AND n.ID NOT IN (
                    SELECT notificationID FROM notificationReadStatus WHERE userID = ?
                )
            `;
            
            const [unreadNotifications] = await pool.query(getUnreadSql, [userId, userId]);

            
            const insertSql = `
                INSERT INTO notificationReadStatus (notificationID, userID, readAt) 
                VALUES ?
            `;
            
            const values = unreadNotifications.map(notif => [notif.id, userId, new Date()]);
            
            if (values.length > 0) {
                const [result] = await pool.query(insertSql, [values]);
                return {
                    success: true,
                    message: `Marked ${result.affectedRows} notifications as read`,
                    count: result.affectedRows
                };
            } else {
                return {
                    success: true,
                    message: 'No unread notifications found',
                    count: 0
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    getNotificationReadStatus: async (notificationId) => {
        try {
            const sql = `
                SELECT 
                    n.*,
                    COUNT(DISTINCT nrs.userID) as usersRead,
                    (SELECT COUNT(*) FROM users WHERE departmentID = n.targetDepartment) as totalUsers,
                    GROUP_CONCAT(DISTINCT nrs.userID) as readByUserIds
                FROM notifications n
                LEFT JOIN notificationReadStatus nrs ON n.ID = nrs.notificationID
                WHERE n.ID = ?
                GROUP BY n.ID
            `;
            
            const [result] = await pool.query(sql, [notificationId]);
            return {
                success: true,
                data: result[0] || null
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    },

    getUnreadNotifications: async (userId) => {
    try {
        const userCheckSql = 'SELECT  * FROM users WHERE userID = ?';
        const [userResults] = await pool.query(userCheckSql, [userId]);
        
        console.log('User results:', userResults);
        
        if (userResults.length === 0) {
            return {
                success: false,
                message: 'User not found'
            };
        }
        
        if (userResults.length > 1) {
            console.warn(`Multiple users found with ID ${userId}. Using first result.`);
        }
        
        const departmentID = userResults[0].departmentID;
        
        const sql = `
            SELECT n.* 
            FROM notifications n
            WHERE n.targetDepartment = ?
            AND n.ID NOT IN (
                SELECT notificationID FROM notificationReadStatus WHERE userID = ?
            )
            ORDER BY n.createdAt DESC
        `;
        
        const [result] = await pool.query(sql, [departmentID, userId]);
        return {
            success: true,
            data: result,
            count: result.length
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}
};

export default isRead;