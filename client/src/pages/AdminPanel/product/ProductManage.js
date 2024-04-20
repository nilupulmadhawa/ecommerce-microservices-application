import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useEffect, useState } from 'react';

// @mui
import {
    Card,
    Table,
    Stack,
    Button,
    Popover,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
} from '@mui/material';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../../sections/@dashboard/user';
// mock
import USERLIST from '../../../_mock/manageproducts';
import { apiRequest, axiosInstance } from '../../../services/core/axios';
import { toast } from 'react-toastify';
import ProductListAddProduct from '../../../components/AdminPanel/product/AddProduct';
import { useStateContext } from '../../../context/ContextProvider';
import EditProduct from '../../../components/AdminPanel/product/EditProduct';

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





    const [manageproducts, setManageproducts] = useState([]);


    /////////////////////////////////

    const [deleteId, setDeleteId] = useState(null)
    const handleDelete = (_id) => {
        console.log(_id);
        setDeleteId(_id)
        setCOpen(true);
    };

    const handleSubmitDelete = async () => {
        console.log(deleteId);
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


    const getAllData = async () => {
        await apiRequest(() => axiosInstance.get(`/item/seller/${user._id}`)).then((res) => {
            if (res.success) {
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

                    <ProductListAddProduct getAllData={getAllData} />


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
                                                            <EditProduct getAllData={getAllData} id={_id} formValues={formValues} setFormValues={setFormValues} />
                                                            <MenuItem
                                                                sx={{ color: 'error.main' }}
                                                                onClick={() => handleDelete(formValues._id)}
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
                        Cannot be undone..!!!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCOpen(false)}>Disagree</Button>
                    <Button onClick={handleSubmitDelete} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
