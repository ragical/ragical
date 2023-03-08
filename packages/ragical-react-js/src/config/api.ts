const windowApi =
  // @ts-ignore
  typeof window !== "undefined" && window.NEXT_PUBLIC_RAGICAL_API;

let API_URL = "https://api.RAGICAL.com";

if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_RAGICAL_API) {
  API_URL = process.env.NEXT_PUBLIC_RAGICAL_API;
} else if (windowApi) {
  API_URL = windowApi;
}

// manually set the api url
const setAPIURL = (api: string) => {
  API_URL = api;
};

export { API_URL, setAPIURL };
