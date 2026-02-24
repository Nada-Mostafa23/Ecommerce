import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useState } from "react";


export default function Brands() {
  async function getAllBrands() {
     const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
     return res?.data;
    }
    const { data , isLoading  } = useQuery({
        queryKey: ['brands'],
        queryFn: () => getAllBrands(),
    });
    // console.log(data);

  async function getBrandDetails(id) {
       let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
       return res?.data;
    }
    const [selectedBrand, setSelectedBrand] = useState(null);
 const { data: brands} = useQuery({
  queryKey: ['brands', selectedBrand?._id],
  queryFn: () => getBrandDetails(selectedBrand._id),
  enabled: !!selectedBrand,
});
    
  return <>
      <Helmet>
        <title>Brands Page</title>
      </Helmet>
  <div className="container  py-5 my-5">
    <h2 className="text-center text-main fw-bold">All Brands</h2>
    {isLoading ? <div className="loading bg-secondary-subtle position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center">
    <span className="loader"></span>
  </div> : <div className="row g-3 p-3">
    {data?.data?.map((brand) => (
      <div key={brand._id} className="col-lg-3 col-md-6 col-sm-12  ">
       <div   data-bs-toggle="modal" data-bs-target="#brandModal"   onClick={() => setSelectedBrand(brand)} className="brand-box text-center">
    <img
    src={brand.image}
    alt={brand.name}
    className="w-100 mb-2 brand-img"
        />
      <h4 className="fw-bold">{brand.name}</h4>
    </div>

      </div>
    ))}
    <div
  className="modal fade mt-5"
  id="brandModal"
  tabIndex="-1"
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body d-flex align-items-center justify-content-between">
       <h3 className="text-main fw-bold fs-3 ">{brands?.data?.name}</h3>
       <img src={brands?.data?.image} className="w-50" alt={brands?.data?.name} />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </div>}
  </div>
  </>
}
