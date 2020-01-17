import { h, Component } from 'preact';
import { SidebarContainer, SidebarList, SidebarItem, SidebarLink } from './Wrappers';

interface IState {
  pages: object;
}
/* eslint-disable-next-line */
interface IProps {}

class Sidebar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      pages: {
        products: {
          name: 'Продукты',
          link: '/products',
        },
        request: { name: 'Заявки', link: '/requests' },
      },
    };
  }

  _getActiveItem = () => {
    const matchArr = window.location.hash.match(/^#\/\w+/);

    return matchArr && matchArr[0].replace('#', '');
  };

  _renderItemsTemplate() {
    const { pages } = this.state;

    return Object.keys(pages).map((key: string, index: number) => (
      <SidebarItem className="esp__cabinet__sidebar__list__item" key={index}>
        <SidebarLink
          className="esp__cabinet__sidebar__list__link"
          to={pages[key]['link']}
          active={pages[key]['link'] === this._getActiveItem()}
        >
          {pages[key]['name']}
        </SidebarLink>
      </SidebarItem>
    ));
  }

  render() {
    return (
      <SidebarContainer className="esp__cabinet__sidebar__container">
        <SidebarList className="esp__cabinet__sidebar__list">{this._renderItemsTemplate()}</SidebarList>
      </SidebarContainer>
    );
  }
}

export default Sidebar;
