import BusinessObject from "./BusinessObject";

/**
 * Representiert ein Nachrichtenobjekt (message)
 */
export default class messageBO extends BusinessObject {

    /**
     * Baut eine messageBO mit content, senderId und recipientId
     *
     * @param {*} acontent
     * @param {*} asenderid
     * @param {*} arecipientid
     */

    /**
     * Kommentar zgl. asenderid und arecipientid: id beibehalten? Ja, da in der Nachricht
     * Bezug zur Senderid und nicht zum Namen genommen wird.
     */
    constructor(acontent, asenderid, arecipientid) {
        super();
        this.content = acontent;
        this.sender_id = asenderid;
        this.recipient_id = arecipientid;
    }

    /**
     * Setzt die Id des Senders
     *
     * @param {*} asenderid - die neue id des Senders
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
     * Setzt die id des Empfängers
     *
     * @param {*} arecipientid - die neue id des Empfängers
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
     * Setzt den Inahlt der Nachricht
     *
     * @param {*} acontent - die neue id des Empfängers
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


