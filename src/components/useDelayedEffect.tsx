import React from "react";
  /** 
   * グラフにpropsで送られるデータにラグがあるので非同期処理で遅延させてからデータを処理することが必要。
  * @see https://qiita.com/stin_dev/items/e10e82650e02784e1e36/
  * @author yosuke hiraoka 
  */  
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
