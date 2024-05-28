import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
// import '../style/inquiry.css'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Inquiry = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [branch, setBranch] = useState([]);
  const [ref, setRef] = useState([]);
  const [inquiry, setInquiry] = useState([]);
  const [status, setStatus] = useState([]);

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
      console.log(response);
      setBranch(response.data.data);
      //   toast.success(response.data.status, {
      //     position: "top-right",
      //     autoClose: 500,
      //   });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.status || "Failed to view all Branch", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const getref = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/ref/view_reference",
        {
          headers: {
            Authorization: `${sessionStorage.getItem("login")}`,
          },
        }
      );
      setRef(response.data.data);
      //   toast.success(response.data.status, {
      //     position: "top-right",
      //     autoClose: 500,
      //   });
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response.data.message || "Failed to view all Reference",
        {
          position: "top-right",
          autoClose: 500,
        }
      );
    }
  };

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
      setInquiry(response.data.data);
      //   toast.success(response.data.status, { position: "top-right", autoClose: 500 });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || "Failed to view all Role", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const getstatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/status/view_status",
        {
          headers: {
            Authorization: `${sessionStorage.getItem("login")}`,
          },
        }
      );
      console.log(response);
      setStatus(response.data.data);
      //   toast.success(response.data.message, {
      //     position: "top-right",
      //     autoClose: 500,
      //   });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || "Failed to view all Status", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const addinquiry = async (values,resetForm) => {
    try {
      console.log("login", sessionStorage.getItem("login"));
      const response = await axios.post(
        "http://localhost:3000/inquiry/inquiry",
        values,
        {
          headers: {
            Authorization: `${sessionStorage.getItem("login")}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.status, {
        position: "top-right",
        autoClose: 500,
      });
      resetForm();   
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to Add Inquiry", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  const init = {
    branch: "",
    name: "",
    contact: "",
    joindate: "",
    reference: "",
    ref_by: "",
    inquiry_by: "",
    status: "",
    status_date: "",
    inquiry_date: currentDate,
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const validateSchema = Yup.object({
    branch: Yup.string().required("Enter Branch"),
    name: Yup.string().required("Enter Name"),
    contact: Yup.string().min(10).max(10)
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    joindate: Yup.string().required("Enter Join Date"),
    reference: Yup.string().required("Select Reference"),
    ref_by: Yup.string().required("Enter Ref By"),
    inquiry_by: Yup.string().required("Select Inquiry By"),
    status: Yup.string().required("Select Status"),
    status_date: Yup.string().required("Enter Status Date"),
    inquiry_date: Yup.string().required("Enter inquiry Date"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: init,
      validationSchema: validateSchema,
      onSubmit: (values,{resetForm}) => {
        addinquiry(values,resetForm);
      },
    });

  useEffect(() => {
    getbranch();
    getref();
    getAdminUser();
    getstatus();
  }, []);

  return (
    <>
      <div className="heading">
        <h2>Inquiry</h2>
      </div>
      <div className="inquiry">
        <h3 className="text-center mb-3 fw-bolder" style={{ color: "#1976D2" }}>
          Add Inquiry
        </h3>
        <form action="" onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              id="outlined-select-currency"
              select
              label="Branch Name"
              name="branch"
              value={values.role}
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
            <TextField
              fullWidth
              label="Name"
              type="text"
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              // variant="filled"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              label="Contact"
              type="text"
              name="contact"
              value={values.contact}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.contact && !!errors.contact}
              helperText={touched.contact && errors.contact}
              // variant="filled"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              label="Join Date"
              type="date"
              name="joindate"
              value={values.joindate}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.joindate && !!errors.joindate}
              helperText={touched.joindate && errors.joindate}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Reference Name"
              name="reference"
              value={values.reference}
              onChange={(e) => handleChange("reference")(e.target.value)}
              onBlur={handleBlur}
              error={!!touched.reference && !!errors.reference}
              helperText={touched.reference && errors.reference}
              sx={{ gridColumn: "span 2" }}
            >
              {ref.map((ele, index) => (
                <MenuItem key={index} value={ele._id}>
                  {ele.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Reference By"
              type="text"
              name="ref_by"
              value={values.ref_by}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.ref_by && !!errors.ref_by}
              helperText={touched.ref_by && errors.ref_by}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Inquiry By"
              name="inquiry_by"
              value={values.inquiry_by}
              onChange={(e) => handleChange("inquiry_by")(e.target.value)}
              onBlur={handleBlur}
              error={!!touched.inquiry_by && !!errors.inquiry_by}
              helperText={touched.inquiry_by && errors.inquiry_by}
              sx={{ gridColumn: "span 2" }}
            >
              {inquiry.map((ele, index) => (
                <MenuItem key={index} value={ele._id}>
                  {ele.admin_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              select
              label="Status"
              name="status"
              value={values.status}
              onChange={(e) => handleChange("status")(e.target.value)}
              onBlur={handleBlur}
              error={!!touched.status && !!errors.status}
              helperText={touched.status && errors.status}
              sx={{ gridColumn: "span 2" }}
            >
              {status.map((ele, index) => (
                <MenuItem key={index} value={ele._id}>
                  {ele.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Status Date"
              type="date"
              name="status_date"
              value={values.status_date}
              onBlur={handleBlur}
              onChange={handleChange}
              error={!!touched.status_date && !!errors.status_date}
              helperText={touched.status_date && errors.status_date}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
          <Box display="flex" justifyContent="Center" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Add Inquiry
            </Button>
          </Box>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Inquiry;
