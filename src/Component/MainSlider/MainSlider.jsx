import slide1 from '../../Assets/images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import slide2 from '../../Assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import slide3 from '../../Assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import slide4 from '../../Assets/images/41nN4nvKaAL._AC_SY200_.jpg'
import slide5 from '../../Assets/images/61cSNgtEISL._AC_SY200_.jpg'
import Slider from "react-slick";

export default function MainSlider() {
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
   
  };
  return <>
    <div className="container pt-5 mt-5">
          
                   <div className="row gx-0  justify-content-center">
                    <div className="col-md-3 col-sm-4">
                         <Slider {...settings}>
                        <img src={slide1} className='w-100' height={300} alt="" />
                        <img src={slide4} className='w-100' height={320} alt="" />
                        <img src={slide5} className='w-100' height={320} alt="" />
                     
                        </Slider>
                    </div>
                    <div className="col-md-4 col-sm-8 ">
                          <img src={slide2} height={200} className='w-75' alt="" />
                          <img src={slide3} height={200} className='w-75' alt="" />
                    </div>
                   </div>
         
      
    </div>
  </>
}
