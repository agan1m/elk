import { h } from 'preact';

interface IArrowIconProps {
  color?: string;
  width?: number;
  height?: number;
  style?: any;
  arrowUp?: any;
  className?: string;
}

const ArrowIcon = (props: IArrowIconProps) => {
  const { color, width, height, style, arrowUp, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '2em'}
      height={height || '7px'}
      viewBox="0 0 6 4"
      style={style || {}}
      className={className}
    >
      {arrowUp ? (
        <path
          fill={color || 'currentColor'}
          fillRule="nonzero"
          d="M4.156 2.856a.496.496 0 0 0 .7 0 .49.49 0 0 0 0-.696L2.83.144a.496.496 0 0 0-.7 0L.146 2.121a.49.49 0 0 0 0 .695.496.496 0 0 0 .699 0L2.48 1.187l1.676 1.669z"
        />
      ) : (
        <path
          fill={color || 'currentColor'}
          fillRule="nonzero"
          d="M4.205.146a.5.5 0 1 1 .708.708l-2.05 2.05a.5.5 0 0 1-.707 0L.146.893A.5.5 0 1 1 .854.187l1.655 1.655L4.205.146z"
        />
      )}
    </svg>
  );
};

export default ArrowIcon;
