const User = require("../models/user");
const bcrypt = require("bcryptjs");

const register = async(req, res) => {
        try {
            const { username, email, password } = req.body;
            if(!username || !email || !password){
                return res.status(400).json({ error:"All fields are required!" });
            }
            if(username.length<5){
                return res.status(400).json({ error:"Username should be at least 5 characters!" });
            }
            if(password.length<=3){
                return res.status(400).json({ error:"Password should be at least 4 characters!" });
            }

            const checkUser = await User.findOne({ $or: [{ email }, { username }] }); // check if databse mei matching credential already exist krta hai
            if(checkUser){
                return res.status(400).json({ error:"Username or email already exists!" });
            }
            else{
                const hashPass = await bcrypt.hash(password, 10);  // 10 is the salt
                const newUser = new User({ username, email, password: hashPass });
                await newUser.save();
                return res.status(200).json({ success:"Registration successful!" })
            }
        } catch (error) {
            console.log("Registration Error:", error); 
            return res.status(500).json({ error: "Internal server error!" });
        }
    }

module.exports = { register };