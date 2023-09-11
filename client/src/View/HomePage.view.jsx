import React from 'react'
import UserRegister from '../Components/UsersRegister.component'
import NavBar from '../Components/NavBar'
import "bootswatch/dist/minty/bootstrap.min.css";

const LogRegPage = (props) => {

  // --------------------------------------------------
  // I) HOOKS AND VARIABLES
  // --------------------------------------------------

  // i) Lifting States
    const { setUser } = props

  // --------------------------------------------------
  // II) JSX
  // --------------------------------------------------
    return (
      
        <div className="container" style={{ minHeight: "100vh" }} >
            <NavBar/>
            <hr/>
        <div className = "row">
          <div className="col-md-6 mb-3 text-info"> 
              <UserRegister formType={"register"} setUser={setUser} />
          </div>
            <div className = "col md-6mb-3 text-info">
              <UserRegister formType={"login"} setUser={setUser} />
            </div>
        </div>
          <hr/>
      </div>
    )
}
export default LogRegPage