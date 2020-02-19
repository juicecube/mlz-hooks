import { useEffect, useRef } from 'react';

type Target = HTMLElement | Window;
type Options = { capture?:boolean; once?:boolean; passive?:boolean }
type Dom = Target | null;

function useEvent(
    eventName:string,
    handler:Function,
    element:Dom = window,
    options?:Options,
) {
  // 利用ref来保存传入的handler函数，重新渲染时不变
  const savedHandler = useRef<Function>();

  // 监听handler的变化，变化后更新handler的值
  useEffect(() => {
    console.log('handler ref change');
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element?.addEventListener;

    // ie9以下是不支持addEventListener的
    if (!isSupported) return;

    const eventListener = (
      event:Event,
    ):EventListenerOrEventListenerObject | AddEventListenerOptions =>
      savedHandler.current?.(event);

    element?.addEventListener(eventName, eventListener, {
      capture: options?.capture,
      once: options?.once,
      passive: options?.passive,
    });

    return () => {
      element?.removeEventListener(eventName, eventListener, {
        capture: options?.capture,
      });
    };
  }, [eventName, element, options]);
}


export default useEvent;

