import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useEffect, useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
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
import USERLIST from '../_mock/order';
import { apiRequest, axiosInstance } from '../services/core/axios';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'buyer_id', label: 'Buyer', alignRight: false },
    { id: 'total', label: 'Total', alignRight: false },
    { id: 'seller_profit', label: 'Seller Profit', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
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

export default function OrderPage() {
    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [formValues, setFormValues] = useState({});
    const [aid, setAid] = useState({});
    const [items, setItems] = useState([]);
    const handleOpenMenu = (event, row, it) => {
        setOpen(event.currentTarget);
        console.log(row);
        setAid(row);
        setItems(it);
    };

    const updatedata = async () => {
        console.log(open);
        await apiRequest(() => axiosInstance.patch(`/order/${aid._id}`, formValues)).then((res) => {
            if (res.success) {
                console.log(res);
                toast.success(res.message);
                getdata();
                handleClose();
            } else {
                toast.error(res.message);
                console.log(res);
            }
        })
    }

    const getonedata = async () => {
        console.log(open);
        await apiRequest(() => axiosInstance.get(`/order/${aid}`, formValues)).then((res) => {
            if (res.success) {
                console.log(res);
                toast.success(res.message);
                getdata();
                handleClose();
            } else {
                toast.error(res.message);
                console.log(res);
            }
        })
    }

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
    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
        }));
    };

    const isNotFound = !filteredUsers.length && !!filterName;

    const [openModal, setOpenModal] = React.useState(false);
    const [data, setData] = React.useState([]);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);



    const getdata = async () => {
        await apiRequest(() => axiosInstance.get(`/order`)).then((res) => {
            if (res.success) {
                console.log(res);
                setData(res.data)
            } else {

                toast.error(res.message);
                console.log(res);
            }
        })

    };

    useEffect(() => {
        getdata();
    }, []);

    return (
        <>
            <Helmet>
                <title> Orders | E-Commerce App </title>
            </Helmet>

            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={5}
                >
                    <Typography variant="h4" gutterBottom>
                        Orders
                    </Typography>
                </Stack>

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
                                    {data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const {
                                                _id,
                                                buyer_id,
                                                total,
                                                seller_profit,
                                                status,
                                                items
                                            } = row;
                                            const selectedUser = selected.indexOf(buyer_id) !== -1;

                                            return (
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
                                                            onChange={(event) => handleClick(event)}
                                                        />
                                                    </TableCell>

                                                    <TableCell align="left">{buyer_id}</TableCell>


                                                    <TableCell align="left">{`${total}`}.00</TableCell>


                                                    <TableCell align="left">{seller_profit}.00</TableCell>

                                                    <TableCell align="left">
                                                        <Label
                                                            color={
                                                                (status === 'Completed' && 'success') || 'error'
                                                            }
                                                        >
                                                            {sentenceCase(status)}
                                                        </Label>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        <IconButton
                                                            size="large"
                                                            color="inherit"
                                                            onClick={(e) => handleOpenMenu(e, row, items)}
                                                        >
                                                            <Iconify icon={'eva:more-vertical-fill'} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
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

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
                <MenuItem onClick={handleOpen}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>

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

                    <Box sx={{ minWidth: 120 }}>

                        {
                            items.map((item) => {

                                return (
                                    <div className="cart-list product d_flex" >
                                        <div className="img">
                                            <img src={item[0]?.image} alt="" width={80} />
                                        </div>
                                        <div className="cart-details">
                                            <h3>{item[0]?.name}</h3>
                                            <h4>
                                                ${item[0]?.price}.00 * {item[0]?.qty}
                                            </h4>
                                        </div>

                                        <div className="cart-item-price"></div>
                                    </div>
                                );
                            })
                        }

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label><strong>Total :</strong> {aid.total}</label>
                            <label><strong>commission :</strong> {aid.commission}</label>
                            <label><strong>Seller Profit :</strong> {aid.seller_profit}</label>
                            <label><strong>Current status :</strong> {aid.status}</label>
                            <label><strong>Created at :</strong> {aid.created_at}</label>
                        </div>

                        <FormControl fullWidth>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                                labelId="status"
                                id="status"
                                name='status'
                                value={formValues.status || ''}
                                label="Age"
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={'Pending'}>Pending</MenuItem>
                                <MenuItem value={'Accept'}>Accept</MenuItem>
                                <MenuItem value={'Reject'}>Reject</MenuItem>
                                <MenuItem value={'Cancel'}>Cancel</MenuItem>
                                <MenuItem value={'Delivered'}>Delivered</MenuItem>
                                <MenuItem value={'Completed'}>Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Button variant="contained" style={{ marginTop: "15px" }} onClick={updatedata}>
                        Save
                    </Button>
                </Box>

            </Modal>
        </>
    );
}
