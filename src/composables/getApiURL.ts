export function getApiURL() {
  const apiURL = process.env["BASE_URL"];
  console.log("qtas", apiURL);
  return apiURL;
}
