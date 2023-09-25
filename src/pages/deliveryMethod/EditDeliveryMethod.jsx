import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "./InputForm";
import { setDeliveryMethod } from "../../store/actions";

function EditDeliveryMethod() {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const deliveryMethod = useSelector((state) => state.deliveryMethod.deliveryMethod);

  const loadData = async () => {
    dispatch(setDeliveryMethod(id));
  };

  useEffect(() => {
    loadData();
  }, []);

  return <InputForm editData={deliveryMethod} title="Edit Delivery Method"/>;
}

export default EditDeliveryMethod;
