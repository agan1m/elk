import { h } from 'preact';
import { IProps } from './Interfaces';
import { ButtonLink, ButtonWrapper } from './Wrappers';

const BaseButton: any = (props: IProps) => {
  const { href, disabled, onClick, className } = props;

  function handleClick(event: any) {
    !disabled && onClick(event);
    event && event.preventDefault();
  }

  if (href) {
    return (
      <ButtonLink
        {...props}
        className={`esp__button${disabled ? ' disabled' : ''} ${className || ''}`}
        onClick={handleClick}
      />
    );
  }

  return <ButtonWrapper className={`esp__button ${className || ''}`} {...props} />;
};

export default BaseButton;
