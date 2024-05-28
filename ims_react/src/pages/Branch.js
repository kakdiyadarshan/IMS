import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import ContentHeader from "../components/ContentHeader";
import {
  Button,
  Modal,
  TableCell,
  Paper,
  TableHead,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  Box,
  TextField,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "../style/role.css";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Branch = () => {
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState({});
  const [nameError, setNameError] = useState(false);
  const [nameFilter, setNameFilter] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNameError(false);
    values.name = ""
  };

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);

  const handleClose1 = () => {
    setOpen1(false)
    setNameError(false);
  };

  const addbranch = async (values, resetForm) => {
    if (values.name != "") {
      try {
        const response = await axios.post(
          "http://localhost:3000/branch/branch",
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
        getbranch();
        handleClose();
        resetForm();
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response.data.status || "Failed to Add Branch", {
          position: "top-right",
          autoClose: 500,
        });
      }
    } else {
      setNameError(true);
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
      console.log(response);
      setData(response.data.data);
      // toast.success(response.data.status, {
      //   position: "top-right",
      //   autoClose: 500,
      // });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.status || "Failed to view all Branch", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const editbranch = (item) => {
    console.log("item", item);
    setEdit(item);
    handleOpen1();
  };

  const handleeditbranch = async (id, update) => {
    if (update != "") {
      const data = {
        name: update,
      };
      try {
        const response = await axios.post(
          `http://localhost:3000/branch/branch_update/${id}`,
          data,
          {
            headers: {
              Authorization: `${sessionStorage.getItem("login")}`,
            },
          }
        );
        console.log(response);
        getbranch();
        toast.success(response.data.status, {
          position: "top-right",
          autoClose: 500,
        });
        handleClose1();
        setEdit({});
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response.data.status || "Failed to Update Branch", {
          position: "top-right",
          autoClose: 500,
        });
      }
    } else {
      setNameError(true);
    }
  };

  const handledeletebranch = async (id) => {
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
            `http://localhost:3000/branch/branch_delete/${id}`,
            {
              headers: {
                Authorization: `${sessionStorage.getItem("login")}`,
              },
            }
          );
          Swal.fire("Deleted!", "Your Branch has been deleted.", "success");
          getbranch();
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

  const init = {
    name: "",
  };

  const validateSchema = Yup.object({
    // name: Yup.string().required("Enter Branch Name"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: init,
      // validationSchema: validateSchema,
      onSubmit: (values, { resetForm }) => {
        if (Object.keys(edit).length !== 0) {
          handleeditbranch(edit._id, edit.name);
        } else {
          addbranch(values, resetForm);
        }
      },
    });

  const filterData = async () => {
    try {
      let url = `http://localhost:3000/branch/find_branch?name=${nameFilter}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `${sessionStorage.getItem("login")}`,
        },
      });
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response || "Failed to filter Branch", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  useEffect(() => {
    if (nameFilter !== "") { filterData(); }
    else { getbranch() }
  }, [nameFilter]);

  useEffect(() => {
    getbranch();
  }, []);

  return (
    <>

      {/* <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Search" variant="outlined" value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)} />
      </Box> */}


      <div className="heading d-flex justify-content-between align-items-center">
        <h2>Branch</h2>
        <Button
          type="submit"
          onClick={handleOpen}
          color="secondary"
          variant="contained"
        >
          <IoMdAdd style={{ marginRight: "3px" }} />
          Add Branch
        </Button>
      </div>
      <div>
        <div className="d-flex justify-items-center flex-row align-items-center">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form className="box" onSubmit={handleSubmit}>
              <div className="title">
                <h1>Add Branch</h1>
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
              <div className="body">
                <div className="mb-3">
                  <label className="fw-bold">Branch Name</label>
                  <input
                    type="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="Enter Branch Name"
                  />
                  {nameError && (
                    <div className="error text-danger">
                      Branch Name is required
                    </div>
                  )}
                  {errors.name && touched.name ? (
                    <span className="error text-danger">{errors.name}</span>
                  ) : null}
                </div>
              </div>
              <div className="footer">
                <span>
                  <button
                    type="button"
                    className="btn btn-danger me-3"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-success">
                    Add Branch
                  </button>
                </span>
              </div>
            </form>
          </Modal>
        </div>
      </div>

      {/* Edit Role */}
      <div className="d-flex justify-items-center flex-row align-items-center">
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form className="box" onSubmit={handleSubmit}>
            <div className="title">
              <h1>Edit Branch</h1>
              <button
                type="button"
                style={{ color: "white" }}
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  handleClose1();
                }}
              ></button>
            </div>
            <div className="body">
              <div className="mb-3">
                <label className="fw-bold">Branch Name</label>
                <input
                  type="name"
                  name="name"
                  value={edit.name}
                  onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                  onBlur={handleBlur}
                  className="form-control"
                  placeholder="Enter Branch name"
                />
                {nameError && (
                  <div className="error text-danger">
                    Branch Name is required
                  </div>
                )}
                {errors.name && touched.name ? (
                  <span className="error text-danger">{errors.name}</span>
                ) : null}
              </div>
            </div>
            <div className="footer">
              <span>
                <button
                  type="button"
                  className="btn btn-danger me-3"
                  onClick={() => {
                    handleClose1();
                  }}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-success">
                  Edit Branch
                </button>
              </span>
            </div>
          </form>
        </Modal>
      </div>
      {/* Diplay Role */}
      <TableContainer
        component={Paper}
        className="mt-4 m-auto"
        style={{ width: "80%" }}
      >
        <h2
          className="text-center mt-5 mb-3 fw-bolder"
          style={{ color: "#1976D2" }}
        >
          View All Branch
        </h2>

        {data != null ?
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="fw-bold">Id</TableCell>
                <TableCell align="left" className="fw-bold">
                  Role Name
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
                  <TableCell align="left" style={{ color: "blue" }}>
                    <EditIcon onClick={() => editbranch(item)} />
                  </TableCell>
                  <TableCell align="left" style={{ color: "red" }}>
                    <DeleteIcon
                      onClick={() => {
                        handledeletebranch(item._id);
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
      <ToastContainer />
    </>
  );
};

export default Branch;
