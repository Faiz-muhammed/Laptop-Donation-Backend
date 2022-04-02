const mongoClient =require("mongodb").MongoClient
require('dotenv').config()


const state = {
    db:null

}

module.exports.connect=function(done){
     const url =process.env.MONGODB_URI || 'mongodb+srv://brocamp:bogOR2RYbAMfkpNj@donationapp.fy60s.mongodb.net/DonationApp?retryWrites=true&w=majority'
     const dbName=process.env.MONGODB_NAME  || 'DonationApp'
     mongoClient.connect(url,(err,data)=>{
        if(err){
            console.log("err",err);
            return done(err);
        } 

        if(data){
        }
        state.db=data.db(dbName)
        done()
     })
}

module.exports.get= function(){
    return state.db
}