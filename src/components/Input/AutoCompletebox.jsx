import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

function AutoCompletebox({ fetch, rules, control, name, onValueChange, ...rest }) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // const fetchData = async (input) => {
  //   const res = await debounceApiCall('search-product', `search=${input}`);
  //   return res.data;
  // };

  React.useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
    const fetchResults = async () => {
      setLoading(true);
      const results = await fetch(inputValue);
      if (active) {
        let newOptions = [];
        if (value) {
          newOptions = [value];
        }
        if (results) {
          // const formattedResult = results.map(result => ({value: result?.id, label: result?.name}))
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
        setLoading(false);
      }
    };

    fetchResults();

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <Autocomplete
            {...field}
            id={name}
            options={options}
            getOptionLabel={(option) => option.label}
            getOptionSelected={(optionA, optionB) =>
              optionA.label === optionB.label
            }
            filterOptions={(x) => x}
            fullWidth
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              field.onChange(newValue);
              if(onValueChange) onValueChange(newValue)
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                variant="outlined"
                value={value}
                {...rest}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? 'Loading...' : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          {error ? <span style={{ color: 'red' }}>{error.message}</span> : null}
        </>
      )}
    />
  );
}

export default AutoCompletebox;
