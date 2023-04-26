import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "Supplements",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Herbs and Homeopathy",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Bath and Personal Care",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "Beauty",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "Sports",
    },
    {
      cateImg: "./images/category/cat6.png",
      cateName: "Kids and Babies",
    },
    {
      cateImg: "./images/category/cat7.png",
      cateName: "Pets",
    },
  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
