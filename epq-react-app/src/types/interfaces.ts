// This interface is for historical data returned by my express API
export interface BasePQProps {
    id: number;
    due_oireachtas: string;
    question: string;
    pqref: string;
}

export interface BasePQListProps {
    pqs: BasePQProps[];
}