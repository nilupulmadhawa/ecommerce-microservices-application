import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import manageproducts from '../_mock/manageproducts';

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
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/manageproducts';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    // { id: 'imageUrl', label: 'Image', alignRight: false },
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

    // const handleClick = (event, name) => {
    //   const selectedIndex = selected.indexOf(name);
    //   let newSelected = [];
    //   if (selectedIndex === -1) {
    //     newSelected = newSelected.concat(selected, name);
    //   } else if (selectedIndex === 0) {
    //     newSelected = newSelected.concat(selected.slice(1));
    //   } else if (selectedIndex === selected.length - 1) {
    //     newSelected = newSelected.concat(selected.slice(0, -1));
    //   } else if (selectedIndex > 0) {
    //     newSelected = newSelected.concat(
    //       selected.slice(0, selectedIndex),
    //       selected.slice(selectedIndex + 1)
    //     );
    //   }
    //   setSelected(newSelected);
    // };

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

    const handleOpenAdd = () => setOpenModalAdd(true);
    const handleCloseAdd = () => setOpenModalAdd(false);

    const [manageproducts, setManageproducts] = useState([
        {
            category: "Herbs And Homeopathy",
            description: "Only Natural’s For Women Only is a once-daily multivitamin that may provide nutritional support for hair‚ skin‚ nails‚ energy‚ digestion‚ hormonal balance and breast and bone health necessary for an active lifestyle.",
            id: "1",
            imageUrl: "./images/flash/10.jpg",
            name: "Only Naturals for Women",
            price: "180",
            quantity: "50",
            status: "active",
        }, {
            category: "Herbs And Homeopathy",
            description: "Only Natural’s For Women Only is a once-daily multivitamin that may provide nutritional support for hair‚ skin‚ nails‚ energy‚ digestion‚ hormonal balance and breast and bone health necessary for an active lifestyle.",
            id: "2",
            imageUrl: "./images/flash/ne2.jpg",
            name: "Zimacal with Magneseium",
            price: "120",
            quantity: "50",
            status: "active",
        },
        {
            category: "Herbs And Homeopathy",
            description: "Only Natural’s For Women Only is a once-daily multivitamin that may provide nutritional support for hair‚ skin‚ nails‚ energy‚ digestion‚ hormonal balance and breast and bone health necessary for an active lifestyle.",
            id: "3",
            imageUrl: "./images/flash/ne3.jpg",
            name: "Opokan Cream",
            price: "20",
            quantity: "50",
            status: "active",
        }, {
            category: "Herbs And Homeopathy",
            description: "Only Natural’s For Women Only is a once-daily multivitamin that may provide nutritional support for hair‚ skin‚ nails‚ energy‚ digestion‚ hormonal balance and breast and bone health necessary for an active lifestyle.",
            id: "4",
            imageUrl: "./images/flash/ne4.jpg",
            name: "Travisto Active",
            price: "150",
            quantity: "50",
            status: "active",
        }, {
            category: "Herbs And Homeopathy",
            description: "Only Natural’s For Women Only is a once-daily multivitamin that may provide nutritional support for hair‚ skin‚ nails‚ energy‚ digestion‚ hormonal balance and breast and bone health necessary for an active lifestyle.",
            id: "",
            imageUrl: "./images/flash/ne5.jpg",
            name: "Jointcare Max",
            price: "80",
            quantity: "50",
            status: "active",
        }
    ]);
    const [rows, setRows] = useState([]);

    const [formValues, setFormValues] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newProduct = {
            ...formValues,
            id: (manageproducts.length + 1).toString(),
            imageUrl: '11',
            status: 'active',
        };
        const updatedProducts = [...manageproducts, newProduct];
        setManageproducts([...manageproducts, newProduct]);

        handleCloseAdd();
        console.log(manageproducts);
    };

    /////////////////////////////////
    const handleDelete = (id) => {
        setManageproducts(manageproducts.filter((product) => product.id !== id));
    };

    ///////////////////////////////////
    const handleEdit = (id) => {
        const selectedRow = manageproducts.find((row) => row.id === id);
        setFormValues({
            ...selectedRow,
            id: parseInt(selectedRow.id),
        });
        setOpenModal(true);
    };

    const initialFormValues = {
        id: null,
        name: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
    };

    const handleSubmitedit = () => {
        const updatedRows = rows.map((row) =>
            row.id === formValues.id ? formValues : row
        );

        updateRows(updatedRows);
        setOpenModal(false);
        setFormValues(formValues);
        const updatedProducts = [...manageproducts, formValues];
        setManageproducts(updatedProducts);
        console.log(manageproducts);
    };

    const updateRows = (updatedRows) => {
        setRows(updatedRows);
    };

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
                                id="imageUrl"
                                name="imageUrl"
                                label="imageUrl"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formValues.imageUrl}
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
                                id="quantity"
                                name="quantity"
                                label="Quantity"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formValues.quantity}
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
                                                    id,
                                                    name,
                                                    category,
                                                    price,
                                                    description,
                                                    status,
                                                } = row;

                                                const selectedUser = selected.indexOf(name) !== -1;

                                                return (
                                                    <React.Fragment key={id}>
                                                        <TableRow
                                                            hover
                                                            tabIndex={-1}
                                                            role="checkbox"
                                                            selected={selectedUser}
                                                        >
                                                            <TableCell align="left"></TableCell>
                                                            <TableCell align="left">{name}</TableCell>
                                                            <TableCell align="left">{category}</TableCell>
                                                            <TableCell align="left">{price}</TableCell>
                                                            <TableCell align="left">{description}</TableCell>
                                                            <TableCell align="left">
                                                                <Label
                                                                    color={
                                                                        (status === 'innactive' && 'error') ||
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
                                                                    onClick={handleOpenMenu}
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
                                                            <MenuItem onClick={() => handleEdit(id)}>
                                                                <Iconify
                                                                    icon={'eva:edit-fill'}
                                                                    sx={{ mr: 2 }}
                                                                />
                                                                Edit
                                                            </MenuItem>
                                                            <MenuItem
                                                                sx={{ color: 'error.main' }}
                                                                onClick={() => handleDelete(row.id)}
                                                            >
                                                                <Iconify
                                                                    icon={'eva:trash-2-outline'}
                                                                    sx={{ mr: 2 }}
                                                                />
                                                                Delete
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
                            id="imageUrl"
                            name="imageUrl"
                            label="imageUrl"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formValues.imageUrl}
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
                            id="quantity"
                            value={formValues.quantity}
                            label="Quantity"
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

                        <Button type="submit" color="inherit" variant="outlined">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
