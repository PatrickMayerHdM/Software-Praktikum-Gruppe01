import React, { useState, useEffect } from "react";
/** Importieren von React und der Hooks "useState" sowie "useEffect"
    Diese Hooks werden benötigt, um den Zustand und das Verhalten (der Nachrichten) zu speichern. */
import { getMessages, sendMessage } from "./ChatAPI";
/** Importieren API-Funktionen getMessages und sendMessages.
 *  Diese werden benötigt, um Abfragen an die Datenbank auszuführen. */

const Chat = () => {
  /** Chat zeigt in der App den Chat-Verlauf an und ermöglicht es Nachrichten zu senden. */
  const [messages, setMessages] = useState([]);
  /** Die Variable messages stellt mit useState ein leeres Array dar, welches im Chat eine Liste von Nachrichten enthält.
      setMessages wird von useState zurückgegeben, damit man die Nachrichten im Chat aktualisieren kann. */
  const [text, setText] = useState("");
  /** Die Variable text enthält den string-Inhalt einer Nachricht.
      setText wird von useState zurückgegeben, damit man text mit dem string-Inhalt (aus der Eingabe) ersetzt. */

  useEffect(() => {
    /** Die Funktion useEffect lädt die Nachrichten des Chats zu Beginn und auch bei Änderungen */
    const loadMessages = async () => {
      const messages = await getMessages();
      /** async und await werden hier verwendet, damit die loadMessages-Funktion auf die Antwort
       *  der getMessages warten kann. */
      setMessages(messages);
    };
    loadMessages();
  }, []);
  /** Grund des leeren Arrays als 2. Argument von useEffect: loadMessages soll nur ein Mal ausgeführt werden. */

  const handleSend = async (event) => {
    /** handleSend stellt das Versenden einer Nachricht dar.
     *  Ablauf: API-Aufruf an Server, um Nachricht zu speichern.
     *  Anschließend wird der Chat neu geladen, um die Nachricht anzuzeigen. */
    event.preventDefault();
    /** Unterdrücken des Standard-Verhaltens, hier: Neuladen des Chats */
    await sendMessage(text);
    setText("");
    /** Erst nachdem eine Nachricht erfolgreich gesendet wurde, wird setText für neue Nachrichten geleert. */
    const messages = await getMessages();
    setMessages(messages);
    /** Abrufen des aktualisierten Chat-Verlaufs */
  };

  return (
      /** HTML-Aufbau des Chats */
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message) => (
            // Darstellung des Chat-Verlaufs
            // Die map-Funktion iteriert über das message-Array und erstellt für jede Nachricht
            // ein neues div mit der entsprechenden id.
          <div key={message.id}>
            <p>{message.text}</p>
            <p>{message.timestamp}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        {/* Wenn User auf den Button klickt, wird diese handleSend ausgelöst. */}
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          // Bei einer Änderung des Eingabetextes wird die setText Funktion aufgerufen, um den Inhalt zu aktualisieren.
        />
        <button type="submit">Senden</button>
      </form>
    </div>
  );
};


export default Chat;
