import React from 'react';

import { Input } from '../components/Input';
import { InputType } from '../constants';

export default {
  title: 'Input',
  component: Input,
};


function Template(args) {
  return <Input {...args} />
}


export const TextBox = Template.bind({});
TextBox.args = {
    label:"Default Textbox",
};


export const Password = Template.bind({});
Password.args = {
    label:"Password Field",
    type:"password",
    placeholder:"Type your password",
    variant:"standard"
};

export const Checkbox = Template.bind({});
Checkbox.args = {
    label:"Is Yes",
    inputType:InputType.check
};

export const DatePicker = Template.bind({});
DatePicker.args = {
    label:"Date Of Birth",
    inputType:InputType.date,
    format:"YYYY-MM-DD"
};

export const SelectBox = Template.bind({});
SelectBox.args = {
    label:"Gender",
    inputType:InputType.select,
    value:1,
    options:[
      {label:"Male",value:1},
      {label:"Female",value:2}
    ]
};

