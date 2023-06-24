import BusinessObject from "./BusinessObject";

/**
 * Representiert ein BlockNoteBO (blockNote)
 */

export default class blockNoteBO extends BusinessObject {

    /**
     * Baut eine blockNoteBO mit blocking_id und blocked_id
     *
     * @param {*} ablocking_id
     * @param {*} ablocked_id
     */

    constructor(ablocking_id, ablocked_id) {
        super();
        this.blocking_id = ablocking_id
        this.blocked_id = ablocked_id
    }

    get blockingId() {
        // Auslesen des Blockierenden.
        return this.blocking_id;
    }

    set blockingId(ablocking_id) {
        // Setzen des Blockierenden.
        this.blocking_id = ablocking_id;
    }

    get blockedId() {
        // Auslesen des Geblockten.
        return this.blocked_id;
    }

    set blockedId(ablocked_id) {
        // Setzen des Geblockten.
        this.blocked_id = ablocked_id;
    }

    /**
     * Entfernt ein Profil aus der Liste
     *
     * @param {*} profil_id - die id des Profils
     */

    del_user(profil_id) {
        const index = this.ablockNote_list.indexOf(profil_id);
        if (index !== -1) {
            this.ablockNote_list.splice(index, 1);
        }
    }

    /**
     * Gibt ein Array der blockNoteBO als JSON struktur zurück
     */

    static fromJSON(ablockNote_list) {
            let result = [];

            if (Array.isArray(ablockNote_list)) {
                ablockNote_list.forEach((m) => {
                    Object.setPrototypeOf(m, blockNoteBO.prototype);
                    result.push(m);
                })
            } else {
                let b = ablockNote_list
                Object.setPrototypeOf(b, blockNoteBO.prototype);
                result.push(b);
            }

            return result;
    }
}