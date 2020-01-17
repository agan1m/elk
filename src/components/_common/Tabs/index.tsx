import { h, Component } from 'preact';

import {
  TabsWrapper,
  TabWrapper,
  Container,
  Title,
  TabPointsWrapper,
  TabsPointsWrapper,
  TabsMenu,
  TabsMenuItem,
  TabsBody,
  TabsContainer,
  TabText,
  TooltipIcon,
  TooltipWrapper,
  TooltipContent,
} from './Wrapper';

export enum TabTypes {
  'center',
  'line',
}

interface IProps {
  title?: string;
  style?: string;
  tabs: any[];
  active: any;
  onClick: (id: number) => void;
  type?: TabTypes;
}

interface IState {
  active: boolean;
}

class Tabs extends Component<IProps, IState> {
  static defaultProps = {
    type: TabTypes.center,
  };

  constructor(props: IProps) {
    super(props);

    const { active, tabs = [] } = this.props;

    this.state = {
      active: active == null ? tabs[0] && tabs[0].id : active,
    };
  }

  _handlerClick = (tab: any) => {
    const { id } = tab;
    const { onClick } = this.props;

    this.setState(
      {
        active: id,
      },
      () => onClick && onClick(id),
    );
  };

  render() {
    const { tabs, title, type, style } = this.props;
    const { active } = this.state;

    if (style === 'points') {
      return (
        <Container className="esp__tabs">
          <TabsPointsWrapper className="esp__tabs__tabs-points">
            {tabs.map(t => (
              <TabPointsWrapper
                className="esp__tabs__tab-points"
                active={active === t.id}
                key={t.id}
                onClick={() => this._handlerClick(t)}
              >
                {t.name}
              </TabPointsWrapper>
            ))}
          </TabsPointsWrapper>
        </Container>
      );
    }

    if (style === 'tabs') {
      return (
        <TabsContainer className="esp__tabs-container">
          <TabsMenu>
            {tabs.map(tab => (
              <TabsMenuItem
                className="esp__tabs-container__tab-menu-item"
                active={active === tab.id}
                activeIndex={active}
                key={tab.id}
                isHide={tab.hide}
                onClick={() => this._handlerClick(tab)}
              >
                <TabText className="esp__tabs-container__tab-text" active={active === tab.id}>
                  {tab.menuItem}
                </TabText>
              </TabsMenuItem>
            ))}
          </TabsMenu>
          <TabsBody lassName="esp__tabs-container__tab-body">
            {tabs.map(tab => active === tab.id && tab.render())}
          </TabsBody>
        </TabsContainer>
      );
    }

    return (
      <Container className="esp__tabs" type={type}>
        {title ? <Title className="esp__tabs__title">{title}</Title> : null}
        <TabsWrapper className="esp__tabs__tabs-wrapper">
          {tabs.map(t => (
            <TabWrapper
              className={`esp__tabs__tab${active === t.id ? ' active' : ''}`}
              type={type}
              active={active === t.id}
              key={t.id}
              onClick={() => this._handlerClick(t)}
            >
              {t.name}
              {t.tooltip ? (
                <TooltipWrapper className="esp__tabs__tooltip">
                  <TooltipIcon className="esp__tabs__tooltip-icon">?</TooltipIcon>
                  <TooltipContent className="esp__tabs__tooltip-content">{t.tooltip}</TooltipContent>
                </TooltipWrapper>
              ) : null}
            </TabWrapper>
          ))}
        </TabsWrapper>
      </Container>
    );
  }
}

export default Tabs;
