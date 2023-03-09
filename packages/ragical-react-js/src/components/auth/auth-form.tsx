import React, { FormEvent, useState } from "react";
import { API_URL } from "../../config/api";
import { useRagicalContext } from "../../providers/app";

// todo: loading spinner
export const SignOnForm = () => {
  const { setAccountType } = useRagicalContext();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [registerForm, setRegister] = useState<boolean>();
  const [error, setError] = useState<string>("");

  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      const res = await fetch(
        `${API_URL}/api/${registerForm ? "register" : "login"}`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();

      const user = json?.data;

      if (user) {
        // reset the error message
        if (error) {
          setError("");
        }
        setAccountType({
          authed: true,
          email: user.email,
          jwt: user.jwt,
          role: user.role,
          activeSubscription: user.activeSubscription,
        });
      } else {
        setError(json?.message ?? "Error with API.");
      }
    }
  };

  const onToggleFormType = () => setRegister((x) => !x);

  return (
    <div className="space-y-2 border rounded px-4 py-3">
      <p className="text-xl font-medium">
        Ragical {registerForm ? "Register" : "Login"}
      </p>
      <div
        className={`${error ? "block" : "hidden"} py-2`}
        aria-hidden={!error}
      >
        {error}
      </div>
      <form onSubmit={onSubmitEvent} noValidate className="space-x-2 space-y-2">
        <label className="space-x-2">
          Email
          <input
            placeholder="Enter email..."
            type={"email"}
            onChange={onChangeEmail}
            required
            autoComplete="email"
            className={"ml-2 p-2 border rounded"}
          ></input>
        </label>
        <label className="space-x-2">
          Password
          <input
            placeholder="Enter password..."
            type={"password"}
            minLength={6}
            required
            onChange={onChangePassword}
            autoComplete={registerForm ? "new-password" : "current-password"}
            className={"ml-2 p-2 border rounded"}
          ></input>
        </label>
        <button type="submit" className={"border rounded px-3 py-2"}>
          Submit
        </button>
      </form>

      <button onClick={onToggleFormType} className={"border rounded px-3 py-2"}>
        {registerForm ? "Login" : "Register"} Account
      </button>
    </div>
  );
};
