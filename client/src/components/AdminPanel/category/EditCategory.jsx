import React, { useState } from 'react';
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
    await apiRequest(() => axiosInstance.patch(`/category/${formValues._id}`, formValues)).then((res) => {
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
                            id="icon"
                            value={formValues.icon}
                            label="Icon"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                       

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
