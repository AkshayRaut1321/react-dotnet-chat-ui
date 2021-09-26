import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from 'react';

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    function send(event) {
        event.preventDefault();
        sendMessage(message);
        setMessage('');
    }

    return <Form>
        <InputGroup>
            <FormControl placeholder='message...'
                onChange={e => setMessage(e.target.value)} value={message} />
            <InputGroup.Append>
                <Button variant='primary' type='submit' onClick={e => send(e)}
                disabled={!message}>Send</Button>
            </InputGroup.Append>
        </InputGroup>
    </Form>
};

export default SendMessageForm;