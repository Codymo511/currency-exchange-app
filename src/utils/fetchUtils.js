export const Status = (response) => {
    if (response.ok) {
      return response;
    }
    throw new Error('Request failed');
  }
  export const json = (response) => response.json()