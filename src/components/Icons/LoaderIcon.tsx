import { h } from 'preact';
import { IIcon } from './_Interface';

const LoaderIcon = (props: IIcon) => {
  const { color, width, height, style } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width || 20}
      height={height || 20}
      style={style || {}}
      viewBox="0 0 26.349 26.35"
    >
      <g>
        <g>
          <circle cx="13.792" cy="3.082" r="3.082" />
          <circle cx="13.792" cy="24.501" r="1.849" />
          <circle cx="6.219" cy="6.218" r="2.774" />
          <circle cx="21.365" cy="21.363" r="1.541" />
          <circle cx="3.082" cy="13.792" r="2.465" />
          <circle cx="24.501" cy="13.791" r="1.232" />
          <circle cx="7.082" cy="21.5" r="2.250" />>
          <circle cx="21.364" cy="6.218" r="0.924" />
        </g>
      </g>
      <use fill={color || '#cecece'} fillRule="nonzero" xlinkHref="#a" />
    </svg>
  );
};

export default LoaderIcon;
