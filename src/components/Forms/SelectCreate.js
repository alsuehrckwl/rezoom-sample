import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, Field } from 'redux-form';
import { Select, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: 0,
        },
        '&:after': {
          borderBottom: 0,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: 0,
        },
      },
      input: {
        padding: 0,
      },
    },
  },
});

const renderSelect = ({
  name,
  input,
  label,
  disabled,
  meta: { touched, error },
  children,
  ...custom
}) => {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <p>{label}</p>
        <Select
          disabled={disabled}
          id={name}
          label={label}
          onChange={(e, idx, value) => input.onChange(value)}
          {...input}
          {...custom}
        >
          {children}
        </Select>
      </MuiThemeProvider>
    </div>
  );
};

renderSelect.propTypes = {
  name: PropTypes.string,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export class SelectCreate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, label, items, disabled } = this.props;
    return (
      <Field
        name={name}
        component={renderSelect}
        label={label}
        disabled={disabled}
      >
        {items.map((item, idx) => {
          return (
            <MenuItem key={idx} value={item.value}>
              {item.key}
            </MenuItem>
          );
        })}
      </Field>
    );
  }
}

SelectCreate.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
};

export default SelectCreate;
