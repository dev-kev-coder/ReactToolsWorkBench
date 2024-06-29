import { useSubscribe, PerformantContextProvider } from './ReduxContext/core';

const SimpleReduxContextWorkbench = () => {
  const test = useSubscribe((state) => state);
  return (
    <section>
      <h1>SimpleReduxContextWorkbench</h1>
    </section>
  );
};

export default SimpleReduxContextWorkbench;
