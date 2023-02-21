import { useId, useMemo } from "react";

function useUniqueName({ name }: { name: string }) {
  const id = useId();
  const uniqueName = useMemo(() => {
    return name != null ? `${name}-${id}` : id;
  }, [id, name]);

  return uniqueName;
}

export default useUniqueName;
