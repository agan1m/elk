import createContext from 'preact-context';

const TypeContext = createContext({
  type: -1,
});

export const Provider = TypeContext.Provider;
export const Consumer = TypeContext.Consumer;

export default TypeContext;
