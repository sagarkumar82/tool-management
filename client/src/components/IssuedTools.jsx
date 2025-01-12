import { useEffect, useState } from "react"
import { issueToolByAdmin } from "../api/api"
import Header from "./Header"

function IssuedTools() {
const [tool , setTool] = useState([])

    const fetchIssue = async() => {
     const response = await issueToolByAdmin()
     setTool(response)
    }
    useEffect(()=>{fetchIssue()},[])
  
    return (
       <>
       <Header/>
       <div className="container">
       <h2 className="mt-5 ">Issued Tool</h2>
       <div className="row mt-5">
       {tool?.map((tool) => (
         <div className="col-md-4 mb-4" key={tool._id}>
           <div
             className="card"
             style={{
               cursor: "pointer",
             }}
           >
             <img
               src={`${import.meta.env.VITE_IMAGE_URL}/${tool?.tool.image}`}
               className="card-img-top"
               alt={tool.name}
             />
             <div className="card-body">
               <h5 className="card-title">{tool.name}</h5>
               <p className="card-text">
                 <strong>Mechanic Name:</strong> {tool.mechanic.name}
               </p>
               <p className="card-text">
                 <strong>Category:</strong> {tool.tool.category}
               </p>
               <p className="card-text">
                 <strong>Quantity:</strong> {tool.quantity} pcs
               </p>
               <p className="card-text">
                 <strong>Status:</strong> <strong className="text-danger">{tool.status} </strong>
               </p>
             </div>
           </div>
         </div>
       ))}
     </div>
       </div>
       </>
  )
}

export default IssuedTools
