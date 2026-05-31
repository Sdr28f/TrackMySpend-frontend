import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

function UpdateSpend(){
    const [formData, setFormData]= useState({
        description:'',
        amount:'',
        date:'',
        category:''
    })
    
    const [categories, setCategories] = useState([]);
    const {id} = useParams()
    const navigate = useNavigate();

    async function getSpend() {
        try{
            const token = localStorage.getItem('token');
            const fetchSpend = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/spends/${id}`,{headers:{Authorization: `Bearer ${token}`}});
        setFormData(fetchSpend.data)
        }
        catch(err){
            console.log(err)
        }
        
    }

    useEffect(()=>{
        getSpend()
    },[])

    function handleChange(event){
        setFormData({...formData,[event.target.name]:event.target.value})
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try{
            const token = localStorage.getItem('token')
            const newSpend = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/spends/${id}`,formData, {headers:{Authorization: `Bearer ${token}`}});
            navigate(`/spends/${newSpend.data._id}`)
        }
        catch(err){
            console.log(err)
        }
    }

  async  function getAllCategories(){
        const token = localStorage.getItem('token');
        const fetchCategories = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/category`, {headers: {Authorization : `Bearer ${token}`}})
        setCategories(fetchCategories.data)
    }
    useEffect(()=>{
        getAllCategories()
    },[])

    return(
        <div className="page-container">
        <div className="form-card">
        <h1 className="form-title">Update Spend</h1>

        <form onSubmit={handleSubmit}>

             <label htmlFor="description">Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange}  />

          <label htmlFor="amount">Amount:</label>
          <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} />

          <label htmlFor="date">Date:</label>
          <input type="date" name="date" value={formData.date ? formData.date.split('T')[0] : ''} onChange={handleChange} />

          <label htmlFor="category">Category:</label>
          <select name="category" id="category" value={typeof formData.category === 'object' ? formData.category?._id : formData.category} onChange={handleChange}>
            <option value="">-- Select Category --</option>
            {categories.map((oneCategory)=>{
                return(
                    <option key={oneCategory._id} value={oneCategory._id}>
                        {oneCategory.name}
                    </option>
                )
            })}
          </select>

          <button>Update Spend</button>

        </form>
        </div>
        </div>
    )
}

export default UpdateSpend;