import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import Iconify from '../../../components/iconify';
import { useStateContext } from '../../../context/ContextProvider';
import { apiRequest, axiosInstance } from '../../../services/core/axios';
import { toast } from 'react-toastify';


const AddProduct = ({getAllData}) => {

  const { user } = useStateContext()
  
    const initialFormValues = {
      name: '',
      catagory: '',
      price: '',
      description: '',
      id: null,
      image: '',
      status: '',
      seller_id: user._id
  };


  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleOpenAdd = () => { 
    console.log('open add');
    setOpenModalAdd(true); 
    setFormValues(initialFormValues) }
  const handleCloseAdd = () => setOpenModalAdd(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const handleInputChange = (event) => {
  const { id, value } = event.target;
  setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [id]: value,
  }));
};
const handleSelectChange = (event) => {
  const { name, value } = event.target;
  setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
  }));
};

const handleSubmit = async (event) => {
  event.preventDefault();
  await apiRequest(() => axiosInstance.post(`/item`, formValues)).then((res) => {
      if (res.success) {
          toast.success(res.message);
          getAllData()
          handleCloseAdd();
      } else {
          toast.error(res.message);
          console.log(res);
          handleCloseAdd();
      }
  })

};


  return (
    <>
   

                <Button
                      onClick={handleOpenAdd}
                      variant="contained"
                      startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                      New Products
                  </Button>
       <Modal
                    open={openModalAdd}
                    onClose={handleCloseAdd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Add Details
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="image"
                                name="image"
                                label="Image Url"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formValues.image}
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="catagory"
                                name="catagory"
                                label="Category"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formValues.catagory}
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="price"
                                name="price"
                                label="Price"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formValues.price}
                                onChange={handleInputChange}
                            />
                            <TextField
                                id="description"
                                name="description"
                                label="Description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formValues.description}
                                onChange={handleInputChange}
                            />
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="status">Status</InputLabel>
                                    <Select
                                        labelId="status"
                                        id="status"
                                        name='status'
                                        value={formValues.status}
                                        label="Age"
                                        onChange={handleSelectChange}
                                    >
                                        <MenuItem value={'active'}>active</MenuItem>
                                        <MenuItem value={'inactive'}>inactive</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                                Add Product
                            </Button>
                        </form>
                    </Box>
                </Modal>
                </>
  );
};

export default AddProduct;
