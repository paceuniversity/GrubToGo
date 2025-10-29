import React, { useState } from "react";

export default function LoginPage() {
  // simple variables for inputs
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  // when user clicks Sign In button
  const handleLogin = (e) => {
    e.preventDefault(); // stop page reload

    // check if fields are empty
    if (!email || !pass) {
      alert("Please enter both email and password");
      return;
    }

    // show login message
    alert("Logged in as " + email);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      {/* white card box */}
      <div className="card shadow p-4" style={{ width: "23rem" }}>
        {/* app title */}
        <div className="text-center mb-3">
          <div className="d-inline-flex align-items-center justify-content-center mb-2">
            <div
              className="rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center me-2"
              style={{ width: "38px", height: "38px" }}
            >
              G
            </div>
            <h3 className="fw-semibold m-0 text-dark">GrubToGo</h3>
          </div>
          <p className="text-muted small">Login to your account</p>
        </div>

        {/* login form */}
        <form onSubmit={handleLogin}>
          {/* email input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* password input with show button */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <div className="input-group">
              <input
                type={show ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="********"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

         c
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                id="remember"
                className="form-check-input"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember" className="form-check-label small">
                Remember me
              </label>
            </div>
            <a href="#" className="small text-decoration-none text-primary">
              Forgot?
            </a>
          </div>

          {/* login button */}
          <button type="submit" className="btn btn-success w-100 fw-semibold">
            Sign In
          </button>

          {/* signup link */}
          <p className="text-center mt-3 small">
            New to GrubToGo?{" "}
            <a href="#" className="text-decoration-none text-primary fw-semibold">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
