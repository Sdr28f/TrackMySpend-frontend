import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function CreateCategory(){
    const [newCategory, setNewCategory]= useState({
        name:''
    })

    const navigate = useNavigate();
    
    function handleChange(event){
        setNewCategory({...newCategory,[event.target.name]:event.target.value})
    }

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const token = localStorage.getItem('token');
        const createdCategory = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/category`, newCategory, {headers: {Authorization: `Bearer ${token}`}});
        navigate(`/spends/form`);
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className="page-container">
        <div className="form-card">
        <h1 className="form-title">Create a Category</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">New Category Name:</label>
            <input type="text" name="name" value={newCategory.name} onChange={handleChange} />
            <button>Create Category</button>
        </form>
        </div>
        </div>
    )
}
export default CreateCategory