import { h } from 'preact';
import { IIcon } from './_Interface';

const ProductIcon = (props: IIcon) => {
  const { color, width, height, style } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width || 20}
      height={height || 20}
      style={style || {}}
      viewBox="-34 0 512 512"
    >
      <path
        fill={color}
        fillRule="nonzero"
        d="m221.703125 0-221.703125 128v256l221.703125 128 221.703125-128v-256zm176.515625 136.652344-176.515625 101.914062-176.515625-101.914062 176.515625-101.910156zm-368.132812 26.027344 176.574218 101.941406v203.953125l-176.574218-101.945313zm206.660156 305.894531v-203.953125l176.574218-101.941406v203.949218zm0 0"
      />
    </svg>
  );
};

export default ProductIcon;
