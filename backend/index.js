const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")


const app=express()

app.use(express.json())
app.use(cors())


const UserSchema= mongoose.Schema({
    user:String,
    DOB:Date,
    fullname:String,
    mother_name:String,
    products:Array,
    hobbies:Array,
    state:String,
    city:String,
    Postal_code:Number
})

const connectToDataBase=async()=>{

   let connect= await mongoose.connect("mongodb://localhost:27017/UserInfo")
   console.log("connected to DataBase")

}

connectToDataBase()

const Users= new mongoose.model("User",UserSchema)

app.get("/",async(req,res)=>{
   let data=await Users.find()
   res.send(data)
})

app.post("/details",async (req,res)=>{

    const {user,DOB,fullname,mother_name,Postal_code,products,state,city,hobbies}=req.body
    //  console.log(user,DOB,fullname,mother_name,Postal_code)
    let data=await new Users({
        user,DOB,fullname,mother_name,products,hobbies,state,city,Postal_code
    })
    data.save()
     res.send("success")
})

app.get("/find/:id",async(req,res)=>{
    let {id}=req.params
    let one=await Users.findOne({_id:id})
    // console.log(one)

    res.send(one)
})


app.patch("/update/:id",async(req,res)=>{
    let {id}=req.params
    let {user,DOB,fullname,mother_name,Postal_code,products,state,city,hobbies}=req.body
    await Users.findOneAndDelete({id})
    let data=await new Users({
        user,DOB,fullname,mother_name,Postal_code,products,state,city,hobbies
    })
    data.save()
    res.send("updated")
})

app.delete("/delete/:id",async(req,res)=>{
    let {id}=req.params
   await Users.findOneAndDelete({id})

   res.send("todo deleted")
 
})






app.listen(4000,()=>{console.log("server running on port 4000")})