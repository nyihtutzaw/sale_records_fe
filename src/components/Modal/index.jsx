import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import styled from 'styled-components';

export function Modal({
  open,
  onClose,
  title,
  children,
  buttons,
  maxWidth = 'sm',
  justifyContent = 'flex-end',
 
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      <DialogTitle>
        <Title>{title}</Title>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <ButtonContainer $justifyContent={justifyContent}>
          {buttons.map((button) => (
            <Button
              key={button.label}
              onClick={button.onClick}
              color={button.colorType}
              variant="contained"
            >
              {button.label}
            </Button>
          ))}
        </ButtonContainer>
      </DialogActions>
    </Dialog>
  );
}

const ButtonContainer = styled.div`
  justify-content:${({ $justifyContent }) => $justifyContent};
  display: flex;
  width: 100%;
  padding:0px 20px;
  gap: 10px;
`;


const Title=styled.span`
  font-weight: bold;
  font-size: 18px;
`