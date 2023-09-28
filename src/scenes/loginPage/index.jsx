import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from '../../api/auth'
import { AuthContext } from "../../context/AuthContextComponent";

export default function Login() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setIsLoggedIn } = useContext(AuthContext)

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await signin(text, password)
    setIsLoggedIn(true)
    navigate('/')
    console.log(response);
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
                          <h4 className="mb-4 pb-3">Track What Matters.</h4>
                          <form onSubmit={handleSubmit}>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-style"
                                placeholder="Email"
                                value={text}
                                onChange={e => setText(e.target.value)}
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                className="form-style"
                                current-password="current-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button className="btn mt-4">Login</button>
                          </form>
                          <p className="mb-0 mt-4 text-center">
                            {'No Account ? '}
                            <Link to="/auth/signup">Go to Signup</Link>
                            {' instead.'}
                          </p>
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