import React, { useState } from "react";
import styles from "./SingUp.module.scss";
import { connect, useDispatch } from "react-redux";
import { signUp } from "../../../actions/authentication";
import { useNavigate } from "react-router-dom";
const loadingGIF = require("../../../assets/images/loadingBtn.gif");

const SingUp = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = props.userData;

  const [data, setData] = useState({
    name: "",
    lestName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  //  Update state
  const hendelChange = ({ target: { name, value } }) =>
    setData({ ...data, [name]: value });

  // Submit form
  const hendelSubmit = async (e) => {
    e.preventDefault();

    delete data.passwordConfirm;
    await dispatch(
      await props.signUp(
        {
          ...data,
          phone: "0000000000",
        },
        navigate
      )
    );
  };

  return (
    <div className={styles.continer}>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up!!!!
                      </p>
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
                      <form
                        onSubmit={hendelSubmit}
                        method="POST"
                        className="mx-1 mx-md-4"
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              onChange={hendelChange}
                              defaultValue={data.name}
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              minLength={2}
                              required
                            />
                            <label className="form-label" htmlFor="name">
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              onChange={hendelChange}
                              defaultValue={data.lestName}
                              minLength={2}
                              type="text"
                              name="lestName"
                              id="lastName"
                              required
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="lastName">
                              Your Lest Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              onChange={hendelChange}
                              defaultValue={data.email}
                              type="email"
                              name="email"
                              id="form3Example3c"
                              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                              className="form-control"
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              onChange={hendelChange}
                              defaultValue={data.password}
                              name="password"
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              pattern={data.passwordConfirm}
                              minLength={6}
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              onChange={hendelChange}
                              defaultValue={data.passwordConfirm}
                              name="passwordConfirm"
                              type="password"
                              id="form3Example4cd"
                              pattern={data.password}
                              className="form-control"
                              required
                              minLength={6}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submited"
                            className="btn btn-primary btn-lg"
                            disabled={status === "loading"}
                          >
                            {status === "loading" && (
                              <img
                                style={{
                                  width: " 25px",
                                  marginRight: " 18px",
                                }}
                                src={loadingGIF}
                                alt=""
                              />
                            )}
                            Register
                          </button>
                        </div>
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                          Already registered?{" "}
                          <a href="/login" className="link-danger">
                            Login
                          </a>
                        </p>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
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
export default connect(mapStateToProps, { signUp })(SingUp);
