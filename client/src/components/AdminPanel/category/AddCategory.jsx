import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import Iconify from '../../../components/iconify';
import { useStateContext } from '../../../context/ContextProvider';
import { apiRequest, axiosInstance } from '../../../services/core/axios';
import { toast } from 'react-toastify';


const AddCategory = ({getAllData}) => {

  const { user } = useStateContext()
  
    const initialFormValues = {
      icon: '',
      id: null,
      category: '',
      status:'',
      seller_id: user._id
  };


  const [openModalAdd, setOpenModalAdd] = React.useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  const [file, setFile] = useState(null);

  

const handleFileChange = (event) => {
    setFile(event.target.files[0]);
};

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
    if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);

        try {
            const uploadResponse = await axiosInstance.post(`/category/upload/icons`, data);
            console.log(uploadResponse)
            if (uploadResponse.status === 200) {
                
                const submitForm = { ...formValues, icon: filename };
                console.log(submitForm)
                const categoryResponse = await axiosInstance.post(`/category`, submitForm);
                if (categoryResponse.status === 200) {
                    toast.success(categoryResponse.data.message);
                    getAllData();
                    handleCloseAdd();
                } else {
                    toast.error(categoryResponse.data.message);
                }
            } else {
                throw new Error('Failed to upload icon');
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
                      New Category
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
                        {/* resize image*/}
                        <Box sx={{ display: 'flex', justifyContent: 'center', width:'50px' }}>


                        {file && (
                            <img className='img-fluid rounded' src={URL.createObjectURL(file)} alt="" /> 
                            )} 
                            </Box>
                        <TextField
                            type="file"
                            id="icon"
                            name="icon"
                            variant="outlined"
                            margin="normal"
                            onChange={handleFileChange}
                            inputProps={{ accept: "image/*" }}
                            fullWidth
                        />
                            
                            <TextField
                                id="category"
                                name="category"
                                label="Category"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formValues.category}
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
                                Add Category
                            </Button>
                        </form>
                    </Box>
                </Modal>
                </>
  );
};

export default AddCategory;
