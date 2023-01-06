const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()


app.use(express.json())
app.use(cors())


// User schema defined, so that Database expect this type of details of user
const UserSchema= mongoose.Schema({
    id:Number,
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


// function to connect our backend with database
const connectToDataBase=async()=>{

    // this will create a new Database by name called UserInfo
   let connect= await mongoose.connect("mongodb://localhost:27017/UserInfo")
   console.log("connected to DataBase")

}

connectToDataBase()


// Creation of a Model in the Database called UserInfo
const Users= new mongoose.model("User",UserSchema)


// When user visit our site for first time then they will hit to this URL for first time
app.get("/",async(req,res)=>{
   let data=await Users.find()
   res.send(data)
})

// Taking User details through a form on frontend and sending it to database using this URL after they click on a submit button
app.post("/details",async (req,res)=>{

    // To provide a unique key
    let id
    let temp=await Users.find()
    if(temp.length===0){
         id=0
    }
    else{
         id=temp[temp.length-1].id+1
    }

    // Receiving the data from Frontend
    const {user,DOB,fullname,mother_name,Postal_code,products,state,city,hobbies}=req.body

    // Sending the data to database
    let data=await new Users({
        id,user,DOB,fullname,mother_name,products,hobbies,state,city,Postal_code
    })
    data.save()
     res.send("success")
})


// To find a particular User details using ID
app.get("/find/:id",async(req,res)=>{
    let {id}=req.params
    let one=await Users.findOne({id:id})
    res.send(one)
})

// Updating the data
app.patch("/update/:id",async(req,res)=>{

 
    let {id}=req.params    /*Receiving Data Id to get update */

    let {user,DOB,fullname,mother_name,Postal_code,products,state,city,hobbies}=req.body

    await Users.findOneAndDelete({id})

    let data=await new Users({
        id,user,DOB,fullname,mother_name,Postal_code,products,state,city,hobbies
    })
    data.save()
    res.send("updated")
})


// To delete a Data from database

app.delete("/delete/:id",async(req,res)=>{
    let {id}=req.params
    console.log(id)
   await Users.findOneAndDelete({id})

   res.send("todo deleted")
 
})


app.listen(4000,()=>{console.log("server running on port 4000")})