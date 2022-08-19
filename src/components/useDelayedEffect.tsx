import React from "react";

export const useDelayedEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList,
  delaytime: number = 1000,
) => {
  const [waiting, setWaiting] = React.useState(false);
  const timer = React.useRef<number>();

  React.useEffect(() => {
    window.clearTimeout(timer.current);

    setWaiting(true);

    timer.current = window.setTimeout(() => {
      setWaiting(false);
    }, delaytime);
  }, deps);

  React.useEffect(() => {
    if (!waiting) {
      effect();
    }
  }, [waiting]);
};
