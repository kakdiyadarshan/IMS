import React, { useEffect, useState } from "react";
// import "../style/Viewuser.css";
import { FaEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  TableCell,
  Paper,
  TableHead,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  Box,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Modal,
  useMediaQuery,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
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

const Viewinquiry = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [data, setData] = useState(null);
  const [branchs, setBranch] = useState([]);
  const [refs, setRef] = useState([]);
  const [inquirys, setInquiry] = useState([]);
  const [statuss, setStatus] = useState([]);

  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(null);
  // const { values } = useFormikContext();

  const [filteredData, setFilteredData] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState("");

  const [initialValues, setInitialValues] = useState({
    branch: "",
    name: "",
    contact: "",
    joindate: "",
    reference: "",
    ref_by: "",
    inquiry_by: "",
    status: "",
    status_date: "",
  });

  const handleOpen = (data) => {
    setRow(data);
    setInitialValues({
      id: data._id,
      branch: data.branch?._id,
      name: data.name,
      contact: data.contact,
      joindate: data.joindate,
      reference: data.reference?._id,
      ref_by: data.ref_by,
      inquiry_by: data.inquiry_by?._id,
      status: data.status?._id,
      status_date: data.status_date,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const getinquiry = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/inquiry/view_inquiry",
        {
          headers: {
            Authorization: `${sessionStorage.getItem("login")}`,
          },
        }
      );
      console.log(response.data.data);
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

  const handleEdit = async (formValues) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/inquiry/inquiry_update/${formValues.id}`,
        formValues,
        {
          headers: {
            Authorization: `${sessionStorage.getItem("login")}`,
          },
        }
      );
      console.log(response);
      getinquiry();
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

  const handledeleteinquiry = async (id) => {
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
            `http://localhost:3000/inquiry/inquiry_delete/${id}`,
            {
              headers: {
                Authorization: `${sessionStorage.getItem("login")}`,
              },
            }
          );
          Swal.fire("Deleted!", "Your inquiry has been deleted.", "success");
          getinquiry();
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

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = Yup.object({
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
  });

  const filterData = async () => {
    console.log("ns", nameFilter);
    console.log("ss", statusFilter);
    try {
      let url = `http://localhost:3000/inquiry/find_inquiry?name=${nameFilter}&branch=${selectedBranch}&status=${statusFilter}&inquiry_by=${selectedInquiry}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `${sessionStorage.getItem("login")}`,
        },
      });
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response || "Failed to filter Inquiry", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  useEffect(() => {
    if (nameFilter !== "" || statusFilter !== "" || selectedBranch !== "" || selectedInquiry !==  "") filterData();
    else getinquiry();
  }, [nameFilter, statusFilter,selectedBranch,selectedInquiry]);

  useEffect(() => {
    getinquiry();
    getbranch();
    getref();
    getAdminUser();
    getstatus();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            id="status-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
            }}
            label="Filter by Status"
          >
            <MenuItem value="">All</MenuItem>
            {statuss.map((status) => (
              <MenuItem key={status._id} value={status._id}>
                {status.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel id="branch-filter-label">Branch</InputLabel>
          <Select
            labelId="branch-filter-label"
            id="branch-filter"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            label="Filter by Branch"
          >
            <MenuItem value="">All</MenuItem>
            {branchs.map((branch) => (
              <MenuItem key={branch._id} value={branch._id}>
                {branch.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel id="inquiry-filter-label">Inquiry</InputLabel>
          <Select
            labelId="inquiry-filter-label"
            id="inquiry-filter"
            value={selectedInquiry}
            onChange={(e) => setSelectedInquiry(e.target.value)}
            label="Filter by Inquiry"
          >
            <MenuItem value="">All</MenuItem>
            {inquirys.map((inquiry) => (
              <MenuItem key={inquiry._id} value={inquiry._id}>
                {inquiry.admin_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        component={Paper}
        className="mt-4 m-auto"
        style={{ width: "100%" }}
      >
        <h2
          className="text-center mt-5 mb-3 fw-bolder"
          style={{ color: "#1976D2" }}
        >
          View All Inquiry
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
                Contact
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Branch Name
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Join Date
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Reference
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Ref By
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Inquiry Name
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Status
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Status Date
              </TableCell>
              <TableCell align="left" className="fw-bold">
                Inquiry Date
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
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item.contact}</TableCell>
                <TableCell align="left">{item.branch?.name}</TableCell>
                <TableCell align="left">{item.joindate}</TableCell>
                <TableCell align="left">{item.reference?.name}</TableCell>
                <TableCell align="left">{item.ref_by}</TableCell>
                <TableCell align="left">
                  {item.inquiry_by?.admin_name}
                </TableCell>
                <TableCell align="left">{item.status?.name}</TableCell>
                <TableCell align="left">{item.status_date}</TableCell>
                <TableCell align="left">{item.inquiry_date}</TableCell>
                <TableCell
                  align="left"
                  style={{ color: "blue", fontSize: "19px" }}
                >
                  <EditIcon onClick={() => handleOpen(item)} />
                </TableCell>
                <TableCell align="left" style={{ color: "red" }}>
                  <DeleteIcon
                    onClick={() => {
                      handledeleteinquiry(item._id);
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

      {/* Edit Inquiry */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box m="20px" sx={style}>
          <Formik
            onSubmit={handleEdit}
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
                      subtitle="Update a Airport"
                      style={{ color: "#1976D2" }}
                    >
                      Edit Inquiry
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
                    id="outlined-select-currency"
                    select
                    label="Branch Name"
                    name="branch"
                    value={values.branch}
                    onChange={(e) => handleChange("branch")(e.target.value)}
                    onBlur={handleBlur}
                    error={!!touched.branch && !!errors.branch}
                    helperText={touched.branch && errors.branch}
                    sx={{ gridColumn: "span 2" }}
                  >
                    {branchs.map((ele, index) => (
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
                    {refs.map((ele, index) => (
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
                    {inquirys.map((ele, index) => (
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
                    {statuss.map((ele, index) => (
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
                    Edit Inquiry
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

export default Viewinquiry;
