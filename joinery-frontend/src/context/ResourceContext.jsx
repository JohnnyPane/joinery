import { createContext, useContext } from "react";
import useResourceController from "../hooks/useResourceController.js";

const ResourceContext = createContext(null);

export const ResourceProvider = ({ children, initial = {} }) => {
  const resourceController = useResourceController(initial);

  return (
    <ResourceContext.Provider value={resourceController}>
      {children}
    </ResourceContext.Provider>
  );
}

export const useResourceContext = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error("useResourceContext must be used within a ResourceProvider");
  }
  return context;
};