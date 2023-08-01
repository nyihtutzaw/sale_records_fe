import Grid from '@mui/material/Grid';
import React from 'react';
import { useForm } from 'react-hook-form';

import HtmlBlock from '../components/HtmlBlock';
import RichTextEditor from '../components/RichTextEditor';
import 'react-quill/dist/quill.snow.css';

export default {
  title: 'RichTextEditor',
  component: RichTextEditor,
};

function Template() {
  const { handleSubmit, watch, setValue } = useForm(
    {
      defaultValues: {
        content: '<p>Hello World !! </p>',
      },
    },
  );

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RichTextEditor
            onChange={(value) => setValue('content', value)}
            value={watch('content')}
          />
        </form>
      </Grid>
      <Grid item xs={6}>
        <HtmlBlock content={watch('content')} />
      </Grid>
    </Grid>
  );
}

export const Default = Template.bind({});
Default.args = {};
