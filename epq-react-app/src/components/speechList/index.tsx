import React from 'react';
import Accordion from "react-bootstrap/Accordion";
import { SpeechListProps } from '../../types/interfaces';

const SpeechList: React.FC<SpeechListProps> = ({speeches}) => {

    return (
        <>
            <Accordion defaultActiveKey="0">
                { speeches && speeches.map((s) => (
                    <Accordion.Item key={s.eId} eventKey="0">
                        <Accordion.Header>
                            Speaker: {s.speaker}
                        </Accordion.Header>
                        <Accordion.Body>
                            {s.fullText}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>      
        </> 
    );
};

export default SpeechList;