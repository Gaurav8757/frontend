/* eslint-disable react/prop-types */
// Context.js
import { createContext, useContext } from 'react';

const HomesectionContext = createContext();

const HomesectionProvider = ({ children, initialHomesection }) => (
  <HomesectionContext.Provider value={initialHomesection}>
    {children}
  </HomesectionContext.Provider>
);

const useHomesection = () => useContext(HomesectionContext);

export { HomesectionProvider, useHomesection };
