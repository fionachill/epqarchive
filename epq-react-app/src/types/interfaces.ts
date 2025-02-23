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
    id?: string;                    // This has been added for the encoded URI
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
        },
        to: {
            showAs: string;             // This is the name of the Department that the question is addressed to
        },
        questionType: string;           // This is the type of question asked, Oral or Written 
        uri: string;                    // This is the ID of the question 
    }
}
