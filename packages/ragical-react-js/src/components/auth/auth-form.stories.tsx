import React, { FunctionComponent } from "react";
// import { action } from "@storybook/addon-actions";
import { withA11y } from "@storybook/addon-a11y";
import { SignOnForm } from "./auth-form";
import { RagicalProvider } from "../../providers/app";

export const Default = ({ children = "Default" }) => {
  return (
    <RagicalProvider persist>
      <SignOnForm />
    </RagicalProvider>
  );
};

export default {
  title: "SignOnForm",
  decorators: [withA11y],
  component: SignOnForm,
};
