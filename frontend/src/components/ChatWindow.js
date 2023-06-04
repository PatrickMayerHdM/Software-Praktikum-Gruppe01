import React, {Component} from "react";
/** Importieren von React und der Hooks "useState" sowie "useEffect"
    Diese Hooks werden benötigt, um den Zustand und das Verhalten (der Nachrichten) zu speichern. */
import "./Chat.css";
import DatingSiteAPI from "../api/DatingSiteAPI";
import messageBO from "../api/MessageBO";

class ChatWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // id: this.props.messageId,
            sender_id: this.props.current_profile, /*Hier muss "this.props.profile hin"*/
            recipient_id: this.props.other_profile, /*Hier muss "this.props.profile hin"*/
            content: [],
            error: '',
            input: '',

        }

        this.getAllMessages = this.getAllMessages.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.setInput = this.setInput.bind(this);
    }

    // componentDidMount() {
    //     console.log("Sender-ID:", this.state.sender_id, "Recipient-ID:", this.state.recipient_id)
    //     const { eigeneID, andereID } = this.props.match.params;
    //     this.setState({ sender_id: eigeneID, recipient_id: andereID }, () => {
    //         this.getAllMessages();
    //     });
    // }

    getAllMessages() {
        const { sender_id, recipient_id } = this.state;
        DatingSiteAPI.getAPI()
            .getAllMessages(sender_id, recipient_id)
            .then((messageBOs) =>
                this.setState({
                    content: messageBOs,
                })
            )
            .catch((e) =>
                this.setState({
                    content: [],
                    error: e,
                })
            );
        console.log("Error:", this.state.error);
    }

    setInput(value) {
        this.setState({input: value});
    }

    handleSend(event) {
    event.preventDefault();
    const { sender_id, recipient_id, input } = this.state;
    const newMessage = new messageBO(input, sender_id, recipient_id);
    DatingSiteAPI.getAPI()
        .addMessage(newMessage)
        .then(() => {
            this.setState({
                input:'',
                content: [...this.state.content, newMessage],
            });
        })
        .catch((e) =>
            this.setState({
                error: e,
            })
        );
    }

    render() {
        const{content, input} = this.state

        return (
            <div className="chat_window">
                {content.map((message, index) => (
                // Darstellung des Chat-Verlaufs
                // Die map-Funktion iteriert über das message-Array und erstellt für jede Nachricht
                // ein neues div mit der entsprechenden id.
                // HIER FÜGEN WIR EINE LOGIK EIN, DIE ERKENNT OB ES EINE EIGENE NACHRICHT IST
                    <div className="chatWindow_message" key={index}>
                        {message.sender_id === this.state.sender_id ? (
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