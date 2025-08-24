import mongoose from "mongoose"

export const dbConnection =  () => {
    mongoose.connect(process.env.MongoDB_URL,{
        dbName: "Truth_OR_Dare"
    }).then(()=>{
        console.log("connected to database ✅");
    }).catch((error)=>{
        console.log("error in connecting to database ❌",error)
    })
}