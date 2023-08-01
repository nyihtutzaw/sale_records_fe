import React from 'react';
import { Modal } from '../components/Modal';

export default {
  title: 'Modal',
  component: Modal,
};

function Template(args) {
  return <Modal {...args} />;
}

export const ModalBox = Template.bind({});
ModalBox.args = {
  open: true,
  onClose: () => {},

  title: 'Default ModalBox',
  children: 'Default children',
  buttons: [
    {
      label: 'submit',
      onClick: {},
      colorType: 'primary',
    },
    {
      label: 'cancel',
      onClick: {},
      colorType: 'error',
    },
  ],
};
