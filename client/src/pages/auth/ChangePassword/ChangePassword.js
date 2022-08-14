import React, { useState } from "react";
import "./ChangePassword.scss";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword } from "../../../actions/authentication";

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, resetToken } = useParams();

  const [data, setData] = useState({
    password: "",
    passwordConfirm: "",
  });

  const handleData = ({ target: { name, value } }) => setData({ ...data, [name]: value });

  const changePassword = async (e) => {
    e.preventDefault();

    await dispatch(
      await props.changePassword(
        {
          email,
          resetToken,
          password: data.password,
        },
        navigate
      )
    );
  };

  return (
    <div className="ChangePassword-continer">
      <div className="card login-form">
        <div className="card-body">
          <h3 className="card-title text-center">Change password</h3>
          <div className="card-text">
            <form onSubmit={changePassword} method="POST">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Your new password</label>
                <input value={data.password} onChange={handleData} type="password" name="password" pattern={data.password} className="form-control form-control-sm" minLength={6} required />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Repeat password</label>
                <input
                  value={data.passwordConfirm}
                  onChange={handleData}
                  type="password"
                  pattern={data.passwordConfirm}
                  name="passwordConfirm"
                  className="form-control form-control-sm"
                  minLength={6}
                  required
                />
              </div>
              <br />
              <button type="submited" className="btn btn-primary btn-block submit-btn">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};
export default connect(mapStateToProps, { changePassword })(ChangePassword);
