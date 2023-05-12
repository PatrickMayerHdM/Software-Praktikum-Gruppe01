

//   useEffect(() => {
//     /** Die Funktion useEffect lädt die Nachrichten des Chats zu Beginn und auch bei Änderungen */
//     const loadMessages = async () => {
//       const messages = await getMessages();
//       /** async und await werden hier verwendet, damit die loadMessages-Funktion auf die Antwort
//        *  der getMessages warten kann. */
//       setMessages(messages);
//     };
//     loadMessages();
//   }, []);
//   /** Grund des leeren Arrays als 2. Argument von useEffect: loadMessages soll nur ein Mal ausgeführt werden. */
//
//   const handleSend = async (event) => {
//     /** handleSend stellt das Versenden einer Nachricht dar.
//      *  Ablauf: API-Aufruf an Server, um Nachricht zu speichern.
//      *  Anschließend wird der Chat neu geladen, um die Nachricht anzuzeigen. */
//     event.preventDefault();
//     /** Unterdrücken des Standard-Verhaltens, hier: Neuladen des Chats */
//     await sendMessage(text);
//     setText("");
//     /** Erst nachdem eine Nachricht erfolgreich gesendet wurde, wird setText für neue Nachrichten geleert. */
//     const messages = await getMessages();
//     setMessages(messages);
//     /** Abrufen des aktualisierten Chat-Verlaufs */
//   };
//

import React from "react";
import "./Chat.css";

function Chat({name, content, timestamp}) {
    return (
        <div className="chat">
            <div className="chat_details">
                <h2>{name}</h2>
                <p>{content}</p>
            </div>
            <p className="chat_timestamp">{timestamp}</p>
        </div>
    );
}

export default Chat;