import React from "react";
import { withA11y } from "@storybook/addon-a11y";
import { FormDialog } from "./form-dialog";
import { RagicalProvider } from "../../providers/app";
import { AuditProvider } from "../../providers/audit";
import { AuditList } from "../lists/audit-list";

export const Default = () => {
  return (
    <RagicalProvider persist>
      <AuditProvider multi>
        <FormDialog />
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
    <RagicalProvider>
      <AuditProvider multi={multi}>
        <FormDialog />
        <AuditList disableStats={disableStats} />
      </AuditProvider>
    </RagicalProvider>
  );
};

export const List = () => {
  return <Component />;
};

export default {
  title: "FormDialog",
  decorators: [withA11y],
  component: FormDialog,
};
