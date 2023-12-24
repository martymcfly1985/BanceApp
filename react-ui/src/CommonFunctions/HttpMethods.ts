export async function get<T>(route: string): Promise<T> {
  const response = await fetch(route);
  if (!response.ok) {
    const error = new Error();
    error.message = response.statusText
    throw error;
  }
  const data: T = await response.json();

  return data;
}

export async function post<T>(route: string, parameters: Record<string, any> | any): Promise<T> {
  const response = await fetch(route, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(parameters)
  });

  if (!response.ok) {
    const error = new Error();
    error.message = response.statusText
    throw error;
  }

  if (response.headers.get('content-length') !== "0") {
    const returnedData: T = await response.json();
    return returnedData;
  }

  return undefined as any;
  
}