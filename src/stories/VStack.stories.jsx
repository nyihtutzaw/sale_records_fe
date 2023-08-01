import React from 'react';

import { VStack } from '../components/VStack';

export default {
  title: 'VStack',
  component: VStack,
};


function Template(args) {
  return <VStack {...args}>
    <span>Header 1</span>
    <span>Header 2</span>
</VStack>
}


export const Default = Template.bind({});
Default.args = {
    spacing:3
};