import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function SpendForm({setSelectedMonth}){
    const [formData, setFormData] = useState({
        description:'',
        amount:'',
        date:'',    
        category:'',
        user:''
    })

    const navigate = useNavigate();

    function handleChange(event){
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try{
            const token = localStorage.getItem('token');
            const createdSpend = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/spends`, formData , {headers: {Authorization: `Bearer ${token}`}})
            if(formData.date){
                const formYearMonth = formData.date.slice(0,7);
                setSelectedMonth(formYearMonth);
            }
            navigate(`/spends`)
        }
        catch(err){
            console.log(err)
        }
        
    }

    const [categories, setCategories] = useState([]);

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
        <h1 className="form-title">Create New Spend</h1>

        <form onSubmit={handleSubmit}>
          
          <label htmlFor="description">Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange}  />

          <label htmlFor="amount">Amount:</label>
          <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} />

          <label htmlFor="date">Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} />

          <label htmlFor="category">Category:</label>
          <select name="category" id="category" value={formData.category} onChange={handleChange}>
            <option value="">-- Select Category --</option>
            {categories.map((oneCategory)=>{
                return(
                    <option key={oneCategory._id} value={oneCategory._id}>
                        {oneCategory.name}
                    </option>
                )
            })}
          </select>

          <button>Create Spend</button>

        </form>
        </div>
        </div>

    )
}

export default SpendForm