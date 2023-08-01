import React from 'react';

function HtmlBlock({ content }) {
  // eslint-disable-next-line react/jsx-filename-extension, react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default HtmlBlock;
