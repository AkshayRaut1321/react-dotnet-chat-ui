const { default: MessageContainer } = require("./MessageContainer")
const { default: SendMessageForm } = require("./SendMessageForm")

const Chat = ({ messages, sendMessage, currentUser }) => {
    return <div className='chat'>
        <MessageContainer messages={messages} currentUser={currentUser}></MessageContainer>
        <SendMessageForm sendMessage={sendMessage}></SendMessageForm>
    </div>
}

export default Chat;