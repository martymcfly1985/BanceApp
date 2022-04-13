export const fetchCourtData = async() => {
  const response = await fetch('api/getCourtData');
  const data = await response.json();

  return data;
}