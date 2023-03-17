import React,{useState, useEffect} from 'react'
import {stylists} from "./data.json"



export const StylistTable = () => {
    const [stylist, setStylist] = useState("")
    console.log(stylists);
    // const StylistData = async() =>{
    //     const data = await fetch("https://appointment-organizations-production.up.railway.app/v1/stylists", {
    //         method: "GET",
    //         mode: "no-cors",
    //     })
    //     const res = await data.json();
    //     console.log(res)
    //         setstylist(res)
       
    // } 
    // async function StylistData(){
    //     try{
    //         let res = await fetch("https://appointment-organizations-production.up.railway.app/v1/stylists", {method: "GET",mode: "no-cors"});
    //         res= res.json();
    // //         setStylist(res);
    // //     }catch (err){
    // //         console.log("ERROR: ", err);
    // //     }
    // // }

    // useEffect(() => {

    //   if(stylist === ""){
    //     StylistData()
    //   }
    
    // }, [stylist])
    
    console.log(stylists);
  return (
    <div>StylistTable
        <table>
            
            <thead>
                <tr>
                    <td>sti.address</td>
                    <td>sti.city</td>
                    <td>sti.country</td>
                    <td>sti.gender</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {stylists.map((sti) => {
                    console.log(sti)
                    return(

                        <tr>
                        <td>{sti.stylist_firstname} </td>
                        
                        <td>{sti.address} </td>
                        <td>{sti.city} </td>
                        <td>{sti.country} </td>
                        <td>{sti.gender} </td>
                        {/* <td>{sti} </td>
                        <td>{sti} </td>
                        <td>{sti} </td>
                        <td>{sti} </td>  */}
                    </tr>
                    )       
                })}
            </tbody>
                
                
            
        </table>
    </div>
  )
}



