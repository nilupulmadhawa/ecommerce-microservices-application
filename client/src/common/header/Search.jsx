import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../components/assets/images/logo.png';
import { Button } from '@mui/material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Search = ({ CartItem }) => {
    // fixed Header
    window.addEventListener('scroll', function () {
        const search = document.querySelector('.search');
        // search.classList.toggle('active', window.scrollY > 100);
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <section className="search">
                <div className="container c_flex">
                    <div className="logo width ">
                        <img src={logo} alt="" style={{ width: '120px' }} />
                    </div>



                    <div
                        className="search-box f_flex ms-5 me-5"
                        style={{ marginLeft: '50px', marginRight: '50px', backgroundColor: '#fff' }}
                    >
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Search and herbal product" />
                        <span style={{ fontSize: '13px' }}>All Category</span>
                    </div>


                    <div className="icon f_flex width">
                        <Link>
                            <i id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick} className="fa fa-user icon-circle"></i>
                        </Link>
                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >


                            <MenuItem onClick={handleClose}><Link to="/login">
                                Login
                            </Link></MenuItem>
                            <MenuItem onClick={handleClose}> <Link to="/signup">
                                Signup
                            </Link></MenuItem>
                        </Menu>
                        <div className="cart">
                            <Link to="/cart">
                                <i className="fa fa-shopping-bag icon-circle"></i>
                                <span>{CartItem.length === 0 ? '' : CartItem.length}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Search;
