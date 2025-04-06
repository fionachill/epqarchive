import axios from 'axios';
import { encodeUri } from "../utils/utilities.ts";

// This is the function for calling the local test data from the backend API
export const fetchSamplePQs = async () => {
    return axios.get(`http://localhost:3000/pqs`)
    .then((res) => res.data);
};

// This function is called in the Home Page component to retrieve the first 10 PQs
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


// Home Page functions - retrieve the API data and transform it into a better format 
const pqListInstance = axios.create({
    baseURL: `https://api.oireachtas.ie/v1/questions?`
});


pqListInstance.interceptors.response.use(response => {
    if(response && Array.isArray(response.data.results)){
        response.data.results = response.data.results.map(result => ({
            id: encodeUri(result.question.uri),
            question: {
                date: result.question.date,
                xml: result.question.debateSection.formats.xml.uri,
                topic: result.question.debateSection.showAs,
                questionText: result.question.showAs,
                td: result.question.by.showAs,
                tdUri: result.question.by.uri,
                dept: result.question.to.showAs,
                questionType: result.question.questionType,
                uri: result.question.uri
            }}))
        }
        return response;
    });

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
    const response = await pqListInstance.get(`https://api.oireachtas.ie/v1/questions?`, {
        params: {
            ...params
        }
    });
    return response;
};

// Function to retrieve PQs with a search query - no extra params
export const fetchAllPQs = async() => {
    const response = await pqListInstance.get(`https://api.oireachtas.ie/v1/questions?`, {
        params: {
            limit: 100,
        }
    });
    return response;
};




// These functions are used in the PQDetailPage component together to retrieve data 

export const fetchOnePQ = async (uri: string) => {
    const response = await pqListInstance.get(`https://api.oireachtas.ie/v1/questions?`, {
        params: {
            question_id: uri
        }
    });
    return response;
};


export const fetchXML = async (uri: string) => {
    return await axios.get(`http://localhost:3000/api/fetch-xml?url=${uri}`)
    .then((res) => res.data);
};

// This API call is used with the filter typeahead to populate the options with a list of Dáil members

const memberInstance = axios.create({
    baseURL: `https://api.oireachtas.ie/v1`
});

memberInstance.interceptors.response.use(response => {
    if(response && Array.isArray(response.data.results)){
        response.data.results = response.data.results.map(result => ({
                fullName: result._source.member.fullName,
                uri: result._source.member.uri
        }))
    }
    return response;
});

export const fetchMembers = async (memberSearch: string) => {
    const response = await memberInstance.get(`/members?`, {
        params: {
            fuzzy_name_search: memberSearch
        }
    });
    return response;
};