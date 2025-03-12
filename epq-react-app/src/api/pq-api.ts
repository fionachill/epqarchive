import axios from 'axios';

// This is the function for calling the local test data from the backend API
export const fetchSamplePQs = async () => {
    return axios.get(`http://localhost:3000/pqs`)
    .then((res) => res.data);
};

// This function is called in the Home Page component to retrieve the list of PQs
export const fetchPQs = async () => {
    return axios.get(
        `https://api.oireachtas.ie/v1/questions?limit=10&qtype=oral,written`)
        .then((res) => res.data.results);
};

// This function is called in the HomePage component to retrieve the PQs as well as data for pagination
export const fetchPQsPage = async (skip: number, limit: number) => {
    const response = await axios.get(`https://api.oireachtas.ie/v1/questions?skip=${skip}&limit=${limit}&qtype=oral,written`);
    return response;
};


// These functions are used in the PQDetailPage component together to retrieve data 

export const fetchPQData = async (uri: string) => {
    return await axios.get(`https://api.oireachtas.ie/v1/questions?qtype=oral,written&question_id=${uri}`)
    .then((res) => res.data.results[0]);
};

export const fetchXML = async (uri: string) => {
    return await axios.get(`http://localhost:3000/api/fetch-xml?url=${uri}`)
    .then((res) => res.data);
};