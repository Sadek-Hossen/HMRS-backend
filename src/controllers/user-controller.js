import User from "../models/user.model.js"

export const createUser = async (req,res)=>{
  try {
      const {name,email,password}=req.body
    if(!name || !email || !password){
        res.status(400).json({
            message:"All fields are required"
        })
    }
    const user = await User.create({
        name,
        email,
        password
    });
    res.status(201).json({
        message:"User created successfully",
        user
    })
    console.log(user)
  } catch (error) {
    console.log("user create faild from user controller",error)
  }
}

export const loginUser =async (req,res)=>{

  try {
      const {email,password} =req.body;
      if(!email || !password){
        res.status(400).json({
          message:"all feild required"
        })
      }

     const user = await User.findOne({email})
     if(!user){
      res.status(404).json({
        message:"user cannot find"
      })
     }
  const matchPassword = user.password===password;
  if(!matchPassword){
      return res.status(401).json({ message: "Incorrect password" });
  }
  res.status(201).json({
     message: "User logged in successfully",
      user
  })
  console.log(user)

  } catch (error) {
    console.log("error from controller",error)
  }

}

export const getUser = async (req,res)=>{
try {
    const {email} = req.params;
  const user = await User.findOne({email})
  if(!user){
    res.status(401).json({message:"user not find"})
  }
  res.status(201).json({message:"user get successfully",user})

} catch (error) {
      res.status(500).json({message:"internal error from get controller",error})
}
}