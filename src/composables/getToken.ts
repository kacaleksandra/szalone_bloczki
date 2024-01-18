import useAccessTokenStore from "./store";

export function getToken() {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  return accessToken;
}
