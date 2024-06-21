const userModel = require('../models/users')
const inventoryModel = require('../models/inventory');
const { get } = require('mongoose');
const Bookings = require('../models/booking')


// get all doctors whose profiles are not approved
getApprovalRequestList = async(req,res)=>{
    if(req.data.user.role === "admin"){
    try {
        const doctorsList = await userModel.find({ role: 'doctor', approval: 1 });
        res.status(200).json({ status : 200,doctorsList: doctorsList });
    } catch (error) {
        //got error while doing server thing if you want to check either use some debug tool or console.log(error) here
        res.status(404).json({status:500});
    }
     }
    else{
    //send this code when the access user is not admin
    res.status(400).json({ status: 401 });
   }
}


//aprove the particular doctor profile.
approveDoctor = async(req,res)=>{
    if(req.data.user.role == "admin"){
    try{
        const {_id} = req.body
        const updateData ={
            approval:req.body.approval
        }
          await  userModel.findByIdAndUpdate(_id,updateData,{ new: true })
        res.status(200).json({status:200})
    
    }catch(error){
        //got error while doing server thing if you want to check either use some debug tool or console.log(error) here
        res.status(500).json({status:500})
    
    }
    }
    else{
        //send this code when the access user is not admin
        res.status(400).json({status:401})
    }
}


//get particular doctors details from the admin side
getDoctorDetails=async(req,res)=>{
    if(req.data.user.role == "admin"){
        try{
            const id = req.query.id
            const userDetails =await userModel.findById({_id:id})
            res.status(200).json(userDetails)
        }catch(error){
            //got error while doing server thing if you want to check either use some debug tool or console.log(error) here
            res.status(500).json({status:500}) 
        }
        }
        else{
            //send this code when the access user is not admin
            res.status(400).json({status:401})
        }
}


getAllInventory = async (req,res)=>{
    if(req.data.user.role == "admin"){
        try{
            const inventoryDetails =await inventoryModel.find()
            res.status(200).json(inventoryDetails)
        }catch(error){
            //got error while doing server thing if you want to check either use some debug tool or console.log(error) here
            res.status(500).json({status:500}) 
        }
        }
        else{
            //send this code when the access user is not admin
            res.status(400).json({status:401})
        }
}

updateInventory = async(req,res)=>{
    if(req.data.user.role == "admin"){
        try{
            console.log(req.body.medicine_name)
             req.body.medicine_name = req.body.medicine_name.toLowerCase()
            const inventoryDetails =await inventoryModel.findOneAndUpdate({medicine_name:req.body.medicine_name},req.body,{ new: true })
            res.status(200).json(inventoryDetails)
        }catch(error){
            //got error while doing server thing if you want to check either use some debug tool or console.log(error) here
            res.status(500).json({status:500}) 
        }
        }
        else{
            //send this code when the access user is not admin
            res.status(400).json({status:401})
        }
}

bulkInsertInventory = async(req,res)=>{
    if(req.data.user.role == "admin"){
    try{
    const doc = req.body.data
    doc.forEach(obj => {
        obj.medicine_name=obj.medicine_name.toLowerCase()
      });
    const result = await inventoryModel.bulkWrite(
        doc.map(obj => ({
            updateOne: {
                filter: { medicine_name: obj.medicine_name },
                update: { $set: obj },
                upsert: true 
            }
        }))
    );
    console.log(result)
    res.status(200).json({status:200})
    }catch(error){
        console.log(error)
        res.status(500).json({status:500}) 
    }
    }
    else{
        res.status(400).json({status:401})
    }
}



getTotalPatientByDoctor = async (req,res) =>{
        try{
  

 const details=  await Bookings.aggregate([
  {
    $group: {
      _id: '$doctor_id', 
      uniquePatients: { $addToSet: '$patient_id' },
      count: { $sum: 1 } 
    }
  },
  {
    $project: {
      _id: 1, 
      uniquePatientCount: { $size: '$uniquePatients' }, 
      count: 1
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
    $unwind: "$doctorDetails" // To deconstruct the array from the lookup
  }
])


        res.status(200).json(details)
        }catch(error){
            console.log(error)
            res.status(500).json({status:500}) 
        }
   
}


getTotalPAtientByDate = async (req,res)=>{
    try{
        const date = await Bookings.aggregate([{ $group: { _id: null, maxDate: { $max: "$bookingDate" } } }])
        console.log(date)
        const maxDate = date[0].maxDate
        maxDate.setHours(0, 0, 0, 0)
        console.log(maxDate)
        maxDate.setDate(maxDate.getDate() -9);
        console.log(maxDate)

        const details=  await Bookings.aggregate([
            {
              $match: {
                bookingDate: {
                  $gte: new Date(maxDate)
                }
              }
            },
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$bookingDate" }
                },
                totalPatients: { $sum: 1 }
              }
            },
            {
              $sort: { _id: 1 }
            }
          ]);
          console.log(details.length)
          const transformedResult = details.reduce((acc, current) => {
            acc[current._id] = { totalPatients: current.totalPatients };
            return acc;
          }, {});

          res.status(200).json(transformedResult)
        }catch(error){
            console.log(error)
            res.status(500).json({status:500}) 
        }
}

module.exports = {
    getApprovalRequestList,
    approveDoctor,
    getDoctorDetails,
    getAllInventory,
    updateInventory,
    bulkInsertInventory,
    getTotalPatientByDoctor,
    getTotalPAtientByDate
}