import React from "react";
import { withA11y } from "@storybook/addon-a11y";
import { AuditForm } from "./audit-input";
import { RagicalProvider } from "../../providers/app";
import { AuditProvider } from "../../providers/audit";
import { AuditList } from "../lists/audit-list";

// just the form without the list
export const Default = () => {
  return (
    <RagicalProvider persist>
      <AuditProvider>
        <AuditForm />
      </AuditProvider>
    </RagicalProvider>
  );
};

// persist the audit
const Component = ({
  persist,
  multi,
  disableStats,
}: {
  persist?: boolean;
  multi?: boolean;
  disableStats?: boolean;
}) => {
  return (
    <RagicalProvider persist>
      <AuditProvider persist={persist} multi={multi}>
        <AuditForm clear />
        <AuditList disableStats={disableStats} />
      </AuditProvider>
    </RagicalProvider>
  );
};

export const List = () => {
  return <Component />;
};

export const ListPersist = () => {
  return <Component persist />;
};

export const MultiPersistList = () => {
  return <Component multi persist />;
};

export const MultiPersistListNoStats = () => {
  return <Component multi persist disableStats />;
};

export const ListPersistCustomKeys = () => {
  return (
    <RagicalProvider persist>
      <div className="space-y-4">
        <AuditProvider persist={"website-1"}>
          <AuditForm clear />
          <div className="max-h-96 overflow-y-auto">
            <AuditList />
          </div>
        </AuditProvider>
        <AuditProvider persist={"website-2"}>
          <AuditForm clear />
          <div className="max-h-96 overflow-y-auto">
            <AuditList />
          </div>
        </AuditProvider>
      </div>
    </RagicalProvider>
  );
};

export default {
  title: "AuditForm",
  decorators: [withA11y],
  component: AuditForm,
};
