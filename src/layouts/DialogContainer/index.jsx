import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Modal } from '../../components/Modal';
import useDialog from '../../hooks/useDialog';

export function DialogContainer() {
  const dialogState = useSelector((state) => state.dialog);
  const { closeAlertDialog, closeConfirmDialog } = useDialog();
  const { alertDialog, confirmDialog } = dialogState;

  const AlertDialogModal = useMemo(
    () => (
      <Modal
        title={alertDialog.title}
        open={alertDialog.show}
        maxWidth="sm"
        buttons={[
          {
            label: alertDialog.acceptLabel,
            onClick: () => {
              closeAlertDialog();
            },
            colorType: 'primary',
          },
        ]}
      >
        <DialogBodyText>{alertDialog.body}</DialogBodyText>
      </Modal>
    ),
    [alertDialog, closeAlertDialog],
  );

  const ConfirmDialogModal = useMemo(
    () => (
      <Modal
        title={confirmDialog.title}
        open={confirmDialog.show}
        maxWidth="sm"
        justifyContent="space-between"
        buttons={[
          {
            label: confirmDialog.cancelLabel,
            onClick: () => {
              closeConfirmDialog();
            },
            colorType: 'error',
          },
          {
            label: confirmDialog.acceptLabel,
            onClick: () => confirmDialog.onConfirm(),
            colorType: 'primary',
          },
        ]}
      >
        <DialogBodyText>{confirmDialog.body}</DialogBodyText>
      </Modal>
    ),
    [closeConfirmDialog, confirmDialog],
  );

  return (
    <>
      {AlertDialogModal}
      {ConfirmDialogModal}
    </>
  );
}

const DialogBodyText = styled.span`
  font-size: 14px;
`;
