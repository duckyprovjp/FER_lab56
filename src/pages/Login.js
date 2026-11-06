import React, { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:9000/accounts", {
        params: {
          email: email.trim(),
          password: password.trim(),
        },
      });

      const matchedAccounts = response.data;

      if (!matchedAccounts || matchedAccounts.length === 0) {
        setError("Invalid email or password.");
        return;
      }

      const user = matchedAccounts[0];

      if (user.status === "Inactive") {
        setError("Tai khoan da bi khoa");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/subjects");
    } catch (err) {
      setError("Cannot connect to server or unexpected error.");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "450px" }} className="p-4 shadow-sm">
        <Card.Title className="text-center fw-bold fs-4 mb-3">
          Sign In
        </Card.Title>

        {error && (
          <p className="text-danger text-center fw-medium mb-3">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email of student or lecturer"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button className="w-100 mt-2" type="submit">
            Login
          </Button>
        </form>
      </Card>
    </Container>
  );
}

export default Login;
