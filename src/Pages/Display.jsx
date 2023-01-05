import React from 'react'
import axios from "axios"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../Styles/Display.css"
import { Home } from './Home';
// import "../Styles/Home.css"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:"flex",
    // flexDirection:"column"
  };

export const Display = () => {

  // State to store user data which we get from database
    const [data,setData]=React.useState([])

  //To toggle the modals 
    const [open, setOpen] = React.useState(false);

  // State maintainance for updating the data
    const [form,setForm]=React.useState({})
    

    // Get request to fetch the DATABASE Data
    const getData=()=>{
       
        axios.get("http://localhost:4000/")
        .then((res)=>{setData(res.data)})
        .catch((err)=>{alert(err)})
    }

    // To handle Mounting, updating and Unmounting phases
    React.useEffect(()=>{
       getData()
    },[data])


    //To delete a particular data from table    
    const Delete=(id)=>{
        axios.delete(`http://localhost:4000/delete/${id}`)
        .then((res)=>{alert("Deleted Successfully")})
        .catch((err)=>{alert(err)})

        getData()

    }

    
    // To Edit a particular data from table
    const updateData=(id)=>{
       axios({
        method:"patch",
        url:`http://localhost:4000/update/${id}`,
        data:{_id,user,DOB,fullname,mother_name,Postal_code,products,state,city,hobbies}
      })
       .then((res)=>{
        alert("Data Updated Successfully")
        handleClose()
       })
       .catch((err)=>{console.log(err)})
    }


    // Function to open a Modal
     const handleOpen = (id) =>{
            setOpen(true)
            axios.get(`http://localhost:4000/find/${id}`)
            .then((res)=>{
                    setForm(res.data)
            })
            .catch((err)=>{console.log(err)})
        } 

    //Function to close a Modal 
     const handleClose = () => setOpen(false);


    //To handle a input data 
    const onInputchange=(e)=>{
         let {name,value}=e.target

         setForm({...form,[name]:value})
        }

    let {_id,user,DOB,fullname,mother_name,Postal_code,products,state,city,hobbies}=form

      
        
        
  return (

    <div id='display'>

        {/* Displaying the data received data form MongoDB Data base */}
        <table class="border" style={{border:"1px solid black"}}>
            <thead style={{border:"1px solid black"}}>
                <tr>
                    <th>Full Name</th>
                    <th>Mother Name</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Products</th>
                    <th>Hobbies</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody style={{border:"1px solid black"}}>
                {
                    data.map((ele)=>{return <tr >
                        <td>{ele.fullname}</td>
                        <td>{ele.mother_name}</td>
                        <td>{ele.state}</td>
                        <td>{ele.city}</td>
                        <td>{ele.products.map((e)=>{return <p>{e},</p>})}</td>
                        <td>{ele.hobbies.map((e)=>{return <p>{e},</p>})}</td>
                        <td><button onClick={()=>{handleOpen(ele._id)}}>Update</button></td>
                        <td><button onClick={()=>{Delete(ele._id)}}>Delete</button></td>

                    </tr>})
                }
            </tbody>
        </table>

        {/* Model to update the data */}
       <Modal
open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
 
    <div>
    <lable>fullname</lable><span>:</span>
    <input value={fullname} type="text" name="fullname" onChange={onInputchange}></input> 
    </div>
    <div>
    <lable>Mother Name</lable><span>:</span>
    <input value={mother_name} type="text" name="mother_name" onChange={onInputchange}></input> 
    </div>
    <div>
    <lable>State</lable><span>:</span>
    <input value={state} type="text" name="state" onChange={onInputchange}></input> 
    </div>
    <div>
    <lable>City</lable><span>:</span>
    <input value={city} type="text" name="city"  onChange={onInputchange}></input> 
    </div>
    <div>
    <lable>Postal Code</lable><span>:</span>
    <input value={Postal_code} type="number" name="Postal_code" onChange={onInputchange}></input> 
    </div><br/>
    <button onClick={updateData}>Update</button>
    <div></div>
  </Box>
       </Modal>
        
    </div>
  )
}
