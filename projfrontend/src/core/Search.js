import React,{useState,useEffect} from 'react'
import { getAllCategories } from '../admin/helper/adminapicalls'
import { Link, useNavigate } from 'react-router-dom'
import img from "../magnifying-glass.png"
import "../styles/FindByCategory.css"
export default function Search() {
    const navigate = useNavigate();
    const [values, setValues] = useState([])

    const preload = () => {
        getAllCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setValues(data)
            }
        })
    }
 
    useEffect(()=>{
        preload()
    },[])

    const [name,setName]= useState("")
    
    const Search = (item) => {
        console.log(values)
        for(let i=0;i<values.length;i++){
            if(values[i].name==item){
                console.log("matched");
                console.log(values[i].name);
                console.log(item);
                console.log(values[i]._id);
                return (navigate(`/findByCategory/${values[i]._id}`))
               
            }
        }
    }

   
    const onSubmit = e =>{
        e.preventDefault();
       
            Search(name)
        
        
    }


    

  return (
    <div className='search-bar'>
        <input className='input-s' placeholder='Search by category' type="text" onChange={(e)=>{
            setName(e.target.value)
        }} value={name} />
    
        <button onClick={onSubmit} className="img-b"> <img src={img} alt="img" className='img-s' /> </button>
    </div>
  )
}
