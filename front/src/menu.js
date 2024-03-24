import React, { useEffect, useState } from "react";
import Axios from "axios"
import { MdChair } from "react-icons/md";
function Menu(){
    const [selectedSeats, setSelectedSeats] = useState([])
    const [bookedSeats, setBookedSeats] = useState([])
    const [unBookedSeats, setUnBookedSeats] = useState([])
    const [owner, setOwner] = useState("")
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const result = await Axios.get("http://localhost:3001/")
                setBookedSeats(result.data)
            }
            catch(error){
                console.log("Error",error)
            }
        }
        fetchData()
    },[selectedSeats,unBookedSeats])
    const allSeats = Array.from({ length: 20 }, (_, index) => index + 1);
    

    const seat = allSeats.map(ele => {
        if(unBookedSeats.includes(ele)){
            return  <MdChair key={ele} style={{ color: 'orange' , fontSize: '30px'  }} onClick={()=>handleUnselect(ele)}/>
        }
        else if(bookedSeats.includes(ele)){
            return  <MdChair key={ele} style={{ color: 'red' , fontSize: '30px'  }} onClick={()=>handleUnselect(ele)}/>
        }
        else if(selectedSeats.includes(ele)){
            return  <MdChair key={ele} style={{ color: 'green' , fontSize: '30px' }} onClick={()=>handleSelect(ele)}/>
        }
        else{
            return  <MdChair key={ele} style={{ color: 'black' , fontSize: '30px' }} onClick={()=>handleSelect(ele)}/>
        }
    })
    function handleSelect(ele){
        if(selectedSeats.includes(ele)){
            const newSeats = selectedSeats.filter(item => item !== ele)
            setSelectedSeats(newSeats)
        }
        else{
            setSelectedSeats([...selectedSeats,ele])
        }
    }
    function handleUnselect(ele){
        if(unBookedSeats.includes(ele)){
            const newSeats = unBookedSeats.filter(item => item !== ele)
            setUnBookedSeats(newSeats)
        }else{
            setUnBookedSeats([...unBookedSeats,ele])
        }
    }
    function handleAdd(){
        if(selectedSeats.length>0){
            if(owner !== null){
                const InputData = async () => {
                    try{
                        const result = await Axios.post("http://localhost:3001/add",({seat:selectedSeats,owner:owner}))
                        setOwner('')
                        setSelectedSeats([])
                    }
                    catch(error){
                        console.log(selectedSeats)
                        console.log("Error",error)
                    }
                }
                InputData()
            }
        }
    }
    function handleDelete(){
        if(unBookedSeats.length>0){
                    const DeleteData = async () => {
                        try{
                            const result = await Axios.post("http://localhost:3001/delete",({seat:unBookedSeats}))
                            setUnBookedSeats([])
                        }
                        catch(error){
                            console.log("Error",error)
                        }
                }
                DeleteData()
        }
    }
    function handleReset(){
        const ResetData = async () => {
            try{
                const result = await Axios.get("http://localhost:3001/reset")
                setSelectedSeats([])
                setUnBookedSeats([])
            }
            catch(error){
                console.log("Error",error)
            }
    }
    ResetData()
}
    function handleOwner(e){
        setOwner(e.target.value)
    }
    return(
        <div>
            {seat}
            <div>
                <input type="text" name="owner" onChange={(e)=>handleOwner(e)} value={owner}/>
                <button onClick={()=>handleAdd()}>Book Seat</button>
                <button onClick={()=>handleDelete()}>Cancel Seat</button>
                <button onClick={()=>handleReset()}>Reset</button>
            </div>
        </div>
    )
}
export default Menu;