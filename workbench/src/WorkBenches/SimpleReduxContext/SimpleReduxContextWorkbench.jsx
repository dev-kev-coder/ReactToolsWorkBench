import { useSubscribe, PerformantContextProvider } from './ReduxContext/core';

const SimpleReduxContextWorkbench = () => {
  const test = useSubscribe();
  return (
    <section>
      <h1>SimpleReduxContextWorkbench</h1>
    </section>
  );
};

export default SimpleReduxContextWorkbench;
