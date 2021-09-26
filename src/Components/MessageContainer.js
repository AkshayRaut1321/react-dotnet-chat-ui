
const MessageContainer = ({ messages, currentUser }) => {
    return <div className='message-container'>
        {
            messages.map((m, index) =>
                <div key={index} className='user-message'>
                    {
                        <div className={m.userName === 'Chat bot' ? 'center' : m.userName !== currentUser ? 'left' : ''}>
                            <div className='message bg-primary'>
                                {m.message}
                            </div>
                            <div className='from-user'>{m.userName}</div>
                        </div>
                    }
                </div>)
        }
    </div>
}

export default MessageContainer;