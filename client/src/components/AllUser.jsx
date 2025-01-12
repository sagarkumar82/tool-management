import { useEffect, useState } from "react";
import { getMechanic } from "../api/api";
import Header from "./Header";

function AllUser() {
  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    const response = await getMechanic();
    setUsers(response); // Update state with the fetched data
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
    <Header/>
    <div className="container mt-5">
      <h2 className="mb-4">All Mechanics</h2>
      {users.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No records found</p>
      )}
    </div>
    </>
  );
}

export default AllUser;
