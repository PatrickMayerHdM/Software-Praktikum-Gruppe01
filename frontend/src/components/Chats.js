import React from "react";
import Chat from "./Chat";


class Chats extends React.Component{

    render () {
        return (
            <div>
                <Chat
                    name="Dominik Wu"
                    content="Hallo, wie geht es dir?"
                    timestamp="vor 10 Minuten"
                />
                <Chat
                    name="Efstratios Va"
                    content="Wann treffen wir uns an der Uni?"
                    timestamp="vor 20 Minuten"
                />
                <Chat
                    name="Oresto GPT"
                    content="Hallo, ich bin eine KI."
                    timestamp="vor 45 Minuten"
                />
                <Chat
                    name="Patrick Me"
                    content="Whats going on guys?"
                    timestamp="vor 1 Stunde"
                />
            </div>
    )
    }
}

export default Chats;