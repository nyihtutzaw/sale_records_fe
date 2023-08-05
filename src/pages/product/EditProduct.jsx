import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "./InputForm";
import { setProduct } from "../../store/actions";

function EditProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const product = useSelector((state) => state.product.product);

  const loadData = async () => {
    dispatch(setProduct(id));
  };

  useEffect(() => {
    loadData();
  }, []);

  return <InputForm editData={product} title="Edit Product"/>;
}

export default EditProduct;
