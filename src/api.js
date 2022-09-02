const API_URL = "https://pcfy.redberryinternship.ge/api";

const getTeams = () => fetch(API_URL + "/teams");

const getPositions = () => fetch(API_URL + "/positions");

const getBrands = () => fetch(API_URL + "/brands");

const getCPUS = () => fetch(API_URL + "/cpus");

const createLaptop = (data) =>
  fetch(API_URL + "/laptop/create", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

export { getTeams, getPositions, getBrands, getCPUS };