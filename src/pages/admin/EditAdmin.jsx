import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "./InputForm";
import { setAdmin } from "../../store/actions/admin";

function EditAdmin() {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const admin = useSelector((state) => state.admin.admin);

  const loadData = async () => {
     dispatch(setAdmin(id));
  };

  useEffect(() => {
    loadData();
  }, []);

  return <InputForm editData={admin} />;
}

export default EditAdmin;
