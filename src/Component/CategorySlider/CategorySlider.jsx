


import { useQuery } from "@tanstack/react-query";
import axios from "axios"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function CategorySlider() {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1200, // أقل من 1200px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992, // أقل من 992px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // موبايل
        settings: {
          slidesToShow: 1,
            arrows: false,
            dots: true,
            slidesToScroll: 1,
        },
      },
    ],
  };
  
  
    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }
    let { data } = useQuery({
      queryKey: ['categories'],
      queryFn: getCategories,
    });
    // console.log(data?.data.data);

  return <>
    
  <div className="pt-5 mt-5" style={{overflowX: 'hidden'}}>
    {data?.data.data ? <div className=" mb-5 pb-5">
    <Slider {...settings}>
        {data?.data.data.map((category)=> {
            return <div key={category._id}>
              <img src={category.image} alt="" style={{width: '100%', height: 230, objectFit: 'cover', display: 'block'}} />
              <h5>{category.name}</h5>
            </div>
        })}
     </Slider> </div> : ''}
    
  </div>
  </>
}
