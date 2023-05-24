import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
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
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { useEffect } from 'react';
import { apiRequest, axiosInstance } from '../services/core/axios';
import { toast } from 'react-toastify';
import { useStateContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'mobile_number', label: 'Contact', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'address', label: 'Address', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
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

export default function UserPage() {
    const { token, user } = useStateContext();
    const navigate = useNavigate();
    if (user.role !== 'admin') {
        navigate('/404');
    }
    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
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

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
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

    const filteredUsers = applySortFilter(
        USERLIST,
        getComparator(order, orderBy),
        filterName
    );

    const isNotFound = !filteredUsers.length && !!filterName;

    const [openModal, setOpenModal] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleOpenAdd = () => setOpenModalAdd(true);
    const handleClose = () => setOpenModal(false);
    const handleCloseAdd = () => setOpenModalAdd(false);

    const [cOpen, setCOpen] = React.useState(false);

    const [manageuser, setManageuser] = useState([]);
    const [rows, setRows] = useState([]);
    const initialFormValues = {
        name: '',
        email: '',
        mobile_number: '',
        address: '',
        password: '',
        id: '',
        role: '',
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
        await apiRequest(() =>
            axiosInstance.post(`/user/register`, formValues)
        ).then((res) => {
            if (res.success) {
                toast.success(res.message);
                getAllData();
                handleCloseAdd();
            } else {
                toast.error(res.message);
                console.log(res);
                handleCloseAdd();
            }
        });
    };

    /////////////////////////////////

    ///////////////////////////////////
    //   const handleEdit = (id) => {
    //     console.log(open.id);
    //     // const selectedRow = manageproducts.find((row) => row.id === open.id);
    //     // setFormValues(manageproducts.find((row) => row.id === open.id));
    //     setOpenModal(true);
    //   };

    const handleEdit = (_id) => {
        const selectedUser = manageuser.find((user) => user._id === _id);
        setFormValues(selectedUser);
        setOpenModal(true);
    };

    const handleSubmitedit = async (event) => {
        event.preventDefault();
        await apiRequest(() =>
            axiosInstance.patch(`/user/${formValues._id}`, formValues)
        ).then((res) => {
            if (res.success) {
                toast.success(res.message);
                getAllData();
                setOpenModal(false);
                setFormValues(initialFormValues);
                setOpen(null);
            } else {
                toast.error(res.message);
                console.log(res);
            }
        });
    };

    const getAllData = async () => {
        console.log();
        await apiRequest(() => axiosInstance.get(`/user/`)).then((res) => {
            if (res.success) {
                console.log(res);
                setManageuser(res.data);
            } else {
                toast.error(res.message);
                console.log(res);
            }
        });
    };

    useEffect(() => {
        getAllData();
    }, []);
    return (
        <>
            <Helmet>
                <title> User | E-Commerce App </title>
            </Helmet>

            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Typography variant="h4" gutterBottom>
                        User
                    </Typography>
                    <Button
                        onClick={handleOpenAdd}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        New User
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
                                sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                                id="name"
                                label="Name"
                                variant="outlined"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                            <TextField
                                sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                                id="email"
                                label="Email"
                                variant="outlined"
                                value={formValues.email}
                                onChange={handleInputChange}
                            />

                            <TextField
                                sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                                id="mobile_number"
                                label="Contact Number"
                                variant="outlined"
                                value={formValues.mobile_number}
                                onChange={handleInputChange}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="role"
                                label="Role"
                                name="role"
                                value={formValues.role}
                                onChange={handleSelectChange}
                                autoComplete="role"
                                autoFocus
                                select
                            >
                                {/* Add options to the Select component using MenuItem */}
                                <MenuItem value="buyer">Buyer</MenuItem>
                                <MenuItem value="seller">Seller</MenuItem>
                            </TextField>

                            <TextField
                                sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                                id="address"
                                label="Address"
                                variant="outlined"
                                value={formValues.address}
                                onChange={handleInputChange}
                            />
                            <TextField
                                sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                                id="password"
                                label="Password"
                                variant="outlined"
                                value={formValues.password}
                                onChange={handleInputChange}
                            />
                            <Button type="submit" color="inherit" variant="outlined">
                                Submit
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
                                    {manageuser.map((row) => {
                                        const {
                                            _id,
                                            name,
                                            email,
                                            address,
                                            mobile_number,
                                            role,
                                            password,
                                        } = row;

                                        const selectedUser = selected.indexOf(name) !== -1;

                                        return (
                                            <React.Fragment key={_id}>
                                                <TableRow
                                                    hover
                                                    key={_id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={selectedUser}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={selectedUser}
                                                            onChange={(event) => handleClick(event, name)}
                                                        />
                                                    </TableCell>

                                                    <TableCell align="left">{name}</TableCell>
                                                    <TableCell align="left">{mobile_number}</TableCell>
                                                    <TableCell align="left">{email}</TableCell>
                                                    <TableCell align="left">{address}</TableCell>
                                                    <TableCell align="left">{role}</TableCell>

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
                                                    <MenuItem>
                                                        <Iconify
                                                            icon={'eva:edit-fill'}
                                                            sx={{ mr: 2 }}
                                                            onClick={() => handleEdit(_id)}
                                                            id={_id}
                                                        />
                                                        Edit
                                                    </MenuItem>
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

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <Paper
                                                    sx={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography variant="h6" paragraph>
                                                        Not found
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No results found for &nbsp;
                                                        <strong>&quot;{filterName}&quot;</strong>.
                                                        <br /> Try checking for typos or using complete
                                                        words.
                                                    </Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
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
                            label="Name"
                            variant="outlined"
                            onChange={handleInputChange}
                        />

                        <TextField
                            sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                            id="email"
                            value={formValues.email}
                            label="Email"
                            variant="outlined"
                            onChange={handleInputChange}
                        />

                        <TextField
                            sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                            id="mobile_number"
                            value={formValues.mobile_number}
                            label="Contact Number"
                            variant="outlined"
                            onChange={handleInputChange}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="role"
                            label="Role"
                            name="role"
                            value={formValues.role}
                            onChange={handleSelectChange}
                            autoComplete="address"
                            autoFocus
                            select
                        >
                            {/* Add options to the Select component using MenuItem */}
                            <MenuItem value="buyer">Buyer</MenuItem>
                            <MenuItem value="seller">Seller</MenuItem>
                        </TextField>

                        <TextField
                            sx={{ mt: 2, width: '100%', marginBottom: '10px' }}
                            id="address"
                            value={formValues.address}
                            label="Address"
                            variant="outlined"
                            onChange={handleInputChange}
                        />

                        <Button type="submit" color="inherit" variant="outlined">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
}