import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import Iconify from '../../../components/iconify';

import { apiRequest, axiosInstance } from '../../../services/core/axios';
import { useStateContext } from '../../../context/ContextProvider';
import { toast } from 'react-toastify';

const EditProduct = ({ getAllData, id, formValues, setFormValues }) => {

  const { user } = useStateContext()


  const initialFormValues = {
    name: '',
    category: '',
    category_id:'',
    price: '',
    description: '',
    id: null,
    image: '',
    status: '',
    seller_id: user._id
};

  const [open, setOpen] = useState(null);

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [categories, setCategories] = useState([]);

 
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    await apiRequest(() => axiosInstance.get(`/category/active/seller/${user._id}`)).then((res) => {
        if (res.success) {
          
            setCategories(res.data);
        } else {
            toast.error(res.message);
            console.log(res);
        }
    });
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

    // Check if the selected value is in the categories list
    const isValid = categories.some(category => category._id === value);
    if (!isValid) {
        toast.error('Selected category is not valid, please choose a valid category.');
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            [name]: '' // Resetting to default or you could choose the first category._id
        }));
    } else {
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            [name]: value
        }));
    }
};


  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    await apiRequest(() => axiosInstance.patch(`/item/${formValues._id}`, formValues)).then((res) => {
        if (res.success) {
            toast.success(res.message);
            getAllData()
            setOpenModal(false);
            setFormValues(initialFormValues);
            setOpen(null)
        } else {
            toast.error(res.message);
            console.log(res);
        }
    })
};

const handleEdit = (id) => {  
    console.log(id)
  setOpenModal(true);
  
};


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


 
  return (
   <>
   <MenuItem onClick={() => handleEdit(id)}>
        <Iconify
            icon={'eva:edit-fill'}
            sx={{ mr: 2 }}
        />
        Edit
        
    </MenuItem>
    <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Edit Details
                    </Typography>
                    <form onSubmit={handleSubmitEdit}>
                        <TextField
                            sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                            id="name"
                            value={formValues.name}
                            label="Product Name"
                            variant="outlined"
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

                    <FormControl fullWidth margin="normal">
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                name="category"
                                value={formValues.category_id}
                                label="Category"
                                onChange={handleSelectChange}
                            >
                                {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>{category.category}</MenuItem>

                                ))}
                            </Select>
                            </FormControl>

                        <TextField
                            sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                            id="price"
                            value={formValues.price}
                            label="Price"
                            variant="outlined"
                            onChange={handleInputChange}
                        />

                        <TextField
                            sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                            id="description"
                            value={formValues.description}
                            label="Description"
                            variant="outlined"
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

                        <Button type="submit" variant="contained" style={{ marginTop: "15px" }}>
                            Edit
                        </Button>
                    </form>
                </Box>
            </Modal>
   </>
  );
};

export default EditProduct;
