export const fetchCourtData = async() => {
  const response = await fetch('getCourtData');
  const data = await response.json();

  return data;
}