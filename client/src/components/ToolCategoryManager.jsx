import { useState, useEffect } from "react";
import axios from "axios";

const ToolCategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", id: null });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BASE_URL+"/tool-categories";

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setLoading(false);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update a category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update category
        await axios.put(`${API_URL}/${formData.id}`, { name: formData.name });
        alert("Category updated successfully!");
      } else {
        // Add new category
        await axios.post(API_URL, { name: formData.name });
        alert("Category added successfully!");
      }
      setFormData({ name: "", id: null });
      setIsEditing(false);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      alert(error.response?.data?.message || "An error occurred.");
    }
  };

  // Delete a category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert("Category deleted successfully!");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete the category.");
      }
    }
  };

  // Set category for editing
  const handleEdit = (category) => {
    setFormData({ name: category.name, id: category._id });
    setIsEditing(true);
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-5">Create category</h2>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter category name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? "Update Category" : "Add Category"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setFormData({ name: "", id: null });
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Loading Spinner */}
      {loading && <div className="text-center">Loading...</div>}

      {/* Categories List */}
      {!loading && categories.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      

      {/* No Categories Message */}
      {!loading && categories.length === 0 && (
        <div className="text-center">No categories found.</div>
      )}
    </div>
  );
};

export default ToolCategoryManager;
