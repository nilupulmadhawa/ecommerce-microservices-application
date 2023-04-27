import React from 'react';
import Footer from '../common/footer/Footer';
import Head from '../common/header/Head';

export default function ProductViewPage() {
  return (
    <>
      <Head />

      <div className="box" style={{ width: '250px' }}>
        <div className="product mtop">
          <div className="img">
            <span className="discount">50% Off</span>
            <img src="/images/shops/10.png" alt="" style={{ width: '250px' }} />
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

      <Footer />
    </>
  );
}
