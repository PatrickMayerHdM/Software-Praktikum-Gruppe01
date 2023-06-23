import BusinessObject from "./BusinessObject";

/**
 * Representiert ein Nachrichtenobjekt (message)
 */
export default class messageBO extends BusinessObject {

    /**
     * Erstellt eine messageBO mit senderId, recipientId und content
     *
     * @param {*} acontent
     * @param {*} asenderid
     * @param {*} arecipientid
     */
    constructor(asenderid, arecipientid, acontent) {
        super();
        this.sender_id = asenderid;
        this.recipient_id = arecipientid;
        this.content = acontent;
    }

    /**
     * Setzt die Id des Senders
     *
     * @param {*} asenderid - die neue Id des Senders
     */

    setSenderId(asenderid) {
        this.sender_id = asenderid;
    }

    /**
     * Holt sich die Id des Senders
     */

    getSenderId() {
        return this.sender_id
    }

    /**
     * Setzt die Id des Empfängers
     *
     * @param {*} arecipientid - die neue Id des Empfängers
     */

    setRecipientId(arecipientid) {
        this.recipient_id = arecipientid;
    }

    /**
     * Holt sich die Id des Senders
     */

    getRecipientId() {
        return this.recipient_id
    }

     /**
     * Setzt den Inhalt der Nachricht
     *
     * @param {*} acontent - die neue Id des Empfängers
     */

    setContent(acontent) {
        this.content = acontent;
    }

    /**
     * Holt sich die Id des Senders
     */

    getContent() {
        return this.content
    }

    /**
     * Gibt ein Array der MessageBO als JSON struktur zurück
     */

    static fromJSON(messages) {
        let result = [];

        if (Array.isArray(messages)) {
            messages.forEach((m) => {
                Object.setPrototypeOf(m, messageBO.prototype);
                result.push(m);
            })
        } else {
            //Es handelt sich um ein singuläres Objekt?
            let m = messages
            Object.setPrototypeOf(m, messageBO.prototype);
            result.push(m);
        }

        return result;
    }
}


