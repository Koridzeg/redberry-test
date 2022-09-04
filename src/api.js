import axios from "axios";

const API_URL = "https://pcfy.redberryinternship.ge/api";

const getTeams = () => axios.get(API_URL + "/teams");

const getPositions = () => axios.get(API_URL + "/positions");

const getBrands = () => axios.get(API_URL + "/brands");

const getCPUS = () => axios.get(API_URL + "/cpus");

const getLaptops = () =>
  axios.get(API_URL + `/laptops?token=${process.env.REACT_APP_TOKEN}`);

const getLaptopById = (id) =>
  axios.get(API_URL + `/laptop/${id}?token=${process.env.REACT_APP_TOKEN}`);

const createLaptop = (data) => {
  return axios.post(API_URL + "/laptop/create", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export {
  getTeams,
  getPositions,
  getBrands,
  getCPUS,
  createLaptop,
  getLaptops,
  getLaptopById
};