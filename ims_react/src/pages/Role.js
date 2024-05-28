import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TableCell,
  Paper,
  TableHead,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  styled,
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
  TextField,
} from "@mui/material";
import { ErrorMessage } from 'formik';
import Swal from 'sweetalert2'
import { IoMdAdd } from "react-icons/io";
import CloseIcon from "@mui/icons-material/Close";
import { FaEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from "formik";
import * as Yup from "yup";
import DialogContent from "@mui/material/DialogContent";
import "../style/role.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Role = () => {
  const [data, setData] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [nameFilter, setNameFilter] = useState("");

  const [edit, setEdit] = useState({
    id: "",
    name: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    values.name = "";
  };
  const handleClose = () => {
    setOpen(false);
    setEdit({});
    setNameError(false);
  };

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
    setEdit({});
    setNameError(false);
  };

  const addrole = async (values, resetForm) => {
    if (values.name != "") {
      try {
        console.log("login", sessionStorage.getItem("login"));
        const response = await axios.post(
          "http://localhost:3000/role/role",
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
        getrole();
        handleClose();
        resetForm();
      } catch (error) {
        toast.error("Failed to Add Role", {
          position: "top-right",
          autoClose: 500,
        });
      }
    } else {
      setNameError(true);
    }
  };

  const getrole = async () => {
    try {
      const response = await axios.get("http://localhost:3000/role/view_role", {
        headers: {
          Authorization: `${sessionStorage.getItem("login")}`,
        },
      });
      setData(response.data.data);
      // toast.success(response.data.status, { position: "top-right", autoClose: 500 });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.status || "Failed to view all Role", {
        position: "top-right",
        autoClose: 500,
      });
    }
  };

  const handledeleterole = (id) => {
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
            `http://localhost:3000/role/role_delete/${id}`,
            {
              headers: {
                Authorization: `${sessionStorage.getItem("login")}`,
              },
            }
          );

          if (response.status === 200) {
            Swal.fire("Deleted!", "Your role has been deleted.", "success");
            getrole();
          } else {
            toast.error("Something went wrong.", {
              position: "top-right",
              autoClose: 500,
            });
          }
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


  const editrole = (item) => {
    debugger;
    console.log("item", item);
    setEdit({
      id: item._id,
      name: item.name,
    });
    handleOpen1();
  };
  console.log("edit", edit);

  const handleeditrole = async (id, update) => {
    debugger;
    if (update != "") {
      const data = {
        name: update,
      };
      try {
        const response = await axios.post(
          `http://localhost:3000/role/role_update/${id}`,
          data,
          {
            headers: {
              Authorization: `${sessionStorage.getItem("login")}`,
            },
          }
        );
        console.log(response);
        getrole();
        toast.success(response.data.status, {
          position: "top-right",
          autoClose: 500,
        });
        handleClose1();
        setEdit({});
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.response.data.status || "Failed to Update Role", {
          position: "top-right",
          autoClose: 500,
        });
      }
    } else {
      setNameError(true);
    }
  };

  const init = {
    name: "",
  };

  const validateSchema = Yup.object({
    name: Yup.string().required("Enter Role Name"),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: init,
      // validationSchema: validateSchema,
      defaultValue: edit,
      onSubmit: (values, { resetForm }) => {
        debugger;
        // if (Object.keys(edit).length !== 0) {
        //     handleeditrole(edit._id, edit.name)
        // }
        if (edit.id) {
          handleeditrole(edit.id, edit.name);
        } else {
          addrole(values, resetForm);
        }
      },
    });

  const filterData = async () => {
    try {
      let url = `http://localhost:3000/role/find_role?name=${nameFilter}`;
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

  const isFieldTouched = (fieldName) => {
    return Object.prototype.hasOwnProperty.call(values, fieldName);
  };


  useEffect(() => {
    if (nameFilter !== "") { filterData(); }
    else { getrole() }
  }, [nameFilter]);

  useEffect(() => {
    console.log("----------", edit);
    getrole();
  }, [edit]);

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
        <TextField id="outlined-basic" label="Search" variant="outlined" value={nameFilter} size="small"
          onChange={(e) => {
            setNameFilter(e.target.value);
            filterData(e.target.value);
          }}
          />
      </Box> */}

      <div className="heading d-flex justify-content-between align-items-center">
        <h2>Role</h2>
        <Button
          type="submit"
          onClick={handleOpen}
          color="secondary"
          variant="contained"
        >
          <IoMdAdd style={{ marginRight: "3px" }} />
          Add Role
        </Button>
      </div>

      <div>
        {/* <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle
            sx={{ m: 0, p: 2, bgcolor: "#1976D2", color: "white" }}
            id="customized-dialog-title"
          >
            Add Role
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
            style={{ backgroundColor: "white", color: "black" }}
          >
            <CloseIcon />
          </IconButton>

          <form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <TextField
                fullWidth
                label="Size"
                id="outlined-size-small"
                size="small"
                defaultValue={edit.name ? edit.name : ""}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                error={errors.name ? true : false}
                helperText={errors.name || edit.name ? "role name is required field" : ""}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" variant="contained" >
                Save
              </Button>
            </DialogActions>
          </form>
        </BootstrapDialog> */}

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
                <h1>Add Role</h1>
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
                  <label className="fw-bold">Role Name</label>
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
                      Role Name is required
                    </div>
                  )}
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
                <h1>Edit Role</h1>
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
                  <label className="fw-bold">Role Name</label>
                  <input
                    type="name"
                    name="name"
                    value={edit.name}
                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                    onBlur={handleBlur}
                    className="form-control"
                    placeholder="Enter Role name"
                  />
                  {nameError && (
                    <div className="error text-danger">
                      Role Name is required
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
                    Edit Role
                  </button>
                </span>
              </div>
            </form>
          </Modal>
        </div>
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
          View All Role
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
              {

                data.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="left" style={{ color: "blue" }}>
                      <EditIcon onClick={() => editrole(item)} />
                    </TableCell>
                    <TableCell align="left" style={{ color: "red" }}>
                      <DeleteIcon
                        onClick={() => {
                          handledeleterole(item._id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )
                )

              }
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

export default Role;
