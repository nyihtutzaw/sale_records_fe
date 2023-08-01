import { Button } from '@mui/material';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FormItem } from '../components/FormItem';
import { Input } from '../components/Input';
import { VStack } from '../components/VStack';
import { Modal } from '../components/Modal';
import useDialog from '../hooks/useDialog';

function ModalPage() {
  const [open, setOpen] = useState(false);

  const { showAlertDialog, showConfirmDialog, closeConfirmDialog } =
    useDialog();

  const toggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const onSubmit = () => {};

  const handleConfirm = useCallback(() => {
    closeConfirmDialog();
  }, [closeConfirmDialog]);

  return (
    <>
      <Container>
        <VStack spacing={4}>
          <Button variant="outlined" onClick={toggle}>
            Open sample dialog
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              showAlertDialog({
                title: 'Sample Alert Dialog',
                body: 'Blah Blah is Blah Blah',
                acceptLabel: 'Cancel',
              })
            }
          >
            Open alert dialog
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              showConfirmDialog({
                title:'Sample Confirm Dialog',
                body:'Are you sure to delete?',
                onConfirm:handleConfirm,
                cancelLabel:"Let it Be",
                acceptLabel:"Agree"
            })
            }
          >
            Open Confirm dialog
          </Button>
        </VStack>
      </Container>

      <Modal
        title="Sample Dialog"
        open={open}
        onClose={toggle}
        buttons={[
          {
            label: 'cancel',
            onClick: onSubmit,
            colorType: 'error',
          },
          {
            label: 'submit',
            onClick: onSubmit,
            colorType: 'primary',
          },
        ]}
      >
        <ModalContent>
          <FormItem label="Name">
            <Input
              variant="outlined"
              name="name"
              autoComplete="name"
              autoFocus
            />
          </FormItem>
        </ModalContent>
      </Modal>
    </>
  );
}
export default ModalPage;

const ModalContent = styled.div`
  padding: 40px 0px;
`;

const Container = styled.div`
  padding: 20px;
`;
