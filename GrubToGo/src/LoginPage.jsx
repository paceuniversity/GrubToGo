import React, { useState } from "react";

// This is our Login Page component
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    alert(`Logged in as ${email}${remember ? " (remembered)" : ""}`);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "24rem" }}>
        <div className="text-center mb-3">
          <div className="d-inline-flex align-items-center justify-content-center mb-2">
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

        <form onSubmit={handleSubmit}>
          {/* Email */}
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember me only */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="form-check-label small">
              Remember me
            </label>
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
