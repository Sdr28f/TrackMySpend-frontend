import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

function SpendList({selectedMonth, setSelectedMonth, income, setIncome}){
    const [spends, setSpend] = useState([]);
    
 async function getAllSpends(){
    try{
        const token = localStorage.getItem('token');
        const fetchSpends = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/spends`,{headers: { Authorization: `Bearer ${token}`}})
        setSpend(fetchSpends.data)
    }
    catch(err){
        console.log(err)
    }
 }

 useEffect(()=>{
    getAllSpends()
 },[])

 const filteredSpends = spends.filter((oneSpend)=>{
    if(!oneSpend.date) return false;
    const spendYearMonth = oneSpend.date.slice(0,7);
    return spendYearMonth === selectedMonth;
 });

 let totalSpend = 0;
 filteredSpends.forEach((oneSpend)=>{
    totalSpend += Number(oneSpend.amount || 0);
 });

 const remainingBalance = income - totalSpend;
return (
    <div className="spend-container">
        <h1 className="spend-title">All Spends</h1>
        <div className="controls-dashboard-row">
            <div className="calendar-box">
                <label htmlFor="monthFilter">Filter By Month</label>
                <input type="month" id="monthFilter" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)} />
            </div>
            <div className="summary-box">
                <div style={{display: "flex", alignItems: "center", margin: "4px 0"}}>
                    <span style={{fontSize: "16px", color: "#ffffff"}}>Monthly Income (BHD):</span>
                    <input type="number" value={income || ''} onChange={(event) => setIncome(Number(event.target.value))} style={{background: "#0d0f12", border: "1px solid #30363d", borderRadius: "4px", color: "#ffffff", fontSize: "16px", fontWeight: "bold", width: "100px", outline: "none", marginLeft: "10px", padding: "4px 8px"}} />
                </div>
                <p>Total Spend This Month: <strong>{totalSpend}</strong></p>
                <p>Remaining Balance: <strong>{remainingBalance}</strong></p>
            </div>
        </div>
        <div className="spends-list-wrapper">
            {filteredSpends.map((oneSpend) => {
                return (
                    <div className="spend-card" key={oneSpend._id}>
                        <div className="card-top-row">
                            <span className="card-meta-item"><strong>Category:</strong> {oneSpend.category?.name || 'perfume'}</span>
                            <span className="card-meta-item"><strong>Amount:</strong> {oneSpend.amount}</span>
                            <span className="card-meta-item"><strong>Date:</strong> {oneSpend.date ? oneSpend.date.split('T')[0] : 'No Date'}</span>
                        </div>
                        <div className="card-description-block">
                            <p><strong>Description:</strong> {oneSpend.description}</p>
                        </div>
                        <div className="details-btn-container">
                            <Link className="see-details-btn" to={`/spends/${oneSpend._id}`}>see details</Link>
                        </div>
                    </div>
                )
            })}
            {filteredSpends.length === 0 && <h2 style={{color: '#9ca3af', textAlign: 'center'}}>No Spend Created Yet</h2>}
        </div>
    </div>
);
}
export default SpendList;