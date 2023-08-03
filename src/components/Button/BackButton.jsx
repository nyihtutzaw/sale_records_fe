import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ route }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      size="sm"
      color="success"
      onClick={() => {
        navigate(route);
      }}
    >
      <ArrowBackIcon />
    </Button>
  );
}
