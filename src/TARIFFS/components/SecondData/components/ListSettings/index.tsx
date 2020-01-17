import { h, Component } from 'preact';
import { ItemWrapper, LabelWrapper, ItemContentWrapper, CheckBoxWrapper } from './Wrapper';
import { ISettings } from '../../../TariffList/Interfaces';

interface IProps {
  list: ISettings[];
  onCheck?: (checkedId: string) => void;
  checkedIds?: string[];
}

class ListSettings extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  handlerCheckItem = (item: any) => {
    const { id } = item;
    const { onCheck } = this.props;

    onCheck && onCheck(id);
  };

  _renderCheckBoxTemplate(settingName: string, checked: boolean) {
    return checked ? (
      <svg
        onClick={() => this.handlerCheckItem({ checked: false, id: settingName })}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 58 58"
      >
        <path
          style="fill:#839594;"
          d="M6,23h27.474C32.537,24.796,32,26.834,32,29s0.537,4.204,1.474,6H6c-3.314,0-6-2.686-6-6 C0,25.686,2.686,23,6,23z"
        />
        <circle style="fill:#61B872;" cx="45" cy="29" r="13" />
      </svg>
    ) : (
      <svg
        onClick={() => this.handlerCheckItem({ checked: true, id: settingName })}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 58 58"
      >
        <path
          style="fill:#839594;"
          d="M52,23H24.526C25.463,24.796,26,26.834,26,29s-0.537,4.204-1.474,6H52c3.314,0,6-2.686,6-6 S55.314,23,52,23z"
        />
        <circle style="fill:#C7CAC7;" cx="13" cy="29" r="13" />
      </svg>
    );
  }

  render() {
    const { list, checkedIds } = this.props;

    return list.length > 0 ? (
      <div>
        {list.map(i => {
          const { settingName, settingDisplayName, description } = i;
          const checked = !!checkedIds.find(item => item === settingName);

          return (
            <ItemWrapper className="esp__tariffs__request__item" key={settingName} checked={checked}>
              <ItemContentWrapper className="esp__tariffs__request__item-content">
                <LabelWrapper className="esp__tariffs__request__label">
                  <b>{settingDisplayName}</b>
                </LabelWrapper>
                <CheckBoxWrapper className="esp__tariffs__request__checkbox">
                  {this._renderCheckBoxTemplate(settingName, checked)}
                </CheckBoxWrapper>
              </ItemContentWrapper>
              <ItemContentWrapper className="esp__tariffs__request__item-content">
                <LabelWrapper className="esp__tariffs__request__label">{description}</LabelWrapper>
              </ItemContentWrapper>
            </ItemWrapper>
          );
        })}
      </div>
    ) : null;
  }
}

export default ListSettings;
