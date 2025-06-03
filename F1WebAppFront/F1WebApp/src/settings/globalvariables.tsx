import { createContext, useContext, useState, ReactNode } from 'react';

type GlobalVariablesContextType = {
  showNews: boolean;
  setShowNews: (value: boolean) => void;
  showForum: boolean;
  setShowForum: (value: boolean) => void;
  showVotings: boolean;
  setShowVotings: (value: boolean) => void;
};

const GlobalVariablesContext = createContext<GlobalVariablesContextType | undefined>(undefined);

export const GlobalVariablesProvider = ({ children }: { children: ReactNode }) => {
  const [showNews, setShowNews] = useState(true);
  const [showForum, setShowForum] = useState(true);
  const [showVotings, setShowVotings] = useState(true);

  return (
    <GlobalVariablesContext.Provider value={{
      showNews, setShowNews,
      showForum, setShowForum,
      showVotings, setShowVotings
    }}>
      {children}
    </GlobalVariablesContext.Provider>
  );
};

export const useGlobalVariables = (): GlobalVariablesContextType => {
  const context = useContext(GlobalVariablesContext);
  if (!context) throw new Error("useGlobalVariables must be used within GlobalVariablesProvider");
  return context;
};