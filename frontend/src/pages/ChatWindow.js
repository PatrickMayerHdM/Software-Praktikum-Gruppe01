import React, {Component} from "react";
import "../components/Chat/Chat.css";
import DatingSiteAPI from "../api/DatingSiteAPI";
import messageBO from "../api/MessageBO";
import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';

/**
 * Diese Seite dient der Darstellung eines Chat-Verlaufes.
 * Eigene Nachrichten werden grün dargestellt und rechts im Chat-Fenster angeordnet.
 * Nachrichten der anderen Person werden grau dargestellt und links im Chat-Fenster angeordnet.
 */
class ChatWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sender_id: this.props.user.uid,
            recipient_id: null,
            msg_list: [],
            error: '',
            input: '',

        }

        // Binden der Methoden getAllMessages, handleSend und setInput an die aktuelle Instanz
        this.getAllMessages = this.getAllMessages.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.setInput = this.setInput.bind(this);
    }

    /** Methode, die das automatische Scrollen zur aktuellen Position der neuesten Nachricht ermöglicht. */
    scrollToBottom() {
    const chatWindow = document.getElementById("chat_messages");
    chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    componentDidMount() {
        // Führt folgenden Code beim ersten Laden der Komponente aus

        // Auslesen des aktuellen Pfads der URL
        const currentPath = window.location.pathname;
        // Letzte Teil der URL wird gepoppt, un in const lastPartURL gespeichert
        const lastPartURL = currentPath.split('/').pop();
        // Zustand von recipient_id wird aktualisiert
        this.setState({recipient_id: lastPartURL}, () => {
          console.log("Sender-ID:", this.state.sender_id, "Recipient-ID:", this.state.recipient_id);
          // Abrufen aller Nachrichten
          this.getAllMessages();
        });
    }

    getAllMessages() {
        // Speichern der aktuellen Zustände von sender_id und recipient_id in den Variablen
        const { sender_id, recipient_id } = this.state;
        DatingSiteAPI.getAPI()
            // Abrufen aller Nachrichten zwischen sender_id und recipient_id
            .getAllMessages(sender_id, recipient_id)
            // Erhalten der Nachrichten in Form eines Arrays
            .then((messageBOs) =>
                this.setState({
                    msg_list: messageBOs,
                }, () => {
                    console.log(this.state.msg_list)
                    this.scrollToBottom()
                }),
            )
            // Ausgabe beim Fall eines Errors
            .catch((e) =>
                this.setState({
                    msg_list: [],
                    error: e,
                })
            );
    }

    setInput(value) {
        // Input wird mit dem Wert value gespeichert
        this.setState({input: value});
    }

    handleSend(event) {
    // Verhindern des Standardverhaltens: Neuladen der Seite beim Absenden der Nachricht
    event.preventDefault();
    // Speichern der aktuellen Zustände in den Variablen
    const { sender_id, recipient_id, input } = this.state;
    // Erstellen eines neuen Nachrichtenobjektes
    const newMessage = new messageBO(sender_id, recipient_id, input);
    DatingSiteAPI.getAPI()
        // Hinzufügen der neuen Nachricht
        .addMessage(newMessage)
        // Leeren des input-Feldes und Darstellung des neuen Chat-Verlaufs
        .then(() => {
            this.setState({
                input:'',
                msg_list: [...this.state.msg_list, newMessage],
            });
        })
        // Ausgabe beim Fall eines Errors
        .catch((e) =>
            this.setState({
                error: e,
            })
        );
    }

    render() {
        // Speichern der aktuellen Zustände in den Variablen
        const{msg_list, input} = this.state

        // Darstellung des Chat-Verlaufs
        return (
            <div>
                <div id={'chat_messages'}>
                {/*Map-Funktion iteriert über message-Array und erstellt für jede Nachricht neues div*/}
                {msg_list.map((msg, index) => (
                    <div key={index}>
                        {this.state.sender_id === msg.getRecipientId() ? (
                            // Darstellung einer Nachricht, die nicht von der eigenen Person stammt
                            <div className="chatWindow_message">
                                <p className="chatWindow_content">{msg.getContent()}</p>
                            </div>
                    ) : (
                            // Darstellung einer eigenen Nachricht
                            <div className="chatWindow_message">
                            <p className="chatWindow_contentUser">{msg.getContent()}</p>
                            </div>
                    )}
                    </div>
                ))}
                </div>

                <div className="chatWindow_input">
                    <button onClick={() => this.getAllMessages()}
                            style={{
                                height: "60px",
                                width: "10%",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#374258" ,
                                color: "#fff",
                                cursor: "pointer",
                                padding: "1%",
                                borderRadius: '15px'
                            }}
                    >
                        <ReplayIcon></ReplayIcon>
                    </button>
                    <form style={{
                        width: "80%",
                    }}>
                        <input value={input}
                               onChange={e => this.setInput(e.target.value)}
                               // Bei einer Änderung des Eingabetextes wird die setInput Funktion aufgerufen, um
                               // den Inhalt zu aktualisieren.
                               className="chatWindow_inputField"
                               placeholder="Schreibe eine Nachricht ..."
                               type="text"
                        />
                        {/* Wenn User auf den Button klickt, wird diese handleSend ausgelöst. */ }
                    </form>
                    <button onClick={this.handleSend}
                            style={{
                                height: "60px",
                                width: "10%",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#374258" ,
                                color: "#fff",
                                cursor: "pointer",
                                padding: "1%",
                                marginRight: "15px",
                                borderRadius: "15px"
                            }}
                            type="submit"
                    >
                        <SendIcon></SendIcon>
                    </button>
                </div>

            </div>
        )
    }
}

export default ChatWindow;