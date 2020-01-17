import { h, Component } from 'preact';

import { IProps, IState } from './Interfaces';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import colors from '../../theme/colors';

import Loader from './../../components/_common/Loader';
import { MapWrapper } from './Wrappers';

class YandexMap extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      center: this._averageGeolocation(props.list.map(a => a.coordinates)),
      isLoad: false,
    };
  }

  componentDidUpdate() {
    const { center } = this.state;
    const { list } = this.props;

    const mCenter = this._averageGeolocation(list.map(a => a.coordinates));

    if (mCenter[0] !== center[0] || mCenter[1] !== center[1]) {
      this.setState({ center: mCenter });
    }
  }

  _averageGeolocation = (coords: any[]) => {
    if (coords.length === 0) {
      return [];
    }

    if (coords.length === 1) {
      return coords[0];
    }

    let x = 0.0;
    let y = 0.0;
    let z = 0.0;

    for (const coord of coords) {
      const latitude = (coord[0] * Math.PI) / 180;
      const longitude = (coord[1] * Math.PI) / 180;

      x += Math.cos(latitude) * Math.cos(longitude);
      y += Math.cos(latitude) * Math.sin(longitude);
      z += Math.sin(latitude);
    }

    const total = coords.length;

    x = x / total;
    y = y / total;
    z = z / total;

    const centralLongitude = Math.atan2(y, x);
    const centralSquareRoot = Math.sqrt(x * x + y * y);
    const centralLatitude = Math.atan2(z, centralSquareRoot);

    return [(centralLatitude * 180) / Math.PI, (centralLongitude * 180) / Math.PI];
  };

  _handlerPlacemarkClick = (pm: any) => {
    const { onPlacemarkClick } = this.props;

    this.setState({ center: pm.coordinates });

    onPlacemarkClick && onPlacemarkClick(pm);
  };

  _handlerLoad = () => {
    this.setState({ isLoad: true });
  };

  render() {
    const { width, list = [] } = this.props;
    const { center, isLoad } = this.state;

    return (
      <MapWrapper className="esp__map">
        {!isLoad ? <Loader /> : null}
        <YMaps className="esp__map__ymap">
          <Map
            width={width || '100%'}
            height={400}
            state={{
              center: center,
              zoom: 9,
            }}
            onLoad={this._handlerLoad}
            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
          >
            {list.map((a, index) => (
              <Placemark
                key={index}
                className="esp__map__placemark"
                onClick={() => this._handlerPlacemarkClick(a)}
                geometry={a.coordinates}
                properties={{
                  hintContent: a.hint,
                  balloonContent: `<div style="font-weight: 600">${a.label}</div><div>${a.phone}</div><div>${a.description}</div>`,
                }}
                options={{
                  iconColor: a.checked ? colors.success : colors.primary,
                }}
              />
            ))}
          </Map>
        </YMaps>
      </MapWrapper>
    );
  }
}

export default YandexMap;
