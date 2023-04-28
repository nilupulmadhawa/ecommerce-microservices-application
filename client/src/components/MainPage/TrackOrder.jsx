import { Button, Link } from '@mui/material';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
import React from 'react';
import Navbar from '../../common/header/Navbar';
import Head from '../../common/header/Head';
import Logo from '../logo/Logo';
import Footer from '../../common/footer/Footer';

export default function TrackOrder() {
  return (
    <>
      <Head />
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <img src={Logo} alt="" style={{ width: '80px' }} />
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
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Navbar />
      <section style={{ backgroundColor: '#e6ecff', display: 'flex' }}>
        <MDBContainer className="py-5">
          {/* <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="10" xl="8"> */}
          <MDBCard style={{ borderRadius: '10px' }}>
            <MDBCardHeader className="px-4 py-5">
              <MDBTypography tag="h5" className="text-muted mb-0">
                Thanks for your Order,{' '}
                <span style={{ color: '#a8729a' }}>Anna</span>!
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="lead fw-normal mb-0" style={{ color: '#a8729a' }}>
                  Receipt
                </p>
                <p className="small text-muted mb-0">
                  Receipt Voucher : 1KAU9-84UIL
                </p>
              </div>

              <MDBCard className="shadow-0 border mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="2">
                      <MDBCardImage
                        src="/images/shops/10.png"
                        fluid
                        alt="Phone"
                      />
                    </MDBCol>
                    <MDBCol
                      md="2"
                      className="text-center d-flex justify-content-center align-items-center"
                    >
                      <p className="text-muted mb-0">
                        {' '}
                        Only Naturals for Women
                      </p>
                    </MDBCol>
                    <MDBCol
                      md="2"
                      className="text-center d-flex justify-content-center align-items-center"
                    >
                      {/* <p className="text-muted mb-0 small">White</p> */}
                    </MDBCol>
                    <MDBCol
                      md="2"
                      className="text-center d-flex justify-content-center align-items-center"
                    >
                      {/* <p className="text-muted mb-0 small">Capacity: 64GB</p> */}
                    </MDBCol>
                    <MDBCol
                      md="2"
                      className="text-center d-flex justify-content-center align-items-center"
                    >
                      <p className="text-muted mb-0 small">Qty: 1</p>
                    </MDBCol>
                    <MDBCol
                      md="2"
                      className="text-center d-flex justify-content-center align-items-center"
                    >
                      <p className="text-muted mb-0 small">$50</p>
                    </MDBCol>
                  </MDBRow>
                  <hr
                    className="mb-4"
                    style={{ backgroundColor: '#e0e0e0', opacity: 1 }}
                  />
                  <MDBRow className="align-items-center">
                    <MDBCol md="2">
                      <p className="text-muted mb-0 small">Track Order</p>
                    </MDBCol>
                    <MDBCol md="10">
                      <MDBProgress
                        style={{ height: '6px', borderRadius: '16px' }}
                      >
                        <MDBProgressBar
                          style={{
                            borderRadius: '16px',
                            backgroundColor: '#a8729a',
                          }}
                          width={65}
                          valuemin={0}
                          valuemax={100}
                        />
                      </MDBProgress>
                      <div className="d-flex justify-content-around mb-1">
                        <p className="text-muted mt-1 mb-0 small ms-xl-5">
                          Out for delivary
                        </p>
                        <p className="text-muted mt-1 mb-0 small ms-xl-5">
                          Delivered
                        </p>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="shadow-0 border mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol md="2">
                      <MDBCardImage
                        src="./images/SlideCard/product_7.jpg"
                        fluid
                        alt="Phone"
                      />
                    </MDBCol>
                    <MDBCol
                      md="2"
                      className="text-center d-flex justify-content-center align-items-center"
                    >
                      <p className="text-muted mb-0">Herb natural</p>
                    </MDBCol>
                    <MDBCol
                      md="2"
                      className="text-center d-flex justify-content-center align-items-center"
                    >
                      {/* <p className="text-muted mb-0 small">Pink rose</p> */}
                    </MDBCol>
                    <MDBCol
                      md="2"
                      className="text-center d-flex justify-content-center align-items-center"
                    >
                      {/* <p className="text-muted mb-0 small">Capacity: 32GB</p> */}
                    </MDBCol>
                    <MDBCol
                      md="2"
                      className="text-center d-flex justify-content-center align-items-center"
                    >
                      <p className="text-muted mb-0 small">Qty: 1</p>
                    </MDBCol>
                    <MDBCol
                      md="2"
                      className="text-center d-flex justify-content-center align-items-center"
                    >
                      <p className="text-muted mb-0 small">$199</p>
                    </MDBCol>
                  </MDBRow>
                  <hr
                    className="mb-4"
                    style={{ backgroundColor: '#e0e0e0', opacity: 1 }}
                  />
                  <MDBRow className="align-items-center">
                    <MDBCol md="2">
                      <p className="text-muted mb-0 small">Track Order</p>
                    </MDBCol>
                    <MDBCol md="10">
                      <MDBProgress
                        style={{ height: '6px', borderRadius: '16px' }}
                      >
                        <MDBProgressBar
                          style={{
                            borderRadius: '16px',
                            backgroundColor: '#a8729a',
                          }}
                          width={20}
                          valuemin={0}
                          valuemax={100}
                        />
                      </MDBProgress>
                      <div className="d-flex justify-content-around mb-1">
                        <p className="text-muted mt-1 mb-0 small ms-xl-5">
                          Out for delivary
                        </p>
                        <p className="text-muted mt-1 mb-0 small ms-xl-5">
                          Delivered
                        </p>
                      </div>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              <div className="d-flex justify-content-between pt-2">
                <p className="fw-bold mb-0">Order Details</p>
                <p className="text-muted mb-0">
                  <span className="fw-bold me-4">Total</span> $50.00
                </p>
              </div>

              <div className="d-flex justify-content-between pt-2">
                <p className="text-muted mb-0">Invoice Number : 788152</p>
                <p className="text-muted mb-0">
                  <span className="fw-bold me-4">Discount</span> $199.00
                </p>
              </div>

              <div className="d-flex justify-content-between">
                <p className="text-muted mb-0">Invoice Date : 22 April,2023</p>
                <p className="text-muted mb-0">
                  <span className="fw-bold me-4">GST 18%</span> 123
                </p>
              </div>

              <div className="d-flex justify-content-between mb-5">
                <p className="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
                <p className="text-muted mb-0">
                  <span className="fw-bold me-4">Delivery Charges</span> Free
                </p>
              </div>
            </MDBCardBody>
            <MDBCardFooter
              className="border-0 px-4 py-5"
              style={{
                backgroundColor: '#a8729a',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
              }}
            >
              <MDBTypography
                tag="h5"
                className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
              >
                Total paid: <span className="h2 mb-0 ms-2">$249</span>
              </MDBTypography>
            </MDBCardFooter>
          </MDBCard>
          {/* </MDBCol>
          </MDBRow> */}
        </MDBContainer>
      </section>
      <Footer />
    </>
  );
}
