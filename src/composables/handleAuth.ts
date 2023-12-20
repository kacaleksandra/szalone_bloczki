import useAccessTokenStore from "./store";
import { getApiURL } from "./getApiURL";

interface FormData {
  login: string;
  password: string;
}

export const handleAuth = async (
  data: FormData,
  endpoint: string,
  successCallback: () => void,
  errorCallback: () => void
) => {
  try {
    const apiUrl = getApiURL();
    const apiEndpoint = endpoint;

    const response = await fetch(`${apiUrl}${apiEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: data.login,
        password: data.password,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      useAccessTokenStore.setState({
        accessToken: responseData.access_token,
      });

      successCallback();
    } else {
      errorCallback();
    }
  } catch (error) {
    errorCallback();
  }
};
