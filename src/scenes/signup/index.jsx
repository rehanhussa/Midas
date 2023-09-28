import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from '../../api/auth'

export default function Signup() {
  const [email, setEmail] = useState(''); // Changed "username" to "email" to match the Login component
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await signup(email, password);
      console.log(response);
      setMessage(response.message || 'Signup successful!');
      navigate('/auth/signin'); // Redirect to login after successful signup
    } catch (error) {
      setMessage('Error during signup. Please try again.');
    }
  }

  return (
    <div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3"><span>Midas </span></h6>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Join Midas Today.</h4>
                          <form onSubmit={handleSubmit}>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-style"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                className="form-style"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button className="btn mt-4">Signup</button>
                          </form>
                          <p className="mb-0 mt-4 text-center">
                            {'Already have an account? '}
                            <Link to="/auth/signin">Go to Login</Link>
                            {' instead.'}
                          </p>
                          {message && <p className="mt-3">{message}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
