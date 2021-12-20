import { useReducer, createContext } from 'react';

const initialState = {
  draver: {
    open: false
  }
};

const store = createContext({
  state: initialState,
  dispatch: () => null
});

const { Provider } = store;

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_DRAVER':
      return {
        ...state,
        draver: {
          open: action.open
        }
      };
    default:
      return state;
  }
};

const StateProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Provider value={{ state, dispatch }}>
      {props.children}
    </Provider>
  );
};

export { store, StateProvider };