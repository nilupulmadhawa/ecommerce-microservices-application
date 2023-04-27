import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../components/assets/images/logo.png';
import { Button } from '@mui/material';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener('scroll', function () {
    const search = document.querySelector('.search');
    // search.classList.toggle('active', window.scrollY > 100);
  });

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <img src={logo} alt="" style={{ width: '80px' }} />
          </div>

          <Link to="/signup">
            <Button fullWidth size="small" color="info" variant="outlined">
              SignUp
            </Button>{' '}
          </Link>

          <div
            className="search-box f_flex ms-5 me-5"
            style={{ marginLeft: '50px', marginRight: '50px' }}
          >
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search and herbal product" />
            <span>All Category</span>
          </div>

          <Link to="/login">
            <Button fullWidth size="small" color="info" variant="outlined">
              Login
            </Button>{' '}
          </Link>
          <div className="icon f_flex width">
            <i className="fa fa-user icon-circle"></i>
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
