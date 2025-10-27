import { ErrorIcon } from '@/shared/icons';
import { TypographyType } from '@/shared/ui';
import clsx from 'clsx';
import { ChangeEvent, forwardRef, HTMLInputTypeAttribute, memo } from 'react';
import styles from './input.module.css';

type InputProps = {
  value: string | number;
  type?: HTMLInputTypeAttribute;
  label?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  errorString?: string | undefined;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  kbd?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      kbd,
      readonly,
      onClick,
      type = 'text',
      placeholder,
      onKeyDown,
      label,
      onChange,
      errorString,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col">
        <label className={TypographyType['h4'].className}>{label}</label>
        <div className={clsx(styles.inputText, 'border-animate')}>
          <input
            value={onChange && value}
            readOnly={readonly}
            ref={ref}
            type={type}
            onChange={onChange}
            onClick={onClick}
            placeholder={(placeholder ?? label ?? value ?? type).toString()}
            onKeyDown={onKeyDown}
            {...rest}
          />
          {kbd ? (
            <kbd className="pointer-events-none select-none items-center gap-1 rounded bg-muted px-1.5 opacity-100">
              {kbd}
            </kbd>
          ) : null}
        </div>

        <div className={`${!errorString ? 'hidden' : 'flex gap-1 items-center'}`}>
          <ErrorIcon fontSize="medium" />
          <span className={TypographyType['h4'].className}>{errorString}</span>
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default memo(Input);
