import classNames from 'classnames';
import React from 'react';
const styles = require('./select.module.css');

interface Props {
  readonly children?: React.ReactNode;
  readonly value?: string;
  readonly onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  readonly className?: string;
}

export const Select = ({ children, onChange, value, className }: Props) => {
  return (
    <div className={classNames(styles.root, className)}>
      <select className={styles.select} value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
};
