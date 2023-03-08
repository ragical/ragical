## react-ragical-js

Unstyled React components and hooks.

Built with performant, native, customizable components, and hooks that can be used for any situation as in re-building custom accessibility solutions, special audit pages, external handling of Ragical and much more.

![multi page audit components for jeffmendez.com example](https://user-images.githubusercontent.com/8095978/210292974-d75680c2-7394-420a-b5b5-fe6b6044f21d.png)

## Getting Started

1. `npm install react-ragical-js`

### Required Dependencies

1. `react`. ^16

This package handles the above as peers and require installation manually.

## Usage

First wrap the section of the app that needs to use Ragical with the [RagicalProvider](./src/providers/app.tsx).

The `persist` prop stores user data to disk if set to true.

```tsx
import { RagicalProvider, setAPIURL } from "react-ragical-js";

// optional: set apiURL - you can also use the env.NEXT_PUBLIC_RAGICAL_API or window.NEXT_PUBLIC_RAGICAL_API
setAPIURL("http://localhost:3280");

export default function Home() {
  return (
    <RagicalProvider persist>
      <App />
    </RagicalProvider>
  );
}
```

Now inside the `App` component you can use the hooks.

```tsx
import { useRagicalContext } from "react-ragical-js";

export default function App() {
  const { account } = useRagicalContext();
  return <div>Email {account.email}</div>;
}
```

Use the SignOnForm component to authenticate.

```tsx
import { useRagicalContext, SignOnForm } from "react-ragical-js";

export default function App() {
  const { account } = useRagicalContext();

  return (
    <div>
      Welcome {account.email ? account.email : null}
      <SignOnForm />
    </div>
  );
}
```

Full example managing account subscriptions and auth.

```tsx
import React, { useEffect } from "react";
import {
  RagicalProvider,
  SignOnForm,
  useRagicalContext,
} from "react-ragical-js";
import { StripeProvider } from "react-ragical-js/providers/stripe";
import { CheckoutForm } from "react-ragical-js/components/stripe/checkout";
import { PaymentPlans } from "react-ragical-js/components/payment-plans";
import { PaymentsProvider } from "react-ragical-js/providers/payments";

// build a payment view based on the components.
const PaymentsView = () => {
  const { account } = useRagicalContext();

  useEffect(() => {
    // do something with account on change
    console.log(account);
  }, [account]);

  return (
    <div className="space-y-2">
      <div className="text-xl">Welcome {account.email}</div>
      <PaymentsPlans />
      <StripeProvider>
        <CheckoutForm />
      </StripeProvider>
    </div>
  );
};

const MainApp = () => {
  const { account } = useRagicalContext();

  return account.authed ? (
    <PaymentsProvider>
      <PaymentsView />
    </PaymentsProvider>
  ) : (
    <SignOnForm />
  );
};

// wrap in auth provider
export function App() {
  return (
    <RagicalProvider persist>
      <MainApp />
    </RagicalProvider>
  );
}
```

Perform a live audit scan on a url, make sure to be authenticated first.

```tsx
import React, { useEffect } from "react";
import {
  RagicalProvider,
  AuditProvider,
  AuditForm,
  AuditList,
  useAuditContext,
} from "react-ragical-js";

function MyAudit() {
  const { report, loading } = useAuditContext();

  console.log(report, loading);

  return (
    <>
      <AuditForm />
      <AuditList />
    </>
  );
}

export function Auditer() {
  return (
    <RagicalProvider persist>
      <AuditProvider persist>
        <MyAudit />
      </AuditProvider>
    </RagicalProvider>
  );
}
```

Multiple audits example with persisting to disk:

```tsx
import React from "react";
import {
  RagicalProvider,
  AuditProvider,
  AuditForm,
  AuditList,
} from "react-ragical-js";

export function Auditer() {
  return (
    <RagicalProvider persist>
      <div className="space-y-4">
        <AuditProvider persist={"website-1"}>
          <AuditForm />
          <div className="max-h-96 overflow-y-auto">
            <AuditList />
          </div>
        </AuditProvider>
        <AuditProvider persist={"website-2"}>
          <AuditForm />
          <div className="max-h-96 overflow-y-auto">
            <AuditList />
          </div>
        </AuditProvider>
      </div>
    </RagicalProvider>
  );
}
```

Multi page audits with the `multi` prop:

```tsx
import React from "react";
import {
  RagicalProvider,
  AuditProvider,
  AuditForm,
  AuditList,
} from "react-ragical-js";

export function Auditer() {
  return (
    <RagicalProvider persist>
      <AuditProvider persist multi>
        <AuditForm />
        <AuditList />
      </AuditProvider>
    </RagicalProvider>
  );
}
```

Use pre-compilled tailwind styles:

```tsx
import "react-ragical-js/css/tailwind.css";
```

### Hooks

You can also use the hooks without the UI to perform all events and actions.

```tsx
import React from "react";
import {
  RagicalProvider,
  AuditProvider,
  AuditForm,
  AuditList,
  streamAudit,
  useRagicalContext,
  useEffect,
  Report
} from "react-ragical-js";

const AutoAudit = () => {
  const { account } = useRagicalContext();
  const { dispatchReport } = useAuditContext();

  // auto crawl on mount
  useEffect(() => {
    const cb = (report) => {
      // do something with report prior or after
      dispatchReport(report) // bind state updates manually
    }
    // custom native fetch streaming response
    streamAudit({{ url: "https://RAGICAL.com", cb }, account.jwt}) // second param JWT to use for request
  }, [])

  return null;
}

export function Auditer() {
  return (
    <RagicalProvider persist>
      <AuditProvider persist multi>
        <AutoAudit />
        <AuditList />
      </AuditProvider>
    </RagicalProvider>
  );
}
```

Todo.. more examples.

## Config

You can add the `persist` prop to providers for storing to disk and retrieval.

## ENV

You can use the `NEXT_PUBLIC_RAGICAL_API` env var to set the base url of the API ex: `http://localhost:3280`.

## Storybook

Once you login or register you can the other components that require authentication.

## Development

node v14 - v18.

To get started developing run `yarn` to install the modules and `yarn storybook` to start the instance locally.

## Extra Info

The payments and stripe portions need direct imports since we want to make those portions optional for the bundle.

## LICENSE

check the license file in the root of the project.
