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
        .then((res) => {
        if (res.status !== 200) 
            throw new Error(`Unable to fetch PQs. Response status: ${res.status}`)    
        return res.data.results;
    })
    .catch((error) => {
        throw error
    });
};

// This function is called in the HomePage component to retrieve the PQs as well as data for pagination
export const fetchPQsPage = async (skip: number, limit: number) => {
    const response = await axios.get(`https://api.oireachtas.ie/v1/questions?skip=${skip}&limit=${limit}&qtype=oral,written`);
    return response;
};


// Function to retrieve paginated data with Date filter turned on
export const fetchFilteredPQs = async (skip: number, limit: number, year: number, member: string) => {
    const response = await axios.get(`https://api.oireachtas.ie/v1/questions?date_start=${year}-01-01&date_end=${year}-12-31skip=${skip}&limit=${limit}&qtype=oral,written&member_id=${member}`);
    return response;
};

// Function to retrieve paginated data with date/member params - different axios call
export const fetchPQsWithParams = async (skip: number, limit: number, startYear: string, endYear: string, memberParam: string) => {
    const params = {
        date_start: `${startYear}-01-01`,
        date_end: `${endYear}-12-31`,
        limit: limit,
        skip: skip,
        qtype: `oral,written`,
        member_id: memberParam
    }
    const response = await axios.get(`https://api.oireachtas.ie/v1/questions?`, {
        params: {
            ...params
        }
    });
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

export const fetchMembers = async (memberSearch: string) => {
    const response = await axios.get(`https://api.oireachtas.ie/v1/members?fuzzy_name_search=${memberSearch}`);
    return response;
};