import { h } from 'preact';
import { IIcon } from './_Interface';

const ComputerIcon = (props: IIcon) => {
  const { color, width, height, style } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width || '49'}
      height={height || '37'}
      style={style || {}}
      viewBox="0 0 49 37"
    >
      <defs>
        <path id="computer-icon-a" d="M.226.244h6.847v6.934H.226z" />
        <path id="computer-icon-c" d="M.001 0h34.876v20.78H.001z" />
        <path id="computer-icon-e" d="M0 37h48.496V0H0z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill={color || '#FB9F3B'}
          d="M38.52 17.294c-2.628 0-4.765 2.164-4.765 4.826 0 2.661 2.137 4.826 4.765 4.826 2.628 0 4.766-2.165 4.766-4.826 0-2.662-2.138-4.826-4.766-4.826m0 12.065c-3.941 0-7.148-3.247-7.148-7.24 0-3.991 3.207-7.239 7.148-7.239 3.942 0 7.148 3.248 7.148 7.24s-3.206 7.239-7.148 7.239"
        />
        <g transform="translate(41.423 25.85)">
          <mask id="computer-icon-b" fill={color || '#fff'}>
            <use xlinkHref="#computer-icon-a" />
          </mask>
          <path
            fill={color || '#FB9F3B'}
            d="M5.389 7.178L.226 1.95 1.911.244l5.162 5.228z"
            mask="url(#computer-icon-b)"
          />
        </g>
        <path
          fill={color || '#3372A6'}
          d="M39.403 30.411l1.01 4.562H2.022l3.032-10.137.505-.507h24.247c-.132-.562.385-1.523.505-2.028H5.053c-.878 0-1.876.94-1.876 1.83L0 35.39c0 .889.711 1.61 1.588 1.61H41.3c.878 0 1.589-.721 1.589-1.61l-1.487-5.27c-.5.187-1.48.18-1.999.29"
        />
        <g transform="translate(4.041)">
          <mask id="computer-icon-d" fill={color || '#fff'}>
            <use xlinkHref="#computer-icon-c" />
          </mask>
          <path
            fill={color || '#3372A6'}
            d="M25.764 18.754H2.022V2.027h30.814v11.658c.558-.033 1.524-.129 2.02 0l.021-12.076a1.6 1.6 0 0 0-1.589-1.61H1.518C.64 0 0 .633 0 1.522v17.74c0 .888.638 1.52 1.516 1.52h23.742c.043-.543.339-1.496.505-2.027"
            mask="url(#computer-icon-d)"
          />
        </g>
        <mask id="computer-icon-f" fill={color || '#fff'}>
          <use xlinkHref="#computer-icon-e" />
        </mask>
        <path
          fill={color || '#3372A6'}
          d="M8.589 28.384h4.04v-2.028H8.59zM15.156 28.384h4.04v-2.028h-4.04zM22.228 28.384h4.042v-2.028h-4.042zM8.589 32.439h4.04V30.41H8.59zM15.156 32.439h4.04V30.41h-4.04zM22.228 32.439h4.042V30.41h-4.042zM29.3 32.439h4.041V30.41H29.3z"
          mask="url(#computer-icon-f)"
        />
      </g>
    </svg>
  );
};

export default ComputerIcon;
