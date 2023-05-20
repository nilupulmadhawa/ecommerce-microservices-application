import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2'

// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
    TextField,
    Select,
    InputLabel,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/manageproducts';
import { apiRequest, axiosInstance } from '../services/core/axios';
import { toast } from 'react-toastify';
import { useStateContext } from '../context/ContextProvider';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    // { id: 'image', label: 'Image', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'catagory', label: 'Catagory', alignRight: false },
    { id: 'price', label: 'Price', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    { id: 'status', label: 'Status', alignRight: true },
    { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(
            array,
            (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

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

export default function ProductManage() {
    const { user } = useStateContext()
    const [open, setOpen] = useState(null);
    const [cOpen, setCOpen] = React.useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenMenu = (event, r) => {
        setOpen(event.currentTarget);
        setFormValues(r)
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    // const manageproducts = applySortFilter(
    //   USERLIST,
    //   getComparator(order, orderBy),
    //   filterName
    // );

    // const isNotFound = !manageproducts.length && !!filterName;

    const [openModal, setOpenModal] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const handleOpenAdd = () => { setOpenModalAdd(true); setFormValues(initialFormValues) }
    const handleCloseAdd = () => setOpenModalAdd(false);

    const [manageproducts, setManageproducts] = useState([]);
    const [rows, setRows] = useState([]);
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
    const [formValues, setFormValues] = useState(initialFormValues);

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

    /////////////////////////////////

    const [deleteId, setDeleteId] = useState(null)
    const handleDelete = (id) => {
        console.log(id);
        setDeleteId(id)
        setCOpen(true);
    };

    const handleSubmitedelete = async () => {
        await apiRequest(() => axiosInstance.delete(`/item/${deleteId}`,)).then((res) => {
            if (res.success) {
                toast.success(res.message);
                getAllData()
                setCOpen(false);
            } else {
                toast.error(res.message);
                console.log(res);
            }
        })
    }

    ///////////////////////////////////
    const handleEdit = (id) => {
        // console.log(open.id);
        // const selectedRow = manageproducts.find((row) => row.id === open.id);
        // setFormValues(manageproducts.find((row) => row.id === open.id));
        setOpenModal(true);
    };




    const handleSubmitedit = async (event) => {
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



    const getAllData = async () => {
        console.log(user._id);
        await apiRequest(() => axiosInstance.get(`/item/seller/${user._id}`)).then((res) => {
            if (res.success) {
                console.log(res);
                setManageproducts(res.data)
            } else {

                toast.error(res.message);
                console.log(res);
            }
        })

    };


    useEffect(() => {
        getAllData();
    }, []);

    return (
        <>
            <Helmet>
                <title> Products Manage | E-Commerce App </title>
            </Helmet>

            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Typography variant="h4" gutterBottom>
                        Manage Products
                    </Typography>
                    <Button
                        onClick={handleOpenAdd}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        New Products
                    </Button>
                </Stack>

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

                <Card>
                    <UserListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={USERLIST.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {manageproducts &&
                                        manageproducts.length > 0 &&
                                        manageproducts
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row) => {
                                                const {
                                                    _id,
                                                    name,
                                                    catagory,
                                                    price,
                                                    description,
                                                    status,
                                                } = row;

                                                const selectedUser = selected.indexOf(name) !== -1;

                                                return (
                                                    <React.Fragment key={_id}>
                                                        <TableRow
                                                            hover
                                                            tabIndex={-1}
                                                            role="checkbox"
                                                            selected={selectedUser}
                                                        >
                                                            <TableCell align="left"></TableCell>
                                                            <TableCell align="left">{name}</TableCell>
                                                            <TableCell align="left">{catagory}</TableCell>
                                                            <TableCell align="left">{price}</TableCell>
                                                            <TableCell align="left">{description}</TableCell>
                                                            <TableCell align="left">
                                                                <Label
                                                                    color={
                                                                        (status === 'inactive' && 'error') ||
                                                                        'success'
                                                                    }
                                                                >
                                                                    {sentenceCase(status)}
                                                                </Label>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <IconButton
                                                                    size="large"
                                                                    color="inherit"
                                                                    onClick={(e) => handleOpenMenu(e, row)}
                                                                    id={_id}
                                                                >
                                                                    <Iconify icon={'eva:more-vertical-fill'} />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>

                                                        <Popover
                                                            open={Boolean(open)}
                                                            anchorEl={open}
                                                            onClose={handleCloseMenu}
                                                            anchorOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            }}
                                                            transformOrigin={{
                                                                vertical: 'top',
                                                                horizontal: 'right',
                                                            }}
                                                            PaperProps={{
                                                                sx: {
                                                                    p: 1,
                                                                    width: 140,
                                                                    '& .MuiMenuItem-root': {
                                                                        px: 1,
                                                                        typography: 'body2',
                                                                        borderRadius: 0.75,
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem onClick={() => handleEdit(_id)}>
                                                                <Iconify
                                                                    icon={'eva:edit-fill'}
                                                                    sx={{ mr: 2 }}
                                                                />
                                                                Edit
                                                            </MenuItem>
                                                            {/* <MenuItem
                                                                sx={{ color: 'error.main' }}
                                                                onClick={() => handleDelete(_id)}
                                                            >
                                                                <Iconify
                                                                    icon={'eva:trash-2-outline'}
                                                                    sx={{ mr: 2 }}
                                                                />
                                                                Delete
                                                            </MenuItem> */}
                                                        </Popover>
                                                    </React.Fragment>
                                                );
                                            })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={USERLIST.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>

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
                    <form onSubmit={handleSubmitedit}>
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

                        <TextField
                            sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                            id="catagory"
                            value={formValues.catagory}
                            label="Category"
                            variant="outlined"
                            onChange={handleInputChange}
                        />

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
                            Save
                        </Button>
                    </form>
                </Box>
            </Modal>
            <Dialog
                open={cOpen}
                onClose={() => setCOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this product?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Can not be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCOpen(false)}>Disagree</Button>
                    <Button onClick={handleSubmitedelete} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
