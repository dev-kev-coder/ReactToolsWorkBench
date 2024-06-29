import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

const PerformantContext = createContext(null);
const PerformantSetterContext = createContext(null);

const PerformantContextProvider = ({ children, intialState }) => {
  const [state, setState] = useState(intialState);

  const stateSetter = useCallback((callback) => {
    callback(setState);
  }, []);

  return (
    <>
      <PerformantContext.Provider value={state}>
        <PerformantSetterContext.Provider value={stateSetter}>
          {children}
        </PerformantSetterContext.Provider>
      </PerformantContext.Provider>
    </>
  );
};

const useSubscribe = (selector) => {
  const state = useContext(PerformantContext);
  const selectedValue = selector(state);
  const [subScribedState, _] = useState(selector(selectedValue));
  const prevValue = useRef(null);

  if (prevValue.current === null) {
    prevValue.current = selectedValue;
  } else if (prevValue.current !== selectedValue) {
    prevValue.current = selectedValue;
  }

  return useMemo(() => subScribedState, [prevValue.current]);
};

export { PerformantContextProvider, useSubscribe };
