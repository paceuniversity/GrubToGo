import React, { useState } from "react";

// This is our Login Page component
export default function LoginPage() {
  // These are variables that store what the user types
  const [email, setEmail] = useState("");       // for email input
  const [password, setPassword] = useState(""); // for password input
  const [showPassword, setShowPassword] = useState(false); // to show/hide password
  const [remember, setRemember] = useState(true); // checkbox for remember me

  // This function runs when the "Sign In" button is clicked
  const handleSubmit = (e) => {
    e.preventDefault(); // stops page from refreshing
    if (!email || !password) {
      alert("Please fill in all fields."); // warning if empty
      return;
    }
    // Show simple login message
    alert(`Logged in as ${email}${remember ? " (remembered)" : ""}`);
  };

  // What we want to show on the screen
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      {/* Card box */}
      <div className="card shadow p-4" style={{ width: "24rem" }}>
        
        {/* App name and logo */}
        <div className="text-center mb-3">
          <div className="d-inline-flex align-items-center justify-content-center mb-2">
            {/* Green circle with G inside */}
            <div
              className="rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center me-2"
              style={{ width: "40px", height: "40px" }}
            >
              G
            </div>
            <h3 className="fw-semibold m-0 text-dark">GrubToGo</h3>
          </div>
          <p className="text-muted small">Sign in to continue</p>
        </div>

        {/* The login form */}
        <form onSubmit={handleSubmit}>
          
          {/* Email box */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // updates email value
              required
            />
          </div>

          {/* Password box */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            {/* input-group keeps input and button in one line */}
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"} // toggle between text or hidden
                className="form-control"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // updates password value
                required
              />
              {/* This button shows or hides password */}
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password link */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)} // true or false
              />
              <label htmlFor="rememberMe" className="form-check-label small">
                Remember me
              </label>
            </div>
            <a href="#" className="small text-decoration-none text-primary">
              Forgot password?
            </a>
          </div>

          {/* Sign In button */}
          <button type="submit" className="btn btn-success w-100 fw-semibold">
            Sign In
          </button>

          {/* Bottom text */}
          <p className="text-center mt-3 small">
            New to GrubToGo?{" "}
            <a href="#" className="text-decoration-none text-primary fw-semibold">
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
