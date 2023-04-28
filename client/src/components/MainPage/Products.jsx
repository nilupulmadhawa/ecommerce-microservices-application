import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import '../MainPage/productview.css';
import Head from '../../common/header/Head';
import Footer from '../../common/footer/Footer';
import logo from '../../components/assets/images/logo.png';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from 'mdb-react-ui-kit';
import { Button, Link } from '@mui/material';
import Header from '../../common/header/Header';
import Navbar from '../../common/header/Navbar';

export default function Products() {
  const [value, setValue] = useState(2);

  return (
    <>
      <Head />
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
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Navbar />
      <section style={{ backgroundColor: '#e6ecff', display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <div style={{ width: '250px' }}>
            <div className="product mtop">
              <div className="img">
                <span className="discount">50% Off</span>
                <img
                  src="/images/shops/10.png"
                  alt=""
                  style={{ width: '250px' }}
                />
                <div className="product-like">
                  <label>10%</label> <br />
                  <i className="fa-regular fa-heart"></i>
                </div>
              </div>
              <div className="product-details">
                <h3> Only Naturals for Women</h3>

                <div className="rate">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                </div>
                <div className="price">
                  <h4>$50 </h4>

                  <i className="fa fa-plus"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <MDBCardBody>
            <div className="product-description">
              <h4>Product Description</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                sagittis posuere tincidunt. Mauris eget hendrerit metus, non
                suscipit enim. Donec id neque id sapien placerat tincidunt sit
                amet vel lacus. Sed in purus tellus. Suspendisse sodales justo
                quis sem consectetur vestibulum. Nam volutpat vestibulum
                malesuada. Fusce in quam nec sapien dictum auctor. Vivamus
                bibendum, enim at iaculis efficitur, lorem ipsum tincidunt
                risus, sit amet sodales elit elit a lectus.
              </p>
            </div>
          </MDBCardBody>
        </div>
      </section>

      <section style={{ backgroundColor: '#ccd9ff' }}>
        <MDBContainer className="py-5" style={{ maxWidth: '100%' }}>
          {/* <MDBRow className="justify-content-center"> */}
          {/* <MDBCol md="10" lg="8" xl="6"> */}
          <MDBCard>
            <MDBCardBody className="p-4">
              <div className="d-flex flex-start w-100">
                <MDBCardImage
                  className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                  alt="avatar"
                  width="65"
                  height="65"
                />

                <div className="w-100">
                  <MDBTypography tag="h5">Add a comment</MDBTypography>
                  <div>
                    <Box
                      sx={{
                        '& > legend': { mt: 2 },
                      }}
                    >
                      <Typography component="legend">
                        Satisfaction Rate
                      </Typography>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </Box>
                  </div>
                  <MDBTextArea label="What is your view?" rows={4} />

                  <div className="d-flex justify-content-between mt-3">
                    <MDBBtn color="success">Danger</MDBBtn>
                    <MDBBtn color="danger">
                      Send <MDBIcon fas icon="long-arrow-alt-right ms-1" />
                    </MDBBtn>
                  </div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
          {/* </MDBCol> */}
          {/* </MDBRow> */}
        </MDBContainer>
      </section>

      <section style={{ backgroundColor: '#e6ecff' }}>
        <MDBContainer className="py-5" style={{ maxWidth: '1000px' }}>
          {/* <MDBRow className="justify-content-center">
            <MDBCol md="12" lg="10"> */}
          <MDBCard className="text-dark">
            <MDBCardBody className="p-4">
              <MDBTypography tag="h4" className="mb-5">
                Recent comments
              </MDBTypography>
              <p className="fw-light mb-4 pb-2">
                Latest Comments section by users
              </p>

              <div className="d-flex flex-start">
                <MDBCardImage
                  className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                  alt="avatar"
                  width="60"
                  height="60"
                />
                <div>
                  <MDBTypography tag="h6" className="fw-bold mb-1">
                    Maggie Marsh
                  </MDBTypography>
                  <div className="d-flex align-items-center mb-3">
                    <p className="mb-0">
                      March 07, 2021
                      <span className="badge bg-primary">Pending</span>
                    </p>
                    <a href="#!" className="link-muted">
                      <MDBIcon fas icon="pencil-alt ms-2" />
                    </a>
                    <a href="#!" className="link-muted">
                      <MDBIcon fas icon="redo-alt ms-2" />
                    </a>
                    <a href="#!" className="link-muted">
                      <MDBIcon fas icon="heart ms-2" />
                    </a>
                  </div>
                  <p className="mb-0">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it.
                  </p>
                </div>
              </div>
            </MDBCardBody>

            <hr className="my-0" />

            <MDBCardBody className="p-4">
              <div className="d-flex flex-start">
                <MDBCardImage
                  className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                  alt="avatar"
                  width="60"
                  height="60"
                />
                <div>
                  <MDBTypography tag="h6" className="fw-bold mb-1">
                    Lara Stewart
                  </MDBTypography>
                  <div className="d-flex align-items-center mb-3">
                    <p className="mb-0">
                      March 15, 2021
                      <span className="badge bg-success">Approved</span>
                    </p>
                    <a href="#!" className="link-muted">
                      <MDBIcon fas icon="pencil-alt ms-2" />
                    </a>
                    <a href="#!" className="text-success">
                      <MDBIcon fas icon="redo-alt ms-2" />
                    </a>
                    <a href="#!" className="link-danger">
                      <MDBIcon fas icon="heart ms-2" />
                    </a>
                  </div>
                  <p className="mb-0">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites.
                  </p>
                </div>
              </div>
            </MDBCardBody>

            <hr className="my-0" />

            <MDBCardBody className="p-4">
              <div className="d-flex flex-start">
                <MDBCardImage
                  className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(33).webp"
                  alt="avatar"
                  width="60"
                  height="60"
                />
                <div>
                  <MDBTypography tag="h6" className="fw-bold mb-1">
                    Alexa Bennett
                  </MDBTypography>
                  <div className="d-flex align-items-center mb-3">
                    <p className="mb-0">
                      March 24, 2021
                      <span className="badge bg-danger">Rejected</span>
                    </p>
                    <a href="#!" className="link-muted">
                      <MDBIcon fas icon="pencil-alt ms-2" />
                    </a>
                    <a href="#!" className="link-muted">
                      <MDBIcon fas icon="redo-alt ms-2" />
                    </a>
                    <a href="#!" className="link-muted">
                      <MDBIcon fas icon="heart ms-2" />
                    </a>
                  </div>
                  <p className="mb-0">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure.
                  </p>
                </div>
              </div>
            </MDBCardBody>

            <hr className="my-0" />

            <MDBCardBody className="p-4">
              <div className="d-flex flex-start">
                <MDBCardImage
                  className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(24).webp"
                  alt="avatar"
                  width="60"
                  height="60"
                />
                <div>
                  <MDBTypography tag="h6" className="fw-bold mb-1">
                    Alexa Bennett
                  </MDBTypography>
                  <div className="d-flex align-items-center mb-3">
                    <p className="mb-0">
                      March 30, 2021
                      <span className="badge bg-primary">Pending</span>
                    </p>
                    <a href="#!" className="link-muted">
                      <MDBIcon fas icon="pencil-alt ms-2" />
                    </a>
                    <a href="#!" className="link-muted">
                      <MDBIcon fas icon="redo-alt ms-2" />
                    </a>
                    <a href="#!" className="link-muted">
                      <MDBIcon fas icon="heart ms-2" />
                    </a>
                  </div>
                  <p className="mb-0">
                    It uses a dictionary of over 200 Latin words, combined with
                    a handful of model sentence structures, to generate Lorem
                    Ipsum which looks reasonable. The generated Lorem Ipsum is
                    therefore always free from repetition, injected humour, or
                    non-characteristic words etc.
                  </p>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
          {/* </MDBCol>
          </MDBRow> */}
        </MDBContainer>
      </section>

      <Footer />
    </>
  );
}
