const collections= require('../config/collections')

module.exports ={
    Signup:async(req,res)=>{
     let signUpData=req.body
     if(!signUpData){
       return res.status(400).json({message:"No signup data found"})
     }
     if(signUpData.Password.length<5||!signUpData.Password){
         return res.status(400).json({message:"Password length less than expected"})
     }
     if(signUpData.phone.length<10||signUpData.phone.length>10||!signUpData.phone){
         return res.status(400).json({message:"Phone length is not as expected"})
     }
     let donorExist=db.get().collections(collections.DONOR_COLLECTION).findOne({username:signUpData.username})
     let phoneExist=db.get().collections(collections.DONOR_COLLECTION).findOne({phone:signUpData.phone})
     if(donorExist){
         return res.status(400).json({message:"username exist"})
     }
     if(phoneExist){
         return res.status(400).json({message:"phone number already registered"})
     }
     else{
        await db.get().collections(collections.DONOR_COLLECTION).insertOne(signUpData).then((res)=>{
             return res.status(200).json({message:"signup success"})
         }).catch((err)=>{
             console.error("Data insertion error")
             return res.status(400).json({message:"something went wrong"})
         })
        }
    },
    Login:async(req,res)=>{
      let loginData=req.body
      if(!loginData){
          return res.status(400).json({message:"No login data found"})
      }
      if(!loginData.username){
          return res.status(400).json({message:"No username in data"})
      }
      if(!loginData.password){
          return res.status(400).json({message:"No password in data"})
      }
      let user=await db.get().collections(collections.DONOR_COLLECTION).findOne({username:loginData.username,Password:loginData.password})
      if(user){
         return res.status(200).json({message:"Login success"})
      }
      else{
          return res.status(400).json({message:"Username or password incorrect"})
      }
    }
}