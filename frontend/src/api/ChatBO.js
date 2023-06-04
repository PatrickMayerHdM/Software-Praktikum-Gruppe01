import BusinessObject from "./BusinessObject";

/**
 * Zeigt ein Chat-Objekt im Front-End
 */

export default class chatBO extends BusinessObject {

    /**
     * Baut die chatBO mit message_ids und profile_ids
     *
     * @param {*} achat_id
     * @param {*} amessage_id
     * @param {*} aprofile_id
     */

    constructor(achat_id, amessage_id, aprofile_id) {
        super();
            this.chat_id = achat_id
            this.message_id = amessage_id
            this.profile_id = aprofile_id
    }

    setChatId(achat_id) {
        this.chat_id = achat_id;
    }

    getChatId() {
        return this.chat_id
    }

    setMessageId(amessage_id) {
        this.message_id = amessage_id;
    }

    getMessageId() {
        return this.message_id
    }

    setProfileId(aprofile_id) {
        this.profile_id = aprofile_id;
    }

    getProfileId() {
        return this.profile_id
    }

    static fromJSON(chats) {
        let result = [];

        if (Array.isArray(chats)) {
            chats.forEach((c) => {
                Object.setPrototypeOf(c, chatBO.prototype);
                result.push(c);
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = chats
            Object.setPrototypeOf(c, chatBO.prototype);
            result.push(c);
        }

        return result;
    }
}

