import { h, Component } from 'preact';
import { ListWrapper, ItemWrapper, LabelWrapper, ItemContentWrapper, ItemCheckboxWrapper } from './Wrapper';
import Checkbox from './../../../../../components/_common/Checkbox';
import Link from './../../../../../components/_common/Link';

interface IProps {
  list: any[];
  onCheck?: (id: any) => void;
  checkedId?: any;
  disabled: boolean;
}

class ListOffices extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  handlerCheckItem = (item: any) => {
    const { checked, id } = item;
    const { onCheck } = this.props;

    const checkedId = checked === true ? id : null;

    onCheck && onCheck(checkedId);
  };

  render() {
    const { list, checkedId, disabled } = this.props;

    return list.length > 0 ? (
      <ListWrapper className="esp__tariffs__request__list">
        {list.map((i: any) => {
          const checked = i.id === checkedId;

          return (
            <ItemWrapper className="esp__tariffs__request__item-wrapper" key={i.id} checked={checked}>
              <ItemCheckboxWrapper className="esp__tariffs__request__item-checkbox">
                <Checkbox disabled={disabled} onChange={this.handlerCheckItem} checked={checked} id={i.id} />
                <LabelWrapper className="esp__tariffs__request__label">{i.label}</LabelWrapper>
              </ItemCheckboxWrapper>

              <ItemContentWrapper className="esp__tariffs__request__item-content">
                <LabelWrapper className="esp__tariffs__request__label">{i.description}</LabelWrapper>
              </ItemContentWrapper>

              <ItemContentWrapper className="esp__tariffs__request__item-content">
                <LabelWrapper className="esp__tariffs__request__label">
                  <Link href={`tel:${i.phone}`}>{i.phone}</Link>
                </LabelWrapper>
              </ItemContentWrapper>
            </ItemWrapper>
          );
        })}
      </ListWrapper>
    ) : null;
  }
}

export default ListOffices;
