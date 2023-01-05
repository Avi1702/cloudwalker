import React from 'react'
import axios from 'axios'
import "../Styles/Home.css"
import { valueToPercent } from '@mui/base'

export const Home = () => {

    // mantaining a Object state to handle input datas
    const [formData,setFormData]=React.useState({

        user:"",
        DOB:"",
        fullname:"",
        mother_name:"",
        products:[],
        hobbies:[],
        state:"",
        city:"",
        Postal_code:""
        
    })

    // Saving data using Zip code API
    const [pinData,setPinData]=React.useState([])


    // To handle input values on type
    const setInput=(e)=>{
       let {name,value,checked}=e.target
       
        if(name==="products" || name==="hobbies"){

           if(checked){ 
            setFormData({...formData,[name]:[...formData[name],value]}) 
           }
           else{
            let indx=formData.products.indexOf(value)
              formData.products.splice(indx,1)
           }
      
         }
        else if(name==="Postal_code" && value.length>=6){
   
                 axios.get(`https://app.zipcodebase.com/api/v1/search?apikey=af9809c0-8cc6-11ed-9ebd-019d4cf2b4a6&codes=${value}`)
                .then((res)=>{ setPinData(res.data.results[value])})
                .catch((err)=>{alert(err)})
        
                 
                setFormData({...formData,[name]:value,state:pinData[0].state,city:pinData[0].province})
            
        } 
        else{
          setFormData({...formData,[name]:value}) 
        }
    }

    // sending the form data to DATABASE
    const sendData=(event)=>{
        event.preventDefault()
        // console.log(user,DOB,fullname,mother_name,products)
        axios({
            method:"post",
            url:"http://localhost:4000/details",
            data:{
                user,
                DOB,
                fullname,
                mother_name,
                Postal_code,
                products,
                hobbies,
                state,
                city
            }
        })
        .then((res)=>{ alert("Details added Succesfully")})
        .catch(err=>{console.log(err)})

       
    }


 let {user,DOB,fullname,mother_name,products,hobbies,state,city,Postal_code}=formData

  return (
    <div id='Home'>

        {/* form to take input of user details */}
        <div id="form">
            <form>
                <table>

                    <tbody>
                         <tr>
                            <td>  
                                <label htmlFor="user" >User Name</label>
                            </td>
                             <td>:</td>
                            <td>
                                <input type={"text"} value={user} id="user" name='user' onChange={setInput}></input>
                            </td>
                          
                        
                         </tr>

                         <tr>
                            <td>
                                <label htmlFor="date">DOB</label>
                            </td>
                            <td>:</td>
                            <td>
                                <input type={"date"} value={DOB} id="date" name="DOB" onChange={setInput}></input><br/>
                            </td>
                         </tr>

                         <tr>
                            <td>
                               <label htmlFor="full_name">Full Name</label>
                            </td>
                            <td>:</td>
                            <td>
                                <input type={"text"} value={fullname} id="full_name" name="fullname" onChange={setInput}></input>
                           </td>

                            
                         </tr>

                         <tr>
                            <td>
                               <label htmlFor="mother_name">Mother Name</label>
                           </td>
                           <td>:</td>
                            <td>
                              <input type={"text"} value={mother_name} id="mother_name" name="mother_name" onChange={setInput}></input>
                            </td>
                         </tr>

                        <tr>
                            <td for="postal_code">Pin Code</td>
                            <td>:</td>
                            <td><input type={"number"} id="postal_code" onChange={setInput} value={Postal_code} name="Postal_code"></input></td>
                        </tr>

                        <tr>
                            <td for="state">State</td>
                            <td>:</td>
                            <td><input type={"text"} id="state" value={state}/></td>
                        </tr>

                        <tr>
                            <td for="city">City</td>
                            <td>:</td>
                            <td><input type={"text"} id="city" value={city}/></td>
                        </tr>

                         <tr>
                            <td>
                                Select Products
                            </td>
                            <td>:</td>
                            <td style={{color:"red"}}>
                                <pre><input type="checkbox" value="Car" name="products" onChange={setInput}></input>  <lable>Car</lable><br/></pre>
                                <pre><input type="checkbox" value="Watch" name="products" onChange={setInput}></input>  <lable>Watch</lable><br/></pre>
                                <pre><input type="checkbox" value="Laptop" name="products" onChange={setInput}></input>  <lable>Laptop</lable><br/></pre>
                                <pre><input type="checkbox" value="Phone" name="products" onChange={setInput}></input>  <lable>Phone</lable></pre>

                            </td>
                         </tr>

                         
                         <tr>
                            <td>
                                Hobbies
                            </td>
                            <td>:</td>
                            <td style={{color:"purple"}}>
                                <pre><input type="checkbox" value="Dancing" name="hobbies" onChange={setInput}></input>  <lable>Dancing</lable><br/></pre>
                                <pre><input type="checkbox" value="Singing" name="hobbies" onChange={setInput}></input>  <lable>Singing</lable><br/></pre>
                                <pre><input type="checkbox" value="Reading" name="hobbies" onChange={setInput}></input>  <lable>Reading</lable><br/></pre>
                                <pre><input type="checkbox" value="Cooking" name="hobbies" onChange={setInput}></input>  <lable>Cooking</lable></pre>
                              
                            </td>
                         </tr>

                    </tbody>

                </table>
              
               
               <br/>
                 <label htmlFor=""></label>
                 <input type={"submit"} value="Submit" onClick={sendData} ></input>

            </form>
        </div>
    </div>
  )
}
