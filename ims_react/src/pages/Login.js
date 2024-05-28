import React, { useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import "../style/login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../style/role.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { increment, setIsLogin } from "../app/common";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = sessionStorage.getItem("login");
  //   if (token) {
  //     navigate("/home");
  //   }
  // }, []);

  const login = async (values) => {
    debugger
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/admin_login",
        values
      );
      if (response.data.status != 200) {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 500,
        });
        return
      };
      console.log("login", response);
      console.log("token", response.data.token);
      await sessionStorage.setItem("login", response.data.token);
      await dispatch(setIsLogin(true));
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 500,
      });
      setTimeout(() => {
        navigate("/home");
      },1500)
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || "Failed to Login", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const init = {
    admin_email: "",
    admin_pass: "",
  };

  const validateSchema = Yup.object({
    admin_email: Yup.string().email().required("Enter Email"),
    admin_pass: Yup.string().required("Enter Password Name"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: init,
      validationSchema: validateSchema,
      onSubmit: (values) => {
        login(values);
      },
    });

  return (
    <>
      <div className="d-flex align-items-center vh-100 ">
        <div className="container">
          <div className="login">
            <div className="head">
              <h2>Login</h2>
            </div>
            <div className="box1">
              <form action="" onSubmit={handleSubmit}>
                <div className="line d-flex align-items-center mb-3">
                  <IoPerson
                    className="icon me-2"
                    style={{ color: "#1976D2", fontSize: "16px" }}
                  />
                  <input
                    type="email"
                    name="admin_email"
                    value={values.admin_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Username"
                  />
                </div>
                {errors.admin_email && touched.admin_email ? (
                  <span className="error text-danger">
                    {errors.admin_email}
                  </span>
                ) : null}
                <div className="line d-flex align-items-center mb-3">
                  <FaLock
                    className="icon me-2"
                    style={{ color: "#1976D2", fontSize: "16px" }}
                  />
                  <input
                    type="password"
                    name="admin_pass"
                    value={values.admin_pass}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                  />
                </div>
                {errors.admin_pass && touched.admin_pass ? (
                  <span className="error text-danger">{errors.admin_pass}</span>
                ) : null}<br />
                <button type="submit" className="btn">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
