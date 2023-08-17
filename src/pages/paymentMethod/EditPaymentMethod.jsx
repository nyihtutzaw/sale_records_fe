import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "./InputForm";
import { setPaymentMethod } from "../../store/actions";

function EditPaymentMethod() {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const paymentMethod = useSelector((state) => state.paymentMethod.paymentMethod);

  const loadData = async () => {
    dispatch(setPaymentMethod(id));
  };

  useEffect(() => {
    loadData();
  }, []);

  return <InputForm editData={paymentMethod} title="Edit Payment Method"/>;
}

export default EditPaymentMethod;
