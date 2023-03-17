import React,{useState, useEffect} from 'react'

export const StylistTable = () => {
    const [stylist, setStylist] = useState("")
    // const StylistData = async() =>{
    //     const data = await fetch("https://appointment-organizations-production.up.railway.app/v1/stylists", {
    //         method: "GET",
    //         mode: "no-cors",
    //     })
    //     const res = await data.json();
    //     console.log(res)
    //         setstylist(res)
       
    // } 

    useEffect(() => {

        async function StylistData(){
            try{
                let res = await fetch("https://appointment-organizations-production.up.railway.app/v1/stylists", {method: "GET",mode: "no-cors"});
                res= res.json();
                setStylist(res);
            }catch (err){
                console.log("ERROR: ", err);
            }
        }
      if(stylist === ""){
        StylistData()
      }
    
    }, [stylist])
    
    console.log(stylist);
  return (
    <div>StylistTable</div>
  )
}



