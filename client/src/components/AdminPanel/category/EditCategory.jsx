import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import Iconify from '../../../components/iconify';

import { apiRequest, axiosInstance } from '../../../services/core/axios';
import { useStateContext } from '../../../context/ContextProvider';
import { toast } from 'react-toastify';

const EditCategory = ({ getAllData, id, formValues, setFormValues }) => {

  const { user } = useStateContext()


  const initialFormValues = {
    icon: '',
    category: '',
    id: null,
    status:'',
    seller_id: user._id
};

  const [open, setOpen] = useState(null);

  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [file, setFile] = useState(null); 

  const [preview, setPreview] = useState('');  // State for the preview image

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));  // Set the preview URL
    }
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

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    let finalIconName = formValues.icon; // Start with the existing icon name

    if (file) {
        // There's a new file, prepare FormData for upload
        const formData = new FormData();
        const filename = Date.now() + file.name;
        formData.append("name", filename);
        formData.append("file", file);

        try {
            // Upload the new icon
            const uploadResponse = await axiosInstance.post(`/category/upload/icons`, formData);
            if (uploadResponse.status === 200) {
                finalIconName = filename; // Update icon name if upload is successful
            } else {
                throw new Error('Failed to upload icon');
            }
        } catch (err) {
            toast.error('Failed to upload file.');
            console.error(err);
            return; // Exit if the upload fails
        }
    }

    // Prepare the final form data for updating the category
    const submitForm = {
        ...formValues,
        icon: finalIconName
    };

    try {
        // Send the updated category data to the server
        const categoryResponse = await axiosInstance.patch(`/category/${formValues._id}`, submitForm);
        if (categoryResponse.status === 200) {
            toast.success(categoryResponse.data.message);
            getAllData();
            handleClose(); // Close the modal
        } else {
            toast.error(categoryResponse.data.message);
        }
    } catch (err) {
        toast.error('Failed to update category.');
        console.error(err);
    }
};


  // Effect to load current icon for preview when the modal is opened
  useEffect(() => {
    if (formValues.icon && !file) {
      const iconUrl = process.env.REACT_APP_BACKEND_URL + '/icon/' + formValues.icon;
      setPreview(iconUrl);
    }
  }, [formValues.icon, file]);

const handleEdit = (id) => {  
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
                    <Box sx={{ mt: 2, width: '100%', marginBottom: '10px' }}>
              {/* Show the preview of the image */}
              {preview && (
                <img className='img-fluid rounded' src={preview} alt="Category" style={{ width: 100, height: 100 }} />
              )}

              {/* File input for the icon */}
              <TextField
                type="file"
                id="icon"
                label="Icon"
                variant="outlined"
                onChange={handleFileChange}
                inputProps={{ accept: "image/*" }}
                fullWidth
                sx={{ mt: 2 }}  // Add margin top
              />
             
            </Box>
                       
                       

                        <TextField
                            sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                            id="category"
                            value={formValues.category}
                            label="Category"
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

export default EditCategory;
