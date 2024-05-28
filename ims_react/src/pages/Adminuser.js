import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import '../style/adminuser.css'
import { Button, MenuItem, OutlinedInput, Select } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Adminuser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    if (showPassword == true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  // setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const [data, setData] = useState([])
  const [role, setRole] = useState([]);
  const [branch, setBranch] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const addadminuser = async (values,resetForm) => {
    debugger;
    try {
      const formData = new FormData();
      formData.append("admin_name", values.admin_name);
      formData.append("admin_email", values.admin_email);
      formData.append("admin_pass", values.admin_pass);
      formData.append("role", values.role);
      formData.append("branch", values.branch);
      formData.append("contact", values.contact);
      formData.append("image", selectedFile);
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: ` ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.status, {
        position: "top-right",
        autoClose: 500,
      });
      resetForm()
      // navigate("/viewuser");
    } catch (error) {
      console.error("Error adding Admin user:", error);
      toast.error(error.response?.data?.message || "Failed to add Admin User", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const getrole = async () => {
    try {
      const response = await axios.get("http://localhost:3000/role/view_role", {
        headers: {
          Authorization: `${sessionStorage.getItem("login")}`,
        },
      });
      setRole(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || "Failed to view all Role", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const getbranch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/branch/view_branch",
        {
          headers: {
            Authorization: `${sessionStorage.getItem("login")}`,
          },
        }
      );
      setBranch(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || "Failed to view all Role", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const init = {
    admin_name: "",
    admin_email: "",
    admin_pass: "",
    role: "",
    branch: "",
    contact: "",
    image: null,
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const validateSchema = Yup.object({
    admin_name: Yup.string().required("Enter Name"),
    admin_email: Yup.string().email().required("Enter Email"),
    admin_pass: Yup.string().required("Enter Password"),
    role: Yup.string().required("Select Role"),
    branch: Yup.string().required("Select Branch"),
    contact: Yup.string().min(10).max(10)
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    image: Yup.string().required("Enter Image"),
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: init,
    validationSchema: validateSchema,
    onSubmit: (values,{resetForm}) => {
      addadminuser(values,resetForm);
    },
  });

  useEffect(() => {
    getrole();
    getbranch();
  }, []);

  return (
    <>
      <div className="heading">
        <h2 style={{ color: "#4B49AC" }}>Admin User</h2>
      </div>
      <div className="user">
        <h3 className="text-center mb-4 fw-bolder" style={{ color: "#1976D2" }}>
          Add User
        </h3>
        <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              label="Name"
              type="text"
              name="admin_name"
              value={values.admin_name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.admin_name && !!errors.admin_name}
              helperText={touched.admin_name && errors.admin_name}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="admin_email"
              value={values.admin_email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.admin_email && !!errors.admin_email}
              helperText={touched.admin_email && errors.admin_email}
              sx={{ gridColumn: "span 2" }}
            />
            <FormControl sx={{ m: 1, width: "67ch" }} variant="outlined" className="mt-0"> 
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="admin_pass"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.admin_pass}
                error={!!touched.admin_pass && !!errors.admin_pass}
                helperText={touched.admin_pass && errors.admin_pass}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <TextField
              fullWidth
              label="Contact No"
              type="text"
              name="contact"
              value={values.contact}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.contact && !!errors.contact}
              helperText={touched.contact && errors.contact}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              label="Image"
              type="file"
              value={values.image}
              name="image"
              onBlur={handleBlur}
              onChange={(event) => {
                handleChange(event);
                setSelectedFile(event.currentTarget.files[0]);
              }}
              error={!!touched.image && !!errors.image}
              helperText={touched.image && errors.image}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Role Name"
              value={values.role}
              onChange={(e) => handleChange("role")(e.target.value)}
              onBlur={handleBlur}
              error={!!touched.role && !!errors.role}
              helperText={touched.role && errors.role}
              sx={{ gridColumn: "span 2" }}
            >
              {role.map((option, index) => (
                <MenuItem key={index} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Branch Name"
              value={values.branch}
              onChange={(e) => handleChange("branch")(e.target.value)}
              onBlur={handleBlur}
              error={!!touched.branch && !!errors.branch}
              helperText={touched.branch && errors.branch}
              sx={{ gridColumn: "span 2" }}
            >
              {branch.map((option, index) => (
                <MenuItem key={index} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box display="flex" justifyContent="Center" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Add User
            </Button>
          </Box>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Adminuser;
