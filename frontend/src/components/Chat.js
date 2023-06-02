import React from "react";
import "./Chat.css";
import DatingSiteAPI from "../api/DatingSiteAPI";
import chatBO from "../api/ChatBO";

class Chat extends React.Component{
    render() {
        const { chat } = this.props

        return (
            <div className="chat">
                <div className="chat_details">
                    <h2>{chat.getID()}</h2>
                    <ul>
                        {chat.getAllMessages()}
                    </ul>
                </div>
            </div>
        );
    }
}


export default Chat;