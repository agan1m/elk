'use strict';

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

export interface IAgentIdentifierCode {
    AI1?: string,
    AI2?: string,
    AI3?: string,
    AI4?: string,
}