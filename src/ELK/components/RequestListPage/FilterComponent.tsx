import { h, Component } from 'preact';
import Dropdown from '../../../components/_common/Dropdown';
import { DropdownWrapper, FilterLine, CountText, SearchWrapper } from './Wrappers';
import Input from '../../../components/_common/Input';
import { IFilters } from './Interfaces';

interface IProps {
  onChange: Function;
  filters: IFilters;
}

class FilterComponent extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  _handlerFilterChange = (value: any, attr: any) => {
    const { filters, onChange } = this.props;

    onChange && onChange({ ...filters, [attr]: value });
  };

  render() {
    const { filters } = this.props;
    const { status, requestType } = filters;
    return (
      <div>
        <FilterLine>
          <div>
            <DropdownWrapper>
              <Dropdown
                value={requestType}
                options={[
                  {
                    id: 1,
                    name: 'Отчетность',
                  },
                  {
                    id: 2,
                    name: 'Файлер',
                  },
                  {
                    id: 3,
                    name: 'Услуги УЦ',
                  },
                  {
                    id: 4,
                    name: 'ОФД',
                  },
                  {
                    id: 5,
                    name: 'Ветис',
                  },
                  {
                    id: 6,
                    name: 'Досье',
                  },
                ]}
                optionValue={'id'}
                optionText={'name'}
                optionCaption={'Тип заявки'}
                onChange={v => this._handlerFilterChange(v, 'requestType')}
              />
            </DropdownWrapper>
            <DropdownWrapper>
              <Dropdown
                value={status}
                options={[
                  {
                    id: 1,
                    name: 'Создано',
                  },
                  {
                    id: 2,
                    name: 'Отправлено',
                  },
                  {
                    id: 3,
                    name: 'Ожидает счета',
                  },
                  {
                    id: 4,
                    name: 'Ожидает оплаты',
                  },
                  {
                    id: 5,
                    name: 'Счета оплачены',
                  },
                  {
                    id: 6,
                    name: 'Завершено',
                  },
                  {
                    id: 7,
                    name: 'Закрывающие документы',
                  },
                  {
                    id: 8,
                    name: 'Отклонено',
                  },
                  {
                    id: 9,
                    name: 'Ошибка',
                  },
                ]}
                optionValue={'id'}
                optionText={'name'}
                optionCaption={'Статус заявки'}
                onChange={v => this._handlerFilterChange(v, 'status')}
              />
            </DropdownWrapper>
            <DropdownWrapper>
              <Dropdown
                options={[
                  {
                    id: 1,
                    name: 'Оплачено',
                  },
                  {
                    id: 2,
                    name: 'Не оплачено',
                  },
                ]}
                optionValue={'id'}
                optionText={'name'}
                optionCaption={'Статус оплаты'}
              />
            </DropdownWrapper>
            <DropdownWrapper>
              <Dropdown
                options={[
                  {
                    id: 1,
                    name: 'Подключение Файлера',
                  },
                  {
                    id: 2,
                    name: 'Подключение Отчетносит',
                  },
                ]}
                optionValue={'id'}
                optionText={'name'}
                optionCaption={'Дата заказа'}
              />
            </DropdownWrapper>
          </div>
          <div>
            <SearchWrapper>
              <Input placeholder={'Поиск'} />
            </SearchWrapper>
          </div>
        </FilterLine>
        <FilterLine>
          <CountText>Найдено 17</CountText>
          <Dropdown
            value={1}
            width={'80px'}
            options={[
              {
                id: 1,
                name: '10',
              },
              {
                id: 2,
                name: '50',
              },
              {
                id: 2,
                name: '100',
              },
            ]}
            optionValue={'id'}
            optionText={'name'}
          />
        </FilterLine>
      </div>
    );
  }
}

export default FilterComponent;
