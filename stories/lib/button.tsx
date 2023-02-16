import classNames from 'classnames';
import React from 'react';
const styles = require('./button.module.css');

interface Props {
  readonly children?: React.ReactNode;
  readonly onClick?: () => void;
  readonly className?: string;
}

export const Button = ({ children, onClick, className }: Props) => {
  return (
    <button className={classNames(styles.root, className)} onClick={onClick}>
      {children}
    </button>
  );
};
