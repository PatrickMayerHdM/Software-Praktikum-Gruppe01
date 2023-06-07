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
            sender_id: this.props.user.uid,
            recipient_id: null,
            content: [],
            error: '',
            input: '',

        }

        this.getAllMessages = this.getAllMessages.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.setInput = this.setInput.bind(this);
    }

    componentDidMount() {
        const currentPath = window.location.pathname;
        const lastPartURL = currentPath.split('/').pop();
        this.setState({recipient_id: lastPartURL}, () => {
          console.log("Sender-ID:", this.state.sender_id, "Recipient-ID:", this.state.recipient_id);
          this.getAllMessages();
        });
    }

    getAllMessages() {
        const { sender_id, recipient_id } = this.state;
        DatingSiteAPI.getAPI()
            .getAllMessages(sender_id, recipient_id)
            .then((messageBOs) =>
                this.setState({
                    content: messageBOs,
                }, () => {
                    console.log(this.state.content)
                    //console.log(this.state.content[0].asenderid)
                    //console.log(this.state.content[1].arecipientid)
                }),
            )
            .catch((e) =>
                this.setState({
                    content: [],
                    error: e,
                })
            );
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
                {content.map((content, index) => (
                // Darstellung des Chat-Verlaufs
                // Die map-Funktion iteriert über das message-Array und erstellt für jede Nachricht
                // ein neues div mit der entsprechenden id.
                // HIER FÜGEN WIR EINE LOGIK EIN, DIE ERKENNT OB ES EINE EIGENE NACHRICHT IST
                    <div key={index}>
                        {this.state.sender_id === content.asenderid ? (
                            <div className="chatWindow_message">
                                <p className="chatWindow_content">{content.acontent}</p>
                            </div>
                    ) : (
                            <div className="chatWindow_message">
                            <p className="chatWindow_contentUser">{content.acontent}</p>
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