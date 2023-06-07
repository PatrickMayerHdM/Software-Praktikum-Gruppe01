import BusinessObject from "./BusinessObject";

/**
 * Representiert ein BlockNoteBO (blockNote)
 */

export default class blockNoteBO extends BusinessObject {

    /**
     * Baut eine blockNoteBO mit blockNote_list
     *
     * @param {*} ablockNote_list
     */



    constructor() {
        super();
        this.ablockNote_list = [];
    }

    /**
     * Fügt ein Profil der Liste hinzu
     *
     * @param {*} profil_id - die id des Profils
     */

    add_user(profil_id) {
        if (!this.ablockNote_list.includes(profil_id)) {
            this.ablockNote_list.push(profil_id);
        }
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
     * Holt sich alle Profile aus der Liste
     */

    get_all_users() {
        return this.ablockNote_list;
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