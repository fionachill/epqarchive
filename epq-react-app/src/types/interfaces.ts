// This type interface is for historical data returned by my express API
// export interface BasePQProps {
//     id: number;
//     due_oireachtas: string;
//     question: string;
//     pqref: string;
// }

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

//This may be used to transform the format of the returned PQs for legibility
export interface BasePQPropsShort {
    id: string;
    question: {
        date: string;
        xml: string;
        topic: string;
        questionText: string;
        td: string;
        tdUri: string;
        dept: string;
        questionType: string;
        uri: string;
    }
}


export interface BasePQListProps {
    pqs: BasePQProps[];
}

export interface TestPQListProps {
    pqs: BasePQPropsShort[];
}

export interface HomePageProps {
    page?: number;
    head: {
        counts: {
            questionCount: number;
            resultCount: number;
        },
        dateRange: {
            start: string,
            end: string
        }
    },
    results: BasePQProps[];
}

export interface paginateProps {
    currentPage: number,
    resultCount: number,
    limit: number,
    onPageChange: (pageNum: number) => void,
}

export interface BaseSpeechProps {
    speaker: string;
    fullText: string;
    eId: string;
}

export interface SpeechListProps {
    speeches: BaseSpeechProps[];
}

export interface DetailsProps {
    uri?: string;
    speakers?:{
        eId: string;
        href: string;
        showAs: string;
    }[],
    roles?:{
        eId: string;
        href: string;
        showAs: string;
    }[],
    questions?: {
        asker: string;
        recipient: string;
    }[],
    speeches: {
        speaker: string;
        fullText: string;
        eId: string;
    }[];
}

export interface PQDetailsProps {
    pq: BasePQProps;
    details: DetailsProps;
}

export interface MembersProps {
    member: {
        fullName: string;
        uri: string;
    }
}

export interface MemberListProps {
    members: MembersProps[];
}

export interface PQListPageProps extends BasePQListProps {
    title: string;
}