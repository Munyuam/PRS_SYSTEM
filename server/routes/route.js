import { Router } from "express";
import loginDetails from "../data/dataservices/getLoginData.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/api", (req, res) => {
  res.json({
    data: [{ id: 500, name: "This site is under construction" }],
  });
});

router.post("/login", async (req, res) => {    
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({ error: "Invalid request format" });
    }
    const { username, password } = req.body;
    try {
        const users = await loginDetails(username.trim(), password.trim());

        res.json({
            success: true,
            message: `${users.username} successfully logged in`,
            users :users
        });

    } catch (error) {
        if(error.message === 'username or password was not found'){
            res.status(401).json({ 
                success: false, 
                message: error.message 
            })
        }else{
            res.status(500).json({ 
                success: false, 
                message: error.message 
            })
        }
    }
});
export default router;
