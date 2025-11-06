import { ErrorIcon } from '@/shared/icons';
import { forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, memo } from 'react';
import styles from './input.module.css';

type InputProps = {
  value: string | number;
  type?: HTMLInputTypeAttribute;
  label?: string;
  errorString?: string | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, type = 'text', label, errorString, ...rest }, ref) => {
    return (
      <div className={styles.input_wrapper}>
        <label>{label}</label>
        <div className={styles.input}>
          <input value={value} ref={ref} type={type} {...rest} />
        </div>
        {errorString && (
          <div>
            <ErrorIcon size={15} />
            <span>{errorString}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default memo(Input);
