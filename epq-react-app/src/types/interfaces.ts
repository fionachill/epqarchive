// This type interface is for historical data returned by my express API
// export interface BasePQProps {
//     id: number;
//     due_oireachtas: string;
//     question: string;
//     pqref: string;
// }

export interface BasePQListProps {
    pqs: BasePQProps[];
}


export interface BasePQProps {
    id: string;                    // This has been added for the encoded URI
    question: {
        date: string;
        debateSection: {
            showAs: string;                 // This is a brief description of the question topic
            formats: {
                xml:{
                    uri: string;            // This leads to the XML file associated with the question
                }, 
            },
        },
        showAs: string;                 // This is the full question text        
        by: {
            showAs: string;             // This is the name of the TD that asked the question
            memberCode: string;         // This is the TD's member code - may be useful to link to other questions they've asked
            uri: string;                // This is the uri of the TD that asked the question, may be useful to link to other questions they've asked   
        },
        to: {
            showAs: string;             // This is the name of the Department that the question is addressed to
        },
        questionType: string;           // This is the type of question asked, Oral or Written 
        uri: string;                    // This is the ID of the question 
    }
}

export interface DetailsProps {
    uri: string;
    TLCPerson:{
        eId: string;
        showAs: string;
    }[],
    TLCRole:{
        eId: string;
        showAs: string;
    }[],
    speech: {
        by: string;
        as?: string;
        eId: string;
        from: {
            _: string;               // This is name of the person who spoke 
        },
        p: {
            _: string;
            eId: string;
      }[],      
    }[];
}

export interface PQDetailsProps {
    pq: BasePQProps;
    details: DetailsProps;
}