import { ITarif } from './../../components/TariffList/Interfaces';

export interface IState {
  agent?: any;
  utm?: string;
  post?: string
  ogrn?: string;
  tariff?: ITarif;
  inn?: string;
  kpp?: string;
  organizationName?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  email?: string;
  cert?: any;
  regionCode: number;
  redirectUrl?: string;
  needItems?: string[];
  inProcess: boolean;
  contactEmail?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactMiddleName?: string;
  certFirstName?: string;
  certLastName?: string;
  certMiddleName?: string;
  contactPhone?: string;
  legalAddress?: any;
  snils?: string;
  certificateBodyInBase64?: string;
  checkedSettingIds: [];
  comment?: string;
}

export interface IRequest {
    CertificateBodyInBase64?: string,
    EDOFNS?: string[],
    EDOPFR?: IPfrViewModel[],
    EDOFSS?: string[],
    EDORS?: IRsViewModel[],
    EDORP?: string[],
    EDOBR?: string[],
    AdditionalLogins?: boolean,
    ES_CD?: boolean,
    SMS?: boolean,
    FailerDocs?: boolean,
    Learn?: boolean,
    CertChange?: boolean,
    Agent?: IAgent,
    SelectedTariff?: ISelectedTariff,
    INN?: string,
    KPP?: string,
    OGRN?: string,
    LegalAddressFiasId?: string,
    CompanyShortName?: string,
    ContactPersonEmail: string,
    ContactPersonFullName: string,
    ContactPersonPhone: string,
    LastName?: string,
    FirstName?: string,
    MiddleName?: string,
    Post?: string,
    SNILS?: string,
    Utm: any,
    Comment: string,
}

export interface IPfrViewModel {
    Insurer?: string,
    UPFR?: string,
}

export interface IRsViewModel {
    OKPO?: string,
    Statistic?: string,
}

export interface IAgent {
  [x: string]: any;
    Name?: string,
    Code?: IAgentIdentifierCode,
    Inn?: string,
    Region?: number,
    
    Address?: string,
    Phone?: string,
    Order?: number,
    BeautifulPhone?: string,
    Coordinates?: string,
    Priority?: number
}

export interface ISelectedTariff {
    Name?: string,
    IsSpecialMode?: boolean,
    Region?: number,
    TariffPaymentPeriodType?: string,
    Price?: number,
}

export interface IAgentIdentifierCode {
    AI1?: string,
    AI2?: string,
    AI3?: string,
    AI4?: string,
}