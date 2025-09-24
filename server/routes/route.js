import { Router } from "express";
import loginDetails from "../data/dataservices/getLogin.js";
import CreateProject from "../data/dataservices/projectInit.js";
import loadProjects from "../data/dataservices/getProjects.js";
import statuses from "../data/dataservices/getProjectStatus.js";
import approveProject from "../data/dataservices/approveProject.js";
import rejectProject from "../data/dataservices/rejectProject.js";
import getusers from "../data/dataservices/getUsers.js";
import registerUser from "../data/dataservices/registerUser.js";
import UpdateStatus from "../data/dataservices/updatstatus.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});


router.post("/login", async (req, res) => {    
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: "Invalid request format" });
    }
    const { username, password } = req.body;

    try {
        const users = await loginDetails(username.trim(), password.trim());     

        req.session.userid = users.id;
        req.session.username = users.username;
        req.session.email = users.email;
        req.session.role = users.role;
        req.session.department_name = users.department_name;
        req.session.departId = users.departId;
        
        req.session.save((err) => {
           
            if (err) {
                return res.status(500).json({ error: 'Session error' });
            }
            
            res.json({
                success: true,
                message: `${users.username} successfully logged in`,
                users: users,
                sessionData: req.session
            });
        });

    } catch (error) {
        if(error.message === 'username or password was not found'){
            res.status(401).json({ 
                success: false, 
                message: error.message 
            });
        }else{
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }
});

router.get('/Admin', async (req, res) => {
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 
    const userDepartmentID = req.session.departId;

    if(!userID){
        return res.status(401).json({
            error: "Access to this Resource is Restricted. Please Login",
            sessionData: req.session 
        });
    }

    if(userDepartment !== 'Administration'){
        return res.status(403).json({
            error: "Access to this Resource is Restricted to Administrators only",
            sessionData: req.session
        });
    }

    res.json({
        success: true,
        sessionData: req.session,
    });
});

router.get('/Management', async (req, res) => {
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 
    const username = req.session.username;
    const userDepartmentID = req.session.department_Id;

    console.log(`user ID is =>` + userID + ` username is =>`+ username);
    
    if(!userID){
        return res.status(401).json({
            error: "Access to this Resource is Restricted. Please Login",
            sessionData: req.session 
        });
    }

    if(userDepartment !== 'Management'){
        return res.status(403).json({
            error: "Access to this Resource is Restricted to Management",
            sessionData: req.session
        });
    }

    res.json({
        success: true,
        message: `${username} successfully accessed management panel`,
        sessionData: req.session
    });
});

router.post('/approvProject', async (req, res) => {
  try {
    const { projectId, jobCard } = req.body;

    if (!projectId || !jobCard) {
      return res.status(400).json({
        success: false,
        message: "Invalid data received"
      });
    }

    const approvedProjects = await approveProject(jobCard);

    if (approvedProjects.success) {
      res.json(approvedProjects);
    } else {
      res.status(404).json(approvedProjects);
    }
  } catch (error) {
    console.error("Error approving project:", error);
    res.status(500).json({
      success: false,
      message: "Server error while approving project"
    });
  }
});

router.post('/rejectProject', async (req, res)=>{

    try {
        const { projectId, jobCard } = req.body;

        if (!projectId || !jobCard) {
        return res.status(400).json({
            success: false,
            message: "Invalid data received"
        });
        }

        const rejected =  await rejectProject(jobCard);
        
        if(rejected.success){
            res.json(rejected);
        } else {
        res.status(404).json(rejected);
        }

    } catch (error) {
        console.error("Error approving project:", error);
        res.status(500).json({
        success: false,
        message: "Server error while approving project"
        });
    }
});


router.post('/updatestatus', async (req, res) => {
    
    if(!req.body || typeof req.body !== 'object'){
        return res.status(400).json({
            success: false,
            message: "Invalid data received"
        })
    }
    const { status, jobcardno, assignedTo } = req.body;

    if (!status || !jobcardno) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const updatedstatus = await UpdateStatus(status, jobcardno, assignedTo || null);

    if(updatedstatus.success){
        res.status(200).json({
            success: true
        })
    }else{
        res.status(500).json(500)({
            success:false
        })
    } 
})


router.post('/projectInit', async (req, res) => {
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ success: false, message: "Invalid data received" });
    }

    const userId = req.session.userid;
    const formData = req.body;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: You must be logged in to initialize a project"
        });
    }

    try {
        const projectInit = await CreateProject(formData, userId);

        res.status(200).json({
            success: true,
            message: "Project Successfully Initialized.",
            projectData: projectInit,  
            sessionData: req.session
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error initializing project: " + error.message
        });
    }
});

