import React from "react";
import Chat from "./Chat";
import {Link} from "react-router-dom";


class Chats extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            chats: [] // Dies stellt die Liste mit allen Chats einer Person dar.
        };
    }

    render () {
        const { chats } = this.state;

        return (
            <div>
                {chats.length > 0 ? (
                // Prüfen, ob Chats mit anderen Nutzern vorhanden sind
                    <ul>
                        {chats.map(chat => (
                            <li key={chat.id}>
                                {/*<Link to="/ChatWindow/${ChatId}">*/}
                                    {chat.id}
                                {/*</Link>*/}
                            </li>
                        ))}
                    </ul>
                )   :   (
                    <p>Du hast keine offenen Chats...</p>
                )}
            </div>
    )}
}

export default Chats;