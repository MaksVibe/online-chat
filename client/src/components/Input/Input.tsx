import React, { ChangeEvent } from 'react';
import styles from './Input.module.scss';

type InputPropsTypes = {
  label: string;
  name: string;
  type: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputPropsTypes> = ({ label, name, onChange, type, value }) => {
  let inputProps = {
    type: type,
    name: name,
    value: value ? value : '',
    onChange: onChange ? onChange : () => {},
  };
  return (
    <label className="text-slate-600">
      {label ? label : ''}
      <input {...inputProps} className={styles.input} />
    </label>
  );
};

export default Input;