router.get('/getProjects', async (req, res) => {
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 
    const username = req.session.username;
    const userDepartmentID = req.session.departId;

    console.log("The project department of user is => "+ userDepartmentID)
    console.log("The userID of the user is => " + userID)
    if(userDepartment && userID){
        try {
        const projects = await loadProjects();

        const filteredProjects = projects.filter((p)=>{
                return p.assignedTo == userDepartmentID
        })

        console.log(filteredProjects);
        
        if(filteredProjects.length > 0){
            res.status(200).json(filteredProjects)
        }else{
            res.status(200).json("No project Assigned to this Project")
        }

    } catch (error) {
        
    }
    }else{
        res.status(500).json("Access to this resource is restricted. Please Login")
    }
});

router.get('/getProjectStatus', async (req, res) => {
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 
    const username = req.session.username;
   
    if(userID && userDepartment){
        try {   
            const projectStatus = await statuses();

            console.log(projectStatus)

            const filteredProjects = projectStatus.filter((project)=>{
                return project.departmentName == userDepartment
            })

            if(filteredProjects.length > 0){
                res.status(200).json(filteredProjects)
            }else{
                res.status(500).json("No projects available for your department");
            }  

        } catch (error) {
            console.error('Error fetching statuses:', error);
            res.status(500).json({ error: 'Failed to load statuses' });
        }
    }else{
        res.status(500).json("Access to this resource is priviledged, login first")
    }

});


router.get("/getUsers", async (req, res) => {
  try {
    const users = await getusers();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to load users" });
  }
});


router.post('/registerUser', async (req, res) => {
    
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: "Invalid request format" });
    }

    const { username, fullName, email, role } = req.body;
    
    console.log(req.body);
    console.log(role)

    const generatePassword = (username, fullname) => {
        let pass = "";
        if (typeof username === "string" && typeof fullname === "string") {
            let userPlaceholder = username[0] || "";
            let namePlaceholder = fullname[0] || "";
            pass = userPlaceholder + namePlaceholder + new Date().getFullYear();
        }
        return pass;
    };

    const password = generatePassword(username, fullName);

    try {
        const registered = await registerUser(role, username, fullName, email, password);            
        console.log(registered);
        res.status(201).json({ message: "User registered successfully", result: registered });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/Admin', async (req, res) => {
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 
    const username = req.session.username;

    if(!userID){
        return res.status(401).json({
            error: "Access to this Resource is Restricted. Please Login",
            sessionData: req.session 
        });
    }

    if(userDepartment !== 'Administration'){
        return res.status(403).json({
            error: "Access to this Resource is Restricted to Administrators only",
            sessionData: req.session
        });
    }

    res.json({
        success: true,
        sessionData: req.session,
    });

});


router.get('/studio', async (req, res) => { 
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 

    if(!userID){
        return res.status(401).json({
            error: "Access to this Resource is Restricted. Please Login",
            sessionData: req.session 
        });
    }

    if(userDepartment !== 'Studio'){
        return res.status(403).json({
            error: "Access to this Resource is Restricted to Studio only",
            sessionData: req.session
        });
    }

    res.json({
        success: true,
        sessionData: req.session,
    });
});

router.get('/warehouse', async (req, res) => { 
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 

    if(!userID){
        return res.status(401).json({
            error: "Access to this Resource is Restricted. Please Login",
            sessionData: req.session 
        });
    }

    if(userDepartment !== 'Warehouse'){
        return res.status(403).json({
            error: "Access to this Resource is Restricted to Warehouse only",
            sessionData: req.session
        });
    }

    res.json({
        success: true,
        sessionData: req.session,
    });
});

router.get('/workshop', async (req, res) => { 
    const userID = req.session.userid;
    const userDepartment = req.session.department_name; 

    if(!userID){
        return res.status(401).json({
            error: "Access to this Resource is Restricted. Please Login",
            sessionData: req.session 
        });
    }

    if(userDepartment !== 'Workshop'){
        return res.status(403).json({
            error: "Access to this Resource is Restricted to Workshop only",
            sessionData: req.session
        });
    }

    res.json({
        success: true,
        sessionData: req.session,
    });
});


router.get('/logout', async (req, res,next) => { 
    if(req.session){    

        req.session.destroy((error)=>{
            if(error){
                return next(error)
            }else{
                res.clearCookie('connect.sid');
                return res.redirect('/')
            }
        });

    }else{
        res.json("No session Found to Logout")
    }
});

export default router;