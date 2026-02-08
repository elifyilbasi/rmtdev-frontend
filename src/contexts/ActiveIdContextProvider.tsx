import { createContext, useContext } from "react";
import { useActiveId } from "../lib/hooks";

type ActiveIdContext = {
  activeId: number | null;
};

const ActiveIdContext = createContext<ActiveIdContext | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveId();
  return (
    <ActiveIdContext
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext>
  );
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error(
      "useContext(ActiveIdContext) must be used within a ActiveIdContextProvider",
    );
  }
  return context;
}
