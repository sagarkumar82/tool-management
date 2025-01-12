import axios from "axios"
import {  useEffect, useState } from "react"
import { getTools, issueTool, returnTool } from "../api/api";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function GetIssuedTool() {


    const rec = JSON.parse(localStorage.getItem('auth'))
    const[tools , setTools] = useState([])
    const [selectedTool, setSelectedTool] = useState(null);
    const[toolId , setToolId] = useState("")
    const[quantity , setQuantity] =  useState("")
    const nav = useNavigate()

    const fetchTool = () => {
        axios.post( 'https://tool-management.onrender.com/api/get-issued-tools' , {userId:rec.user.id} )
        .then(res=>{setTools(res.data.data)}).catch(err=>{console.log(err)})
    }
    useEffect(()=>{
        fetchTool()
    },[])

   
    
      const handleReturn = async () => {
        if (selectedTool) {
          await returnTool({ issueId: toolId ,  mechanicId : rec.user.id , quantity:quantity});
          fetchTool();
          alert("Tool returned!");
          nav('/mechanic')
        }
      };
  return (
    <>
    <Header/>
    <div className="container my-5">
    <div className="row">
    <h2 className="mb-4">Issued Tools</h2>
    {tools?.map((tool) => (
      <div className="col-md-4 mb-4" key={tool._id}>
        <div
          className="card"
          onClick={() => {
            setSelectedTool(tool._id ),
            setToolId(tool._id),
            setQuantity(tool.quantity)
          } }
          style={{
            cursor: "pointer",
            backgroundColor: tool._id === selectedTool ? "#f0f8ff" : "",
          }}
        >
          <img
            src={`https://tool-management.onrender.com/${tool?.tool.image}`}
            className="card-img-top"
            alt={tool.name}
          />
          <div className="card-body">
            <h5 className="card-title">{tool.tool.name}</h5>
            <p className="card-text">
              <strong>Category:</strong> {tool.tool.category}
            </p>
            <p className="card-text">
              <strong>Quantity:</strong> {tool.quantity} pcs
            </p>
          </div>
        </div>
      </div>
    ))}
     <div> <button className="btn btn-secondary mt-3 ml-2" onClick={handleReturn}>
        Return Tool
    </button></div>
  </div>
    </div>
    </>
  )
}

export default GetIssuedTool
