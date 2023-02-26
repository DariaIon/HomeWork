import React, { useCallback, useContext } from "react";
import { NotFound } from "./notFound/NotFound";
import api from "../utility/Api";
import Spinner from "../components/Spinner/spinner";
import Product  from "../components/Product/Product";
import { useParams } from "react-router-dom";
import { useApi } from "./../hooks/useApi";
import { CardContext } from "../context/cardContext";

 const ProductPage = () => {
   const { productId } = useParams();
   const { handleLike } = useContext(CardContext);

   const handleGetProduct = useCallback(
     () => api.getProductById(productId),
     [productId]
   );

   const {
     data: product,
     setData: setProduct,
     loading: isLoading,
     error: errorState,
   } = useApi(handleGetProduct);

   const handleProductLike = useCallback(() => {
     handleLike(product).then((updateProduct) => {
       setProduct(updateProduct);
     });
   }, [product, handleLike, setProduct]);

   return (
     <>
       <div className="content__cards">
         {isLoading ?
           <Spinner />
          : !errorState && <Product {...product} setProduct={setProduct} onProductLike={handleProductLike}/>
          }
         {!isLoading && errorState && <NotFound />}
       </div>
     </>
   );
 };

    export default ProductPage;