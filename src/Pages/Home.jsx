import React from 'react'
import axios from 'axios'
import "../Styles/Home.css"

export const Home = () => {

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

    // const [pinData,setPinData]=React.useState([])


    const setInput=(e)=>{
       let {name,value}=e.target
       
        if(name==="products" || name==="hobbies"){
          setFormData({...formData,[name]:[...formData[name],value]})
      
         }
        // else if(name==="Postal_code" && value.length>=6){

        
        //         setFormData({...formData,[name]:value})
                
        //          axios.get(`https://app.zipcodebase.com/api/v1/search?apikey=af9809c0-8cc6-11ed-9ebd-019d4cf2b4a6&codes=${value}`)
        //         .then((res)=>{ setFormData({...formData,state:res.data.results[value][0].state})})
        //         .catch((err)=>{alert(err)})
        

        //     // setFormData({...formData,state:pinData[0].state})
        //     // setFormData({...formData,city:pinData[0].province})

        // } 
        else{
          setFormData({...formData,[name]:value}) 
        }
    }

    const sendData=(event)=>{
        event.preventDefault()
        console.log(user,DOB,fullname,mother_name,products)
    }

    // const postalCode=(e)=>{
    //       setFormData({...formData,[name]:})

    //       if(Pos)
    // }

 let {user,DOB,fullname,mother_name,products,hobbies,state,city,Postal_code}=formData

  return (
    <div>
        <h2>Fill The Below Form</h2>
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
                            <td>
                                Select Products
                            </td>
                            <td>:</td>
                            <td>
                               <select name="products" onChange={setInput}>
                                <option>
                                <input type="checkbox"></input>Car

                                </option>
                                {/* <option value="bike"><input type="checkbox" /><lable>Bike</lable></option> */}
                                {/* <option value="bike">b</option>
                                <option value="c">c</option> */}
                               </select>
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

                        {/* <tr>
                            <td>
                                <label htmlFor="state">Select State</label>
                            </td>
                            <td>:</td>
                            <td>
                                <select id="state">
                                    <option value="Andhra Pradesh">Andhra Pradesh	</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh	</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal	</option>
                            
                                </select>
                            </td>
                        </tr> */}
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
