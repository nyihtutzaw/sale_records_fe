import React from 'react';
import { Textbox } from './TextBox';
import { Checkbox } from './Checkbox';
import { SelectBox } from './SelectBox';
import { DatePicker } from './DatePicker';
import { Radio } from './Radio';
import { InputType } from '../../constants';
import AutoCompletebox from './AutoCompletebox';

export function Input({ inputType = InputType.text, ...props }) {
  const componentProps = { ...props };

  switch (inputType) {
    case InputType.text:
      return <Textbox {...componentProps} />;
    case InputType.check:
      return <Checkbox {...componentProps} />;
    case InputType.select:
      return <SelectBox {...componentProps} />;
    case InputType.date:
      return <DatePicker {...componentProps} />;
    case InputType.radio:
      return <Radio {...componentProps} />;
    case InputType.autocomplete:
      return <AutoCompletebox {...componentProps} />;
    default:
      return null;
  }
}
