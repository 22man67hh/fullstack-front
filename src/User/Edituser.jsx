import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Edituser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [showAlert, setAlert] = useState(false);

  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loaduser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/users/${id}`);
      setUser(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading user:", error.message);
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/user/${id}`, user);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  useEffect(() => {
    loaduser();
  }, [loaduser]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>
          {showAlert && (
            <div className="alert alert-success text-center" role="alert">
              User updated successfully!
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setAlert(false)}
              ></button>
            </div>
          )}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name || ""}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username || ""}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={email || ""}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link to="/" className="btn btn-outline-danger mx-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
