const userModel = require('../models/users')
const Bookings = require('../models/booking')
const DoctorAvailability = require('../models/doctorAvalability');

const mongoose = require('mongoose');


getApprovedDoctors = async(req,res)=>{
    try {
        const doctorData = await userModel.find({approval:2});
        res.status(200).json(doctorData);
    } catch (error) {
        res.status(500).json({status:500});
    }
}



getDoctorAvailablity = async(req,res)=>{
    const id = req.query.id
    try {
        const data = await DoctorAvailability.findOne({doctor_id:id});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({status:500});
    }
}




getAlreadyBookedslots = async (req,res) =>{
    const id= req.query.id;
    try {
        console.log(id)
        const now = new Date();
        now.setHours(0, 0, 0, 0)
        const next7Days = new Date();
        next7Days.setDate(now.getDate() + 7);
        console.log(next7Days)
        const data = await Bookings.find({doctor_id:id,bookingDate: {
            $gte: now,
            $lt: next7Days
          }});
        res.status(200).json({data:data});
    } catch (error) {
        res.status(500).json({status:500});
    }
}


submitBookings = async (req,res)=>{
    if(req.data.user.role == "patient"){
    const id = req.data.user.id
    req.body.patient_id = id
    const dateObject = new Date(req.body.bookingDate);
    req.body.bookingDate=dateObject
    try {
        const data = new Bookings(req.body);
        const savedData = await data.save();
        res.status(200).json(savedData);
    } catch (error) {
        res.status(500).json({status:500});
    }
}
else{
    res.status(400).json({status:401})
}
}

getAllBookings = async (req,res)=>{
    try{
    const id = req.data.user.id
    console.log(id)
    const details = await  Bookings.aggregate([
        {
          $match: {
            patient_id: new mongoose.Types.ObjectId(id)
          }
        },
        {
          $group: {
            _id: "$doctor_id",
            appointments: { $push: "$$ROOT" }
          }
        },
        {
            $lookup: {
              from: 'users', 
              localField: '_id',
              foreignField: '_id',
              as: 'doctorDetails'
            }
          },
          {
            $unwind: "$doctorDetails" 
          }
      ]);
    res.status(200).json(details)
    }
    catch(error){
        console.log(error)
        res.status(500).json({status:500});
    }

}




module.exports ={
    getApprovedDoctors,
    getDoctorAvailablity,
    getAlreadyBookedslots,
    submitBookings,
    getAllBookings

}