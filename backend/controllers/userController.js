import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/User.js'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/Doctor.js'
import appointmentModel from '../models/Appointment.js'

//API to register user
const registerUser = async (req,res) => {
  try {
    const {name,email, password} = req.body 
    if(!name || !email ||!password){
      return res.json({success:"false",message: "Missing Details"})
    }
    //Validating email format
    if(!validator.isEmail(email)){
      return res.json({success:"false",message: "Invalid Email"})
    }
    //Validating strog password
    if(password.length < 8){
      return res.json({success:"false",message: "Password should be at least 8 characters"})
    }
    //Hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
    res.json({success:'true', token}) 
    
    
  } catch (error) {
    console.log(error);
    res.json({ success: "false", message: error.message });
    
  }
}


//APi for user Login 
const loginUser = async (req,res) => {
  try {
    const {email,password} = req.body
    const user = await userModel.findOne({email})

    if(!user){
      return res.json({sucess:'false',message:'user does not exist'})
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(isMatch){
      const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
      res.json({success:'true',token})
    } else {
      res.json({success:'false',message:'Invalid Password'})
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: "false", message: error.message });
  }
}

//Api to book appointment
const bookAppointment = async (req,res) =>{

 try {
  const {userId , docId , slotDate, slotTime} = req.body
  const docData = await doctorModel.findById(docId).select('-password')

  if(!docData.available){
    return res.json({success:'false',message:'Doctor is not available'})
  }

  let slots_booked = docData.slots_booked
  //checking slots availibility

  if(slots_booked[slotDate]){
    if(slots_booked[slotDate].includes(slotTime)){
      return res.json({success:'false',message:'Slot is not available '})
  } else {
    slots_booked[slotDate].push(slotTime)
  }
} else {
  slots_booked[slotDate] = []
  slots_booked[slotDate].push(slotTime)
}

const userData = await userModel.findById(userId).select('-password')
delete docData.slots_booked

const appointmentData = {
  userId,
  docId,
  userData,
  docData,
  amount:docData.fees,
  slotTime,
  slotDate,
  date: Date.now()
}

const newAppointment = new appointmentModel(appointmentData)
await newAppointment.save()

//save new slots data in docData
await doctorModel.findByIdAndUpdate(docId,{slots_booked})

res.json({success:'true' , message: 'Appointment Booked'})
  
 } catch (error) {
  console.log(error)
  res.json({success: 'false', message: error.message})
 }
}



export {registerUser,loginUser,bookAppointment}