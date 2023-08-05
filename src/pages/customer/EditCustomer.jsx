import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "./InputForm";
import { setCustomer } from "../../store/actions";

function EditCustomer() {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const customer = useSelector((state) => state.customer.customer);

  console.log(customer);

  const loadData = async () => {
    dispatch(setCustomer(id));
  };

  useEffect(() => {
    loadData();
  }, []);

  return <InputForm editData={customer} title="Edit Customer"/>;
}

export default EditCustomer;
