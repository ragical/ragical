import { useState } from "react";
import {
  SignOnForm,
  useRagicalContext,
  AuditProvider,
  AuditList,
  FormDialog,
} from "ragical-react-js";
import { RagicalProvider, setAPIURL } from "ragical-react-js";

// configure our API
setAPIURL(process.env.API_URL || "http://localhost:3280");

const RagicalApp = () => {
  const { account, onLogout } = useRagicalContext();
  const [loginView, setAuthView] = useState<boolean>(false);

  const onLoginFormEvent = () => setAuthView((x) => !x);
  
  return (
    <div className="px-4 py-2 space-y-2">
      {!account.authed ? <button onClick={onLoginFormEvent} className={"px-2 py-2 border rounded"}>Login or Register?</button> : <button onClick={onLogout} className={"px-2 py-2 border-b"}>Logout</button>}
      {loginView ? <SignOnForm /> : null}
      <AuditProvider persist multi={true}>
        <FormDialog
          buttonTitle="Run Audit"
          subTitle="Add a url to analyze below."
          submitTitle="Submit"
          activeSubscription
          submitButtonStyle="border-none py-3 text-center flex flex-1 w-full place-items-center place-content-center h-20"
          viewConfigs={{ disabled: { lighthouse: true } }}
        />
        <div className="py-2">
          <AuditList  />
        </div>
      </AuditProvider>
    </div>
  );
};

// wrap in top level provider
export function Accessibility() {
  return <RagicalProvider persist><RagicalApp /></RagicalProvider>;
}