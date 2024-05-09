import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import Iconify from '../../../components/iconify';
import { useStateContext } from '../../../context/ContextProvider';
import { apiRequest, axiosInstance } from '../../../services/core/axios';
import { toast } from 'react-toastify';


const AddProduct = ({ getAllData }) => {

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

    const { user } = useStateContext()

    const initialFormValues = {
        name: '',
        category: '',
        price: '',
        description: '',
        id: null,
        image: '',
        status: '',
        seller_id: user._id
    };


    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [categories, setCategories] = useState([]);

    const [file, setFile] = useState()

    
const handleFileChange = (event) => {
    setFile(event.target.files[0]);
};


    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        await apiRequest(() => axiosInstance.get(`/category/active/seller/${user._id}`)).then((res) => {
            if (res.success) {
                // console.log(res.data);
                setCategories(res.data);
            } else {
                toast.error(res.message);
                console.log(res);
            }
        });
    };

    const handleOpenAdd = () => {
        console.log('open add');
        setOpenModalAdd(true);
        setFormValues(initialFormValues);
        fetchCategories();
    };

    const handleCloseAdd = () => setOpenModalAdd(false);
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormValues(prevFormValues => ({ ...prevFormValues, [id]: value }));
    };

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            
            try {
                const uploadResponse = await axiosInstance.post(`/item/upload/images`, data);
                console.log(uploadResponse)
                if (uploadResponse.status === 200) {
                    const submitForm = { ...formValues, Image: filename };
                    console.log(submitForm)
                    const productResponse = await axiosInstance.post(`/item`, submitForm);
                    if (productResponse.status === 200) {
                        toast.success(productResponse.data.message);
                        getAllData()
                        handleCloseAdd();

                    } else {
                        toast.error(productResponse.data.message);
                    }
                } else {
                    throw new Error('Failed to upload Image');
                }
            } catch (err) {
                toast.error('Failed to upload file.');
                console.error(err);
            }
        }

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

                    <form onSubmit={handleSubmit} enctype="multipart/form-data">
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
                            type='file'
                            inputProps={{ accept: "image/*" }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formValues.image}
                            onChange={handleFileChange}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                name="category"
                                value={formValues.category}
                                label="Category"
                                onChange={handleSelectChange}
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>{category.category}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

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
