import { useState } from 'react'
import { Eye, EyeOff, Landmark } from 'lucide-react'

export function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('officer@mplads.gov.in')
  const [password, setPassword] = useState('prototype')
  const [role, setRole] = useState('State Nodal Officer')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onLogin) onLogin({ email, role })
  }

  return (
    <div className="login-page-container">
      <div className="login-left-banner">
        <div>
          <div className="login-brand-header">
            <div className="brand-emblem-icon" style={{ width: 42, height: 42 }}>
              <Landmark size={24} />
            </div>
            <div>
              <strong className="brand-title" style={{ fontSize: 20 }}>
                MPLADS
              </strong>
              <span className="brand-subtitle" style={{ fontSize: 13, color: '#4ed8b4' }}>
                AI Monitoring System
              </span>
            </div>
          </div>
        </div>

        <div className="login-hero-content">
          <h1>
            AI-powered monitoring<br />
            and early warning system<br />
            for <span>MPLADS projects</span>
          </h1>
          <p>
            Decision-support platform for transparent project execution, explainable risk intelligence, and accountable officer action.
          </p>

          <svg className="login-parliament-art" viewBox="0 0 400 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="80" width="360" height="40" rx="4" fill="#ffffff" fillOpacity="0.08" />
            <path d="M40 80 V50 Q200 20 360 50 V80 Z" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.2" />
            <circle cx="200" cy="35" r="12" fill="#4ed8b4" fillOpacity="0.3" stroke="#4ed8b4" />
            <line x1="200" y1="23" x2="200" y2="12" stroke="#4ed8b4" strokeWidth="2" />
            <rect x="196" y="8" width="12" height="8" fill="#d97706" />
          </svg>
        </div>

        <div className="login-govt-footer">
          <strong>Ministry of Statistics & Programme Implementation</strong>
          <br />
          Government of India
        </div>
      </div>

      <div className="login-right-form-wrap">
        <div className="login-form-card">
          <h2>Welcome Back!</h2>
          <p>Login to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group-field">
              <label>Email / Username</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                required
              />
            </div>

            <div className="form-group-field">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ margin: 0 }}>Password</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ fontSize: 11, color: '#2563eb', textDecoration: 'none' }}>
                  Forgot Password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 0,
                    color: '#94a3b8',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group-field">
              <label>Login as</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="State Nodal Officer">State Nodal Officer</option>
                <option value="Ministry Official">Ministry Official</option>
                <option value="District Officer">District Officer</option>
                <option value="Field Officer">Field Officer</option>
              </select>
            </div>

            <button type="submit" className="login-submit-btn">
              Login
            </button>
          </form>

          <p style={{ marginTop: 24, fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <a href="#contact" onClick={(e) => e.preventDefault()} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>
              Contact Administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
