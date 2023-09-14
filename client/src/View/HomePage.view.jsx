import React from 'react'
import UserRegister from '../Components/UsersRegister.component'
import Layout from '../Templates/Layout.templates';
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
      <Layout>
      <div>
        <hr/>
        <div className = "row">
          <div className="col mb-5 mt-5 text-info"> 
              <UserRegister formType={"register"} setUser={setUser} />
          </div>
            <div className = "col mb-5 mt-5 text-info">
              <UserRegister formType={"login"} setUser={setUser} />
            </div>
        </div>
      </div>
      </Layout>
    )
}
export default LogRegPage