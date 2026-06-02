import React from 'react'
import logo from '../../assets/logov2.svg'
import './ForgetPasswordPage.css'

const ForgetPasswordPage = () => {
  return (
    <div className='forgetpassword-container'>
            <div className="form-container">
                <img className='btnhover' src={logo} alt="SidiBouSolve Logo" />
                <form>
                  <h1>Forget your Password ?</h1>

                  <label >Enter email address</label>
                  <input className='btnhover' type="email" />

                  <button className='bluebtn btnhover'>Request reset link</button>
                </form>


                <div className='orscetion'>

                  <div className='whiteline'></div>
                    <span style={{color:"white", fontSize: "22px", fontWeight:'300'}}>OR</span>
                  <div className='whiteline'></div>

                </div>
          </div>
    </div>
  )
}

export default ForgetPasswordPage
