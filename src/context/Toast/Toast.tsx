import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  IGTToast,
  IGTToastContext,
  IGTToastItem,
  IGTToastProvider,
  TToast,
} from "../interface";
import Toast from "./style";
import { AlertCircle, CheckCircle, Info, X, XOctagon } from "react-feather";
import { Text } from "../../components";
import clsx from "clsx";

const GTToastContext = createContext<IGTToastContext>({
  toast: () => {
    return 0;
  },
  children: null,
});

export const useGTToastContext = () => {
  const context = useContext(GTToastContext);

  if (context === undefined) {
    throw new Error("useGTToastContext must be used within a GTToastContext");
  }

  return context;
};

function GTToastProvider({ children }: IGTToastProvider) {
  const [state, setState] = useState<IGTToast[]>([]);

  const toast: TToast = useCallback((message, options = {}) => {
    const id = Date.now();
    setState((prev) => [...prev, { message, options, id: Date.now() }]);

    return id;
  }, []);

  const removeToast = useCallback((id: number) => {
    setState((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <GTToastContext.Provider value={{ toast }}>
      {children}
      <Toast.Wrapper>
        {state.map((props) => (
          <ToastItem {...props} removeToast={removeToast} key={props.id} />
        ))}
      </Toast.Wrapper>
    </GTToastContext.Provider>
  );
}

export default GTToastProvider;

const ICONS_MAP = {
  success: <CheckCircle />,
  info: <Info />,
  warning: <AlertCircle />,
  error: <XOctagon />,
};

const ToastItem = ({ message, options, removeToast, id }: IGTToastItem) => {
  const { type = "success", duration = 5000 } = options;

  // 300ms
  // width goes from 100% to 0%
  const [timer, setTimer] = useState(100);
  const [hide, setHide] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toast = ref.current;

    if (toast == null) return;

    const totalAmountToReduce = 100;

    const reductionAmount = totalAmountToReduce / (duration / 100);

    const interval = setInterval(() => {
      // if the mouse is over the toast, don't remove it
      if (toast.matches(":hover")) return;

      setTimer((prev) => {
        const newValue = prev - reductionAmount;
        if (newValue <= 0) {
          setHide(true);

          setTimeout(() => {
            removeToast(id);
          }, 500);
        }

        return newValue;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [duration, id, removeToast]);

  const handleClose = useCallback(() => {
    setHide(true);

    setTimeout(() => {
      removeToast(id);
    }, 500);
  }, [id, removeToast]);

  return (
    <Toast.Content ref={ref} className={clsx(hide && "hide")}>
      <div className="toast_close" onClick={handleClose}>
        <X size={15} />
      </div>
      {ICONS_MAP[type]}
      <Text.P>{message}</Text.P>
      <Toast.Timer
        style={{
          width: `${timer}%`,
        }}
        className={type}
      />
    </Toast.Content>
  );
};
