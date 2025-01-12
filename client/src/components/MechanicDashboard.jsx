import { useState, useEffect, useContext } from "react";
import { getTools, issueTool } from "../api/api";
import Header from "./Header";
import { AuthContext } from "../context/AuthContext";

const MechanicDashboard = () => {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [quantity, setQuantity] = useState('');
  const rec = useContext(AuthContext);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    const response = await getTools();
    setTools(response);
  };

  const handleIssue = async () => {
    if (selectedTool && quantity) {
      await issueTool({ toolId: selectedTool, mechanicId: rec.auth.user.id, quantity });
      fetchTools();
      alert("Tool issued!");
      setShowModal(false); // Close the modal after issuing the tool
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    } else {
      alert("Please provide a reason for issuing the tool.");
    }
  };

  

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h3>Available Tools</h3>
        <div className="row">
          {tools?.map((tool) => (
            <div className= {`${tool.quantity===0 ? 'd-none' : ''} col-md-4 mb-4`}  key={tool._id}>
              <div
                className=' card'
                onClick={() => setSelectedTool(tool._id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: tool._id === selectedTool ? "#f0f8ff" : "",
                }}
              >
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}/${tool?.image}`}
                  className="card-img-top"
                  alt={tool.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{tool.name}</h5>
                  <p className="card-text">
                    <strong>Category:</strong> {tool.category}
                  </p>
                  <p className="card-text">
                    <strong>Quantity:</strong> {tool.quantity} pcs
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary mt-3 me-3" onClick={() => setShowModal(true)}>
          Issue Tool
        </button>

        {/* Modal for inputting reason */}
        {showModal && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Issue Tool</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="reason" className="form-label">
                      Please enter quantity:
                    </label>
                    <input
                      id="reason"
                      className="form-control"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleIssue}
                  >
                    Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MechanicDashboard;
