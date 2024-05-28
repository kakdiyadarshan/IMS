import React, { useEffect, useState } from "react";
// import "../style/Viewuser.css";
import { FaEdit } from "react-icons/fa";
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  TableCell,
  Paper,
  TableHead,
  Table,
  TableContainer,
  TableRow,
  TableBody,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ViewUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [role, setRole] = useState([]);
  const [branch, setBranch] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(null);

  const [initialValues, setInitialValues] = useState({
    admin_name: "",
    admin_email: "",
    // admin_pass: "",
    role: "",
    branch: "",
    contact: "",
    image: null,
  });

  const handleOpen = (data) => {
    console.log();
    setRow(data);
    setInitialValues({
      id: data._id,
      admin_name: data.admin_name,
      admin_email: data.admin_email,
      // admin_pass: data.admin_pass,
      role: data.role?._id,
      branch: data.branch?._id,
      contact: data.contact,
      // image: "",
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const formik = useFormikContext();

  const getAdminUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/view_admin",
        {
          headers: {
            Authorization: `${sessionStorage.getItem("login")}`,
          },
        }
      );
      console.log(response);
      setData(response.data.data);
      // toast.success(response.data.status, {
      //     position: "top-right",
      //     autoClose: 500,
      // });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || "Failed to view all Role", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const handleEdituser = async (values) => {
    debugger
    const formData = new FormData();
      formData.append("admin_name", values.admin_name);
      formData.append("admin_email", values.admin_email);
      // formData.append("admin_pass", values.admin_pass);
      formData.append("role", values.role);
      formData.append("branch", values.branch);
      formData.append("contact", values.contact);
    //   if (selectedFile) {
    //     formData.append('image', selectedFile);
    // }
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/admin_update/${values.id}`,
        formData,
        {
          headers: {
            Authorization: `${sessionStorage.getItem("login")}`,
          },
        }
      );
      console.log(response);
      // setData(response.data.data);
      getAdminUser();
      handleClose();
      toast.success(response.data.status, {
        position: "top-right",
        autoClose: 500,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || "Failed to Updated Inquiry", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const handledeleteradminuser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.get(
            `http://localhost:3000/auth/admin_delete/${id}`,
            {
              headers: {
                Authorization: `${sessionStorage.getItem("login")}`,
              },
            }
          );
          Swal.fire("Deleted!", "Your adminuser has been deleted.", "success");
          getAdminUser();
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response.data.message || "Failed to Delete Role", {
            position: "top-right",
            autoClose: 500,
          });
        }
      }
    });
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

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = Yup.object().shape({
    admin_name: Yup.string().required("Enter Name"),
    admin_email: Yup.string().email().required("Enter Email"),
    // admin_pass: Yup.string().required("Enter Password"),
    role: Yup.string().required("Select Role"),
    branch: Yup.string().required("Select Branch"),
    contact: Yup.string()
      .min(10)
      .max(10)
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    // image: Yup.string().required("Choose Image"),
  });

  useEffect(() => {
    getAdminUser();
    getrole();
    getbranch();
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        className="mt-4 m-auto"
        style={{ width: "100%" }}
      >
        <h2
          className="text-center mt-5 mb-3 fw-bolder"
          style={{ color: "#1976D2" }}
        >
          View All Admin User
        </h2>
        { data != null ?
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold">Id</TableCell>
              <TableCell align="left" className="fw-bold">
                Name
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Email
              </TableCell>
              {/* <TableCell align="left" className="fw-bold">Password</TableCell> */}
              <TableCell align="left" className="fw-bold">
                Contact
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Role
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Branch Name
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Image
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Edit
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{item.admin_name}</TableCell>
                <TableCell align="left">{item.admin_email}</TableCell>
                {/* <TableCell align="left">{item.admin_pass}</TableCell> */}
                <TableCell align="left">{item.contact}</TableCell>
                <TableCell align="left">{item.role?.name}</TableCell>
                <TableCell align="left">{item.branch?.name}</TableCell>
                <TableCell align="left">
                  <img
                    src={"http://localhost:3000/images/" + item.image}
                    alt={item.image}
                    width={"100px"}
                    height={"100px"}
                  />
                </TableCell>
                <TableCell align="left" style={{ color: "blue" }}>
                  <EditIcon onClick={() => handleOpen(item)} />
                </TableCell>
                <TableCell align="left" style={{ color: "red" }}>
                  <DeleteIcon
                    onClick={() => {
                      handledeleteradminuser(item._id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> :
        <div className="load">
          <div className="loader"></div>
        </div>
        }
      </TableContainer>

      {/* Edit user */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box m="20px" sx={style}>
          <Formik
            onSubmit={handleEdituser}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <div
                    className="d-flex justify-content-between"
                    style={{ gridColumn: "1/4 span" }}
                  >
                    <h2
                      title="EDIT USER"
                      style={{ color: "#1976D2" }}
                    >
                      EDIT USER
                    </h2>
                    <button
                      type="button"
                      style={{ color: "white" }}
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => {
                        handleClose();
                      }}
                    ></button>
                  </div>
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
                  {/* <FormControl
                                        sx={{ m: 1, width: "43ch" }}
                                        variant="filled"
                                        className="m-0"
                                    >
                                        <InputLabel htmlFor="filled-adornment-password">
                                            Password
                                        </InputLabel>
                                        <FilledInput
                                            id="filled-adornment-password"
                                            type={showPassword ? "text" : "password"}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="admin_pass"
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
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl> */}
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
                    {role.map((ele, index) => (
                      <MenuItem key={index} value={ele._id}>
                        {ele.name}
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
                    {branch.map((ele, index) => (
                      <MenuItem key={index} value={ele._id}>
                        {ele.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {/* <TextField
                      fullWidth
                      variant="filled"
                      type="file"
                      label="Upload Image"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        setSelectedFile(event.currentTarget.files[0].name);
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                      error={!!touched.image && !!errors.image}
                      helperText={touched.image && errors.image}
                      InputLabelProps={{ shrink: true }}
                      sx={{ gridColumn: "span 2" }}
                    /> */}
                </Box>
                <Box display="flex" justifyContent="Center" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Edit User
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ViewUser;
