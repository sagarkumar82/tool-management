import { useState, useEffect } from "react";
import { getTools, addTool, deleteTool, updateTool } from "../api/api"; // Assuming you have the necessary API functions
import Header from "./Header";
import axios from "axios";
import '../styles/tool.css';

const AdminDashboard = () => {
  const [tools, setTools] = useState([]);
  const [toolData, setToolData] = useState({
    name: "",
    category: "",
    quantity: 0,
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [editingTool, setEditingTool] = useState(null); 

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    const response = await getTools();
    setTools(response);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setToolData({ ...toolData, [name]: files[0] });
    } else {
      setToolData({ ...toolData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", toolData.name);
    formData.append("category", toolData.category);
    formData.append("quantity", toolData.quantity);
    formData.append("image", toolData.image);

    try {
      if (editingTool) {
        await updateTool(editingTool._id, formData);
        setEditingTool(null); 
        alert("Tool updated successfully!");
        setToolData({
          name: "",
          category: "",
          quantity: 0,
          image: null,
        })
      } else {
        await addTool(formData); 
        alert("Tool added successfully!");
        setToolData({
          name: "",
          category: "",
          quantity: 0,
          image: null,
        })
      }
      fetchTools();
    } catch (error) {
      console.error(error);
      alert("Failed to save tool.");
    }
  };

  const handleEdit = (tool) => {
    setEditingTool(tool);
    setToolData({
      name: tool.name,
      category: tool.category,
      quantity: tool.quantity,
      image: tool.image,
    });
  
    window.scrollTo(0, 0); 
  };
  

  const handleDelete = async (toolId) => {
    try {
      await deleteTool(toolId);
      fetchTools(); 
      alert("Tool deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete tool.");
    }
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + "/tool-categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="admin-dashboard-container container mt-5">
        <h2 className="admin-dashboard-title">{editingTool ? "Edit Tool" : "Add Tool"}</h2>
        <div>
          <form onSubmit={handleSubmit} className="admin-dashboard-form">
            <div className="form-group admin-dashboard-form-group">
              <label className="admin-dashboard-label">Tool Name</label>
              <input
                type="text"
                name="name"
                className="form-control admin-dashboard-input"
                onChange={handleChange}
                value={toolData.name}
                required
              />
            </div>
            <div className="form-group admin-dashboard-form-group">
              <label className="admin-dashboard-label">Category</label>
              <select
                name="category"
                onChange={handleChange}
                className="form-select admin-dashboard-select"
                value={toolData.category}
                required
              >
                <option>Select tool category</option>
                {categories?.map((rec) => (
                  <option key={rec.id} value={rec.id}>
                    {rec.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group admin-dashboard-form-group">
              <label className="admin-dashboard-label">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control admin-dashboard-input"
                onChange={handleChange}
                value={toolData.quantity}
              />
            </div>
            <div className="form-group admin-dashboard-form-group">
              <label className="admin-dashboard-label">Image</label>
              <input
                type="file"
                name="image"
                className="form-control admin-dashboard-input"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary admin-dashboard-submit-button mt-3"
            >
              {editingTool ? "Update Tool" : "Add Tool"}
            </button>
          </form>
        </div>

        <h3 className="admin-dashboard-tools-title mt-5">Available Tools</h3>
        <div className="row admin-dashboard-tools-list">
          {tools?.map((tool) => (
            <div className="col-md-4 mb-4 admin-dashboard-tool-card" key={tool._id}>
              <div className="card">
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}/${tool?.image}`}
                  className="card-img-top admin-dashboard-tool-image"
                  alt={tool.name}
                />
                <div className="card-body admin-dashboard-tool-body">
                  <h5 className="card-title admin-dashboard-tool-name">
                    {tool.name}
                  </h5>
                  <p className="card-text admin-dashboard-tool-category">
                    <strong>Category:</strong> {tool.category}
                  </p>
                  <p className="card-text admin-dashboard-tool-quantity">
                    <strong>Quantity:</strong> {tool.quantity} pcs
                  </p>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(tool)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(tool._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
