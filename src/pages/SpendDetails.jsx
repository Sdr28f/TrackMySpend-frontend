import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import SpendForm from "./SpendForm";

function SpendDetails(){
    const [spendD, setSpendD] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    async function getOneSpend() {
        try{
            const token = localStorage.getItem('token')
            const oneSpend = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/spends/${id}`,{headers: {Authorization: `Bearer ${token}`}});
            setSpendD(oneSpend.data)
        }
        catch(err){
            console.log(err)
        }
    }

    async function SpendDelete() {
        try{
            const token = localStorage.getItem('token')
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/spends/${id}`,{headers: {Authorization: `Bearer ${token}`}})
            navigate(`/spends`)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getOneSpend()
    },[])

    return(
        <div className="page-container">
        <div className="form-card">
        <h1 className="form-title">Spend Details</h1>
         {spendD ? (
            <div>
                <h2>description: {spendD.description}</h2>
                <h2>amount: {spendD.amount}</h2>
                <h2>date: {spendD.date ? spendD.date.split('T')[0]:'No Date'}</h2>
                <h2>category: {spendD.category.name}</h2>

                <button onClick={SpendDelete}>DeleteSpend</button>
                <Link className="btn-details" style={{ display: "inline-block", marginTop: "15px", textAlign: "center" }} to={`/spends/${id}/edit`}>Edit Spend</Link>
                </div>
         ) : <h2>Loading..</h2>}
        </div>
        </div>
    )
}

export default SpendDetails