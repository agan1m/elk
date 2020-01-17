import styled from 'styled-components';

export const RangeWrapper: any = styled.div`
  height: 40px;

  div.range-slider {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    width: 100%;
    height: 14px;
    padding: 5px 0;
    font-size: 12px;
    border-radius: 6px;
  }
  div.range-slider * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  div.range-slider > div.rail {
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: #e9e9e9;
    border-radius: 6px;
  }
  div.range-slider > div.track {
    position: absolute;
    left: 0;
    height: 4px;
    background-color: ${props => props.theme.success};
  }
  div.range-slider > div.handle {
    position: absolute;
    box-sizing: border-box;
    margin-left: -7px;
    margin-top: -10px;
    cursor: pointer;
    cursor: grab;
    width: 24px;
    height: 24px;
    background: ${props => props.theme.success};
    border-radius: 50%;
    border: 4px solid #ffffff;
    box-shadow: 0px 4px 10px rgba(33, 0, 86, 0.15);
  }
  div.range-slider > div.handle:hover,
  div.range-slider > div.handle:focus {
    outline: none;
    box-shadow: 0 0 5px #2db7f5;
  }
  div.range-slider > div.handle:active,
  div.range-slider > div.handle.dragging {
    cursor: grabbing;
    box-shadow: 0 0 5px #2db7f5;
  }
  div.range-slider > div.handle > span.tip {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    z-index: 1;
    box-sizing: border-box;
    min-width: 24px;
    padding: 0 6px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    pointer-events: none;
    color: white;
    background: #6c6c6c;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transform: translateX(-50%) scale(0);
    transform-origin: center calc(100% + 6px);
    transition-property: transform;
    transition-duration: 0.1s;
    transition-delay: 0.1s;
    transition-timing-function: ease-in;
  }
  div.range-slider > div.handle > span.tip::after {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -3px;
    content: '';
    border-width: 6px 3px 0;
    border-color: #6c6c6c rgba(108, 108, 108, 0) rgba(108, 108, 108, 0);
    border-style: solid;
  }
  div.range-slider > div.handle:hover > span.tip,
  div.range-slider > div.handle:active > span.tip,
  div.range-slider > div.handle.dragging > span.tip {
    transform: translateX(-50%) scale(1);
    transition-timing-function: ease-out;
  }
  div.range-slider > div.marks {
    position: absolute;
    top: 18px;
    left: 0;
    width: 100%;
  }
  div.range-slider > div.marks > span.text {
    position: absolute;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    cursor: default;
    color: gray;
    font-weight: 600;
    font-size: 14px;
  }
  div.range-slider > div.steps {
    position: absolute;
    width: 100%;
    height: 4px;
  }
  div.range-slider > div.steps > span.dot {
    position: absolute;
    bottom: -2px;
    box-sizing: border-box;
    width: 1px;
    height: 8px;
    margin-left: -1px;
    cursor: pointer;
    background-color: white;
    border: 1px solid #cbcfd3;
    top: 4px;
  }
  div.range-slider.disabled {
    background-color: #e9e9e9;
  }
  div.range-slider.disabled > div.track {
    background-color: #cccccc;
  }
  div.range-slider.disabled > div.handle {
    cursor: not-allowed;
    border-color: #cccccc;
    box-shadow: none;
  }
  div.range-slider.disabled > div.steps > span.dot {
    cursor: not-allowed;
    border-color: #cccccc;
  }
  div.range-slider.vertical {
    width: 14px;
    height: 100%;
    padding: 0 5px;
  }
  div.range-slider.vertical > div.rail {
    width: 4px;
    height: 100%;
  }
  div.range-slider.vertical > div.track {
    left: 5px;
    bottom: 0;
    width: 4px;
  }
  div.range-slider.vertical > div.handle {
    margin-bottom: -7px;
    margin-left: -5px;
  }
  div.range-slider.vertical > div.marks {
    top: 0;
    left: 18px;
    height: 100%;
  }
  div.range-slider.vertical > div.steps {
    width: 4px;
    height: 100%;
  }
  div.range-slider.vertical > div.steps > span.dot {
    left: 2px;
    margin-bottom: -4px;
  }
`;
