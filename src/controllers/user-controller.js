
import User from "../models/user.model.js";
import Leave from "../models/leave.model.js";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let profileImage = "";

    if (req.file) {
      const formData = new FormData();
      formData.append("image", fs.createReadStream(req.file.path));

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
        formData,
        { headers: formData.getHeaders() }
      );

      profileImage = response.data.data.url;

      // remove file after upload
      fs.unlinkSync(req.file.path);
    }

    const user = await User.create({
      name,
      email,
      password,
      profileImage
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log("user create failed", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const matchPassword = user.password === password;
    if (!matchPassword) return res.status(401).json({ message: "Incorrect password" });

    res.status(201).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.log("error from controller", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(201).json({ message: "User fetched successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal error", error });
  }
};

// Leave controllers remain same
export const createLeave = async (req,res)=>{
   try {
    const leave =await Leave.create(req.body)
       res.status(201).json({
        message:"leave create succesfully",leave
       })
    console.log(leave)
   } catch (error) {
     res.status(500).json({message:"internal error from leave controller",error})
   }
}

export const getLeave = async (req, res) => {
  try {
    const { email } = req.params;
    console.log("Email from params:", email);

    const leave = await Leave.find({ userEmail: email });
    console.log("Leave fetched:", leave);

    if (!leave || leave.length === 0) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({ message: "Leave fetched successfully", leave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};



export const profileUpdate = async (req, res) => {
  try {
    const { email } = req.params;// email die cache kore dore update korbe
    const { name, password } = req.body;

    let updateData = {
      name,
      password,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const user = await User.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
    console.log(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

