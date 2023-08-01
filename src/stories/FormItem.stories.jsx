import React from 'react';
import { FormItem } from '../components/FormItem';
import { Input } from '../components/Input';

export default {
  title: 'Form Item',
  component: FormItem,
};


function Template(args) {
  return <FormItem {...args}>
    <Input />
  </FormItem>
}


export const Default = Template.bind({});
Default.args = {
    label:"Default Textbox",
    required:true,
};

