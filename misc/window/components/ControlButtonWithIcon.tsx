import classNames from 'classnames';
import React from 'react';

interface IControlButtonWithIconProps {
  readonly name: string;
  readonly path: string;
  readonly title: string;
}

const ControlButtonWithIcon: React.FC<
  IControlButtonWithIconProps & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { name, path, title, ...rest } = props;
  const { onClick } = rest;

  const className = classNames('control', name);

  return (
    <div
      aria-label={name}
      className={className}
      onClick={onClick}
      title={title}
      {...rest}
    >
      <svg aria-hidden='true' version='1.1' height='16' viewBox='0 0 16 16'>
        <path fill='currentColor' d={path} />
      </svg>
    </div>
  );
};

export default ControlButtonWithIcon;
