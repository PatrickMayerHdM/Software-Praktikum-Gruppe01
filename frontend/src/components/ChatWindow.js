import React, {Component} from "react";
/** Importieren von React und der Hooks "useState" sowie "useEffect"
    Diese Hooks werden benötigt, um den Zustand und das Verhalten (der Nachrichten) zu speichern. */
import "./Chat.css";
import DatingSiteAPI from "../api/DatingSiteAPI";

/*
function ChatWindow() {

    const [input, setInput] = useState("");
  /!** Die Variable input enthält den string-Inhalt einer Nachricht.
      setInput wird von useState zurückgegeben, damit man input mit dem string-Inhalt (aus der Eingabe) ersetzt. *!/

    const [messages, setMessages] = useState([
          /!** Die Variable messages stellt mit useState ein leeres Array dar, welches im
           * Chat eine Liste von Nachrichten enthält.
      setMessages wird von useState zurückgegeben, damit man die Nachrichten im Chat aktualisieren kann. *!/
        {
            name: "Dominik",
            content: "Hallo, wie geht es dir?",
        },
        {
            content: "Hallo Domi, mir gehts gut.",
        },
    ]);
  /!** Die Variable messages stellt mit useState ein leeres Array dar, welches im Chat eine Liste von Nachrichten enthält.
      setMessages wird von useState zurückgegeben, damit man die Nachrichten im Chat aktualisieren kann. *!/

    const handleSend = async (event) => {
    /!** handleSend stellt das Versenden einer Nachricht dar.
     *  Ablauf: API-Aufruf an Server, um Nachricht zu speichern.
     *  Anschließend wird der Chat neu geladen, um die Nachricht anzuzeigen. *!/
    event.preventDefault();
    /!** Unterdrücken des Standard-Verhaltens, hier: Neuladen des Chats *!/
    await sendMessage(input);
    setInput("");
    /!** Erst nachdem eine Nachricht erfolgreich gesendet wurde, wird setText für neue Nachrichten geleert. *!/
    const messages = await getMessages();
    setMessages(messages);
    /!** Abrufen des aktualisierten Chat-Verlaufs *!/
    };

    return (
        <div className="chat_window">
            <p className="chatWindow_timestamp">Du hast mit Dominik am 10/05/2023 gematcht!</p>
            {messages.map((message) => (
            // Darstellung des Chat-Verlaufs
            // Die map-Funktion iteriert über das message-Array und erstellt für jede Nachricht
            // ein neues div mit der entsprechenden id.
            // HIER FÜGEN WIR EINE LOGIK EIN, DIE ERKENNT OB ES EINE EIGENE NACHRICHT IST
                message.name ? (
                    <div className="chatWindow_message">
                        <div className="chatWindow_message">
                        <p className="chatWindow_content">{message.content}</p>
                        </div>
                    </div>
                ) : (
                        <div className="chatWindow_message">
                        <p className="chatWindow_contentUser">{message.content}</p>
                        </div>
                )
            ))}

            <form className="chatWindow_input">
                <input value={input}
                       onChange={e => setInput(e.target.value)}
                        // Bei einer Änderung des Eingabetextes wird die setInput Funktion aufgerufen, um
                        // den Inhalt zu aktualisieren.
                       className="chatWindow_inputField"
                       placeholder="Schreib eine Nachricht..."
                       type="text"/>
                <button onClick={handleSend}
                        /!* Wenn User auf den Button klickt, wird diese handleSend ausgelöst. *!/
                        type="submit"
                        className="chatWindow_inputButton">Senden</button>
            </form>
        </div>
    );
}

export default ChatWindow

*/

class ChatWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.messageId,
            sender_id: [], /*Hier muss "this.props.profile hin"*/
            recipient_id: [], /*Hier muss "this.props.profile hin"*/
            messages: [],
            timestamp: this.props.timestamp,
            error: '',
            input: '',

        }

        this.getAllMessages = this.getAllMessages.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.setInput = this.setInput.bind(this);
    }

    componentDidMount() {
        this.getAllMessages();
    }

    getAllMessages() {
            DatingSiteAPI.getAPI().getAllMessages(this.state.id).then(messageBOs =>
            this.setState( {
                messages:messageBOs
            })).catch(e =>
                this.setState({
                    messages:[],
                    error:e
            }));
            console.log('Error:', this.state.error)
    }

    setInput(value) {
        this.setState({input: value});
    }

    handleSend(event) {
        event.preventDefault();
        const newMessage = {
            sender_id: this.state.sender_id,
            recipient_id: this.state.recipient_id,
            content: this.state.input,
        };
        DatingSiteAPI.getAPI()
            .addMessage(newMessage)
            .then(() => {
                this.setState({
                    input:'',
                    messages: [...this.state.messages, newMessage],
                });
            })
            .catch((e) =>
                this.setState({
                    error: e,
                })
            );
    }

    render() {
        const{messages, input} = this.state

        return (
            <div className="chat_window">
                <p className="chatWindow_timestamp">Du hast mit Dominik am 10/05/2023 gematcht!</p>
                {messages.map((message, index) => (
                // Darstellung des Chat-Verlaufs
                // Die map-Funktion iteriert über das message-Array und erstellt für jede Nachricht
                // ein neues div mit der entsprechenden id.
                // HIER FÜGEN WIR EINE LOGIK EIN, DIE ERKENNT OB ES EINE EIGENE NACHRICHT IST
                    <div className="chatWindow_message" key={index}>
                        {message.name ? (
                            <div className="chatWindow_message">
                                <p className="chatWindow_content">{message.content}</p>
                            </div>
                    ) : (
                            <div className="chatWindow_message">
                            <p className="chatWindow_contentUser">{message.content}</p>
                            </div>
                    )}
                    </div>
                ))}

                <form className="chatWindow_input">
                    <input value={input}
                           onChange={e => this.setInput(e.target.value)}
                            // Bei einer Änderung des Eingabetextes wird die setInput Funktion aufgerufen, um
                            // den Inhalt zu aktualisieren.
                           className="chatWindow_inputField"
                           placeholder="Schreib eine Nachricht..."
                           type="text"/>
                    <button onClick={this.handleSend}
                            /* Wenn User auf den Button klickt, wird diese handleSend ausgelöst. */
                            type="submit"
                            className="chatWindow_inputButton">Senden</button>
                </form>
            </div>
        )
    }
}

export default ChatWindow;