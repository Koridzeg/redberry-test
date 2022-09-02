const API_URL = "https://pcfy.redberryinternship.ge/api";

const getTeams = () => fetch(API_URL + "/teams");

const getPositions = () => fetch(API_URL + "/positions");

const getBrands = () => fetch(API_URL + "/brands");

const getCPUS = () => fetch(API_URL + "/cpus");

export { getTeams, getPositions, getBrands, getCPUS };