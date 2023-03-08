"use client";

import React, { createContext, useContext, FC, PropsWithChildren } from "react";
import { useAccount } from "../hooks/account";

const defaultAccount = {
  activeSubscription: false,
  authed: false,
  email: "",
  jwt: "",
  role: 0,
};

const AppContext = createContext({
  account: defaultAccount,
  setAccountType: (_x: typeof defaultAccount) => {},
  onLogout: () => {},
});

const RagicalProviderBase = AppContext.Provider;

type RagicalProps = { persist?: boolean };

const RagicalProviderWrapper: FC<PropsWithChildren<RagicalProps>> = ({
  children,
  persist,
}) => {
  const state = useAccount(persist);

  return (
    <RagicalProviderBase value={state}>{children}</RagicalProviderBase>
  );
};

/**
 * Top level app provider. Wrap this around the entire app.
 * @param children children to render
 * @param persist persist values with restore and refresh
 * @example <caption>Example of using the provider</caption>
 * function Application(){
 *  return <RagicalProviderWrapper><App /><RagicalProviderWrapper />;
 * }
 * @returns {React.FC<React.PropsWithChildren<RagicalProps>>} Returns the top level provider for the app.
 */
export const RagicalProvider: FC<PropsWithChildren<RagicalProps>> = ({
  children,
  persist,
}) => {
  return (
    <RagicalProviderWrapper persist={persist}>
      {children}
    </RagicalProviderWrapper>
  );
};

/**
 * Top level app provider hook.
 * @example <caption>Example of using the hook</caption>
 * function App() {
 *  const { account } = useRagicalContext()
 *
 *  return <div>{account.email}</div>
 * }
 * function Application(){
 *  return <RagicalProviderWrapper><App /><RagicalProviderWrapper />;
 * }
 * @returns {{ account: Account, setAccountType }} Returns a hook of the top level provider to manage account state.
 */
export function useRagicalContext() {
  return useContext(AppContext);
}
