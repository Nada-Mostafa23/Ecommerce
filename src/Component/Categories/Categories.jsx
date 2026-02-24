import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

export default function Categories() {
async function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
}
const { data , isLoading  } = useQuery({
  queryKey: ['categories'],
  queryFn: getAllCategories,
});

  return <>
   <Helmet>
    <title>Categories Page</title>
  </Helmet>
 {isLoading ? <>
 <div className="loading bg-secondary-subtle position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center">
    <span className="loader"></span>
  </div>
</> : <>
  <div className="container py-5 my-5">
    <div className="row g-3">
    {data?.data?.data?.map((category) => (
      <div className=" col-md-4 col-sm-6 py-2" key={category._id}>
        <div  className="product border border-1">
          <Link to={`/CategoriesDetails/${category._id}`}  state={{ categoryName: category.name }}>
          <img src={category.image}  className="categoryImg" objectfit="cover" alt={category.name} />
          <div className="p-2 text-main text-center">
            <h4 className="fw-bold" >{category.name}</h4>
          </div>
          </Link>
        </div>
      </div>
    ))}
  </div>
  </div>
</>}

  </>
}
