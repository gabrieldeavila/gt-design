import { useEffect, useCallback } from "react";

function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  avoidComponents: Array<React.RefObject<HTMLElement>> | null,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  const tabListener = useCallback(
    (event: any) => {
      if (event.key === "Tab") {
        handler(event);
      }
    },
    [handler]
  );

  const listener = useCallback(
    (event: any) => {
      if (ref.current == null || ref.current.contains(event.target)) {
        return;
      }

      if (
        avoidComponents?.some((avoidComponent) =>
          avoidComponent.current?.contains(event.target)
        ) ??
        false
      ) {
        return;
      }

      handler(event);
    },
    [avoidComponents, handler, ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keydown", tabListener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keydown", tabListener);
    };
  }, [ref, handler, avoidComponents, listener, tabListener]);
}

export default useOnClickOutside;
