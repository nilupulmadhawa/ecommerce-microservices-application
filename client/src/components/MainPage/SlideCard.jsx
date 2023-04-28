import React from 'react';
import Sdata from './Sdata';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from '@mui/material';

const SlideCard = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        appendDots: (dots) => {
            return <ul style={{ margin: '0px' }}>{dots}</ul>;
        },
    };
    return (
        <>
            <Slider {...settings}>
                {Sdata.map((value, index) => {
                    return (
                        <>
                            <div className="box d_flex top" key={index} >
                                <div className="left" style={{ paddingLeft: "30px" }}>
                                    <h1>{value.title}</h1>
                                    <p>{value.desc}</p>
                                    <Link to="/shop">
                                        <button className="btn-primary">Visit Collections</button>
                                    </Link>
                                </div>
                                <div
                                    className="img"
                                    style={{ width: '400px', height: '400px' }}
                                >
                                    <img src={value.cover} alt="" />
                                </div>
                            </div>
                        </>
                    );
                })}
            </Slider>
        </>
    );
};

export default SlideCard;
