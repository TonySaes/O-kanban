export const httpRequester = {
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, body) => request("POST", endpoint, body),
  patch: (endpoint, body) => request("PATCH", endpoint, body),
  put: (endpoint, body) => request("PUT", endpoint, body),
  delete: (endpoint) => request("DELETE", endpoint),
};

async function request(method, endpoint, body) {
  const accessToken = localStorage.getItem("token");

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${endpoint}`, {
    method,
    headers: {
      ...(body && { "Content-Type": "application/json" }),
      ...accessToken && { Authorization: `Bearer ${accessToken}` },
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    console.error(response);
    throw new Error(`Failed to fetch ${method} ${endpoint}: ${response.statusText}`);
  }

  // Certaines routes API ne renvoie pas de body (ex: routes DELETE avec retour 204 No Content)
  if (! response.headers.get("Content-Type")?.includes("application/json")) {
    return null;
  }
  
  return await response.json();
}
