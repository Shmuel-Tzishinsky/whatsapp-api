import React, { useState } from "react";
import styles from "./Login.module.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/authentication";

const Login = (props) => {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.userData);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleData = ({ target: { name, value } }) =>
    setData({ ...data, [name]: value });

  const handeleLogin = async (e) => {
    e.preventDefault();

    await dispatch(await props.login(data));
  };

  return (
    <div className={styles.continer}>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handeleLogin} method="POST">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in </p>
                </div>
                <br />
                {error && status === "failed" && (
                  <div className="text-center text-lg-start mt-4 pt-2">
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
                <div className="form-outline mb-4">
                  <input
                    onChange={handleData}
                    name="email"
                    defaultValue={data.email}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    required={true}
                  />
                </div>

                <div className="form-outline mb-3">
                  <input
                    onChange={handleData}
                    defaultValue={data.password}
                    name="password"
                    type="password"
                    id="form3Example4"
                    minLength={6}
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    required={true}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id="form2Example3"
                    />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="/send-reset-password" className="text-body">
                    Forgot password?
                  </a>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submited"
                    className="btn btn-primary btn-lg"
                    disabled={status === "loading"}
                    style={
                      status === "loading"
                        ? { paddingRight: "2.5rem" }
                        : { paddingLeft: "2.5rem", paddingRight: "2.5rem" }
                    }
                  >
                    {status === "loading" && (
                      <img
                        style={{
                          width: " 25px",
                          marginRight: " 18px",
                        }}
                        src={require("../../../assets/images/loadingBtn.gif")}
                        alt=""
                      />
                    )}
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a href="/sing-up" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};
export default connect(mapStateToProps, { login })(Login);
