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
        // console.log(response.data.results);
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
    const allPQs = [];
    const response = await axios.get(`https://api.oireachtas.ie/v1/questions?limit=10000&qtype=oral,written`);
    if (response.status !== 200) {
        console.log("Unable to fetch PQs.");
        return;
    } else {
        for(let i = 0; i < response.data.results.length; i++) {
            const question = response.data.results[i].question;
            const pq = { 
                date: question.date,
                xml: question.debateSection.formats.xml.uri,
                topic: question.debateSection.showAs,
                questionText: question.showAs,
                td: question.by.showAs,
                tdUri: question.by.uri,
                dept: question.to.showAs,
                questionType: question.questionType,
                uri: question.uri,
            };
            allPQs.push(pq);
        };
        return allPQs;   
    }
};




// These functions are used in the PQDetailPage component together to retrieve data 

export const fetchPQData = async (uri: string) => {
    return await axios.get(`https://api.oireachtas.ie/v1/questions?qtype=oral,written&question_id=${uri}`)
    .then((res) => res.data.results[0]);
};



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

export const fetchMembers = async (memberSearch: string) => {
    const response = await axios.get(`https://api.oireachtas.ie/v1/members?fuzzy_name_search=${memberSearch}`);
    return response;
};