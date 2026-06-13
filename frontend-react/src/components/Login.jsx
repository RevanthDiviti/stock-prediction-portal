import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); //Used to navigate to some page.
  const [error, setError] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("username is", username);
    console.log("password is", password);

    const userData = {
      username,
      password,
    };

    try {
      const result = await axios.post(
        "http://127.0.0.1:8000/api/v1/token/",
        userData,
      );
      localStorage.setItem("accessToken", result.data.access);
      localStorage.setItem("refreshToken", result.data.refresh);
      // console.log(result.data.refresh);
      console.log("Login Succesful");
      setIsLoggedIn(true);
      navigate("/"); //Navigates to the page based on end-point
    } catch (error) {
      console.error("Invalid Credentials");
      setError("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center">Login to our Portal</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-danger">{error}</div>}
              {loading ? (
                <button
                  type="submit"
                  className="btn btn-info d-block mx-auto"
                  disabled
                >
                  Logging In...
                </button>
              ) : (
                <button type="submit" className="btn btn-info d-block mx-auto">
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
