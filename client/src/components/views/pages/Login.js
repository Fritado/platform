import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import AuthFooter from '../../views/common/AuthFooter'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { loginUser, userToken } from '../../../slice/authSlice'
import Logo from '../../../assets/images/logo2.png'
import { AUTH_API_ROUTES } from '../../services/APIURL/Apis'
import { FaEye, FaEyeSlash } from 'react-icons/fa'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData

  const handleOnChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value })
  }

  const handelOnSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = `${AUTH_API_ROUTES.LOGIN}`
      const response = await axios.post(url, formData)
      toast.success('Login Successfull')
      // console.log('response', response)
      const { token, redirectTo } = response.data
      localStorage.setItem('token', token)
      dispatch(loginUser(response))
      dispatch(userToken(token))
      window.location.href = redirectTo
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("We're experiencing some technical difficulties. Please try again later.")
      }
      // console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0 d-flex flex-column mx-auto">
          <div className="col-lg-4 mx-auto pt-4">
            <div className="auth-form-light text-left py-4 px-4 px-sm-5 mt-5">
              <div className="brand-logo">
                <img src={Logo} alt="logo" className="d-flex mx-auto" />
              </div>
              <h5>Hello! Lets get started</h5>
              <h6 className="fw-normal">Sign in to continue.</h6>
              <Form onSubmit={handelOnSubmit} className="">
                <Form.Group className=" d-flex search-field">
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    id="validationServer01"
                    value={email}
                    placeholder="Username"
                    onChange={handleOnChange}
                    size="lg"
                    className="h-auto my-2"
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field position-relative">
                  <Form.Control
                    required
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleOnChange}
                    size="lg"
                    className="h-auto"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                  >
                    {!showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </Form.Group>
                <button
                  type="submit"
                  disabled={!email || !password}
                  className="mt-3 btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  {!loading ? 'SIGN IN' : 'PROCESSING...'}
                </button>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-secondary">
                      <input type="checkbox" className="check-input" />
                      <i className="input-helper pe-1"></i>
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="auth-link text-secondary">
                    Forgot password?
                  </Link>
                </div>

                <div className="text-center  font-weight-light">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-color">
                    Create
                  </Link>
                </div>
                <div className="text-center mt-2 font-weight-light">
                  <Link to="/register" className="text-color">
                    Need help signing in?
                  </Link>
                </div>
              </Form>
            </div>
          </div>

          <div className="d-flex mx-auto">
            <div className="mt-5 custom-margin">
              <h6 className="my-2 fw-bolder">Authorized Users Only</h6>
              <p className="text-justify">
                Step into Fritado AI's secure systems, reserved for authorized users. We prioritize
                safeguarding sensitive data and detecting any unauthorized activity. By using our
                systems, you agree to monitoring and potential sharing of evidence with law
                enforcement in case of criminal activity. Your continued use implies acceptance of
                our Privacy Policy and Terms and Conditions. If you don't agree, please close your
                browser window.
              </p>
            </div>
          </div>
          <AuthFooter />
        </div>
      </div>
    </div>
  )
}

export default Login
