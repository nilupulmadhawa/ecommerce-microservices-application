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
  await apiRequest(() => axiosInstance.post(`/category`, formValues)).then((res) => {
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
                            <TextField
                                id="icon"
                                name="icon"
                                label="Icon"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formValues.icon}
                                onChange={handleInputChange}
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
