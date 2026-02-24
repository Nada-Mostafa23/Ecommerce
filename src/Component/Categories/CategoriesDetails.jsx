import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function CategoriesDetails() {
    const { id } = useParams();
async function getCategoriesDetails(id) {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
     return res.data;
    }
    const { data , isLoading  } = useQuery({
        queryKey: ['category' , id],
        queryFn: () => getCategoriesDetails(id),
        enabled: !!id,
    });
    // console.log(data?.data);
    const { state } = useLocation();
const categoryName = state?.categoryName;
  return <>
  <Helmet>
    <title>Categories Details Page</title>
  </Helmet>
   <div className=" container py-5 my-5">
   {isLoading ?  <> <div className="loading bg-secondary-subtle position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center">
    <span className="loader"></span>
     </div>
    </> : <>
    <h2 className=" text-main text-center mt-5 pt-5">{categoryName} subcategories</h2>
    <div className="row g-3 p-3">
    {data?.data?.map((sub) => (
      <div key={sub._id} className=" col-md-4 col-sm-6  ">
        <div className="category-box ">
            <h4 className="fw-bold">{sub.name}</h4>
        </div>
      </div>
    ))}
    </div>
    <Link to="/Categories" className="btn bg-main text-white ms-3">Go back</Link>
    </>}
   </div>
  </>
}
