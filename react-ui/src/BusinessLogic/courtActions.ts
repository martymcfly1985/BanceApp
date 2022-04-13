export const fetchCourtData = async() => {
  const response = await fetch('banceapp/api/getCourtData');
  const data = await response.json();

  return data;
}