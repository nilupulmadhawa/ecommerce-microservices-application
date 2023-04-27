import React from "react"

const Catg = () => {
  const data = [
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Hemas",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Cipla",
    },
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Link Natural",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Lupin Limited",
    },
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Zydus Cadila",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Sun Pharma",
    },
  ]
  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Top Brands </h1>
          <h1>Sri Lanka</h1>
        </div>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
        <div className='box box2'>
          <button>View All Brands</button>
        </div>
      </div>
    </>
  )
}

export default Catg
