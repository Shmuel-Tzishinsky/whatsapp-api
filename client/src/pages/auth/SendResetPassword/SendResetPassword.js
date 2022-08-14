import React, { useState } from "react";
import "./SendResetPassword.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendResetPassword } from "../../../actions/authentication";

const SendResetPassword = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const { error, status } = useSelector((state) => state.userData);

  const sendEmail = async (e) => {
    e.preventDefault();
    await dispatch(await props.sendResetPassword(email, navigate));
  };

  return (
    <div className="SendResetPassword-continer">
      <div className="auth_class">
        <div className="container login-container">
          <img
            className="triangleA"
            src={require("../../../assets/images/triangle-top.png")}
            alt="Onestop triangle"
          />
          <div className="row">
            <div className="col-md-6 welcome_auth">
              <div className="auth_welcome">
                The steps of password reset are simple
                <br />
                <span>
                  <a href="!">Good luck</a>
                </span>
              </div>
            </div>
            <div className="col-md-6 login-form">
              <div className="login_form_in">
                <div className="auth_branding">
                  <a href="#!" className="auth_branding_in">
                    <img
                      src={require("../../../assets/images/Procraft-Logo.jpg")}
                      alt="reset password"
                    />
                  </a>
                </div>
                <h1 className="auth_title text-left">Password Reset</h1>
                <form onSubmit={sendEmail} method="POST">
                  <div
                    className="alert alert-success bg-soft-primary border-0"
                    role="alert"
                  >
                    Enter your email address and we'll send you an email with
                    instructions to reset your password.
                  </div>
                  <div className="form-group">
                    <input
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      name="email"
                      placeholder="Email Address"
                      require="true"
                    />
                  </div>
                  {error && status === "failed" && (
                    <div className="text-center text-lg-start pt-2">
                      <p
                        style={{
                          color: "red",
                          fontSize: "0.9rem",
                        }}
                      >
                        {error}
                      </p>
                    </div>
                  )}
                  <div className="form-group">
                    <button
                      type="submited"
                      disabled={status === "loading"}
                      className="btn btn-primary btn-lg btn-block"
                    >
                      {status === "loading" && (
                        <img
                          style={{
                            width: "25px",
                            marginRight: " 18px",
                          }}
                          src={require("../../../assets/images/loadingBtn.gif")}
                          alt=""
                        />
                      )}
                      Reset Password
                    </button>
                  </div>
                  <div className="form-group other_auth_links">
                    <a href="/login">Login</a>
                    <a href="/sing-up">Register</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <img
          className="triangleB"
          src={require("../../../assets/images/triangle.png")}
          alt="Onestop triangle"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { sendResetPassword })(
  SendResetPassword
);
