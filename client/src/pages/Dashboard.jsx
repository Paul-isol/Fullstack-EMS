import { useEffect, useState } from "react"
import Loading from "../components/Loading.jsx"
import EmployeeDashboard from "../components/EmployeeDashboard.jsx"
import AdminDashboard from "../components/AdminDashboard.jsx"
import api from "../api/axios"
import toast from "react-hot-toast"

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    api.get("/dashboard").then((res)=>setData(res.data)).catch((error)=>toast.error(
      error.response?.data?.message || error.message || "Something went wrong"
    )).finally(()=>setLoading(false))
    console.log(data)
  },[])
  if(loading){
    return <Loading />
  }
  if(!data){
    return <div>No Data</div>
  }
  if(data.role === "ADMIN"){
    return (
      <AdminDashboard data={data} />
    )
  }else{
    return (
      <EmployeeDashboard data={data} />
    )
  }
  
}

export default Dashboard