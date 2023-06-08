import BusinessObject from "./BusinessObject";

/**
 * Representiert ein favoriteNoteBO (favoriteNote)
 */

export default class favoriteNoteBO extends BusinessObject {

    /**
     * Baut eine favoriteNoteBO mit favoriteNote_list
     *
     * @param {*} afavoriteNote_list
     */



    constructor() {
        super();
        this.afavoriteNote_list = [];
    }

    /**
     * Fügt ein Profil der Liste hinzu
     *
     * @param {*} profil_id - die id des Profils
     */

    add_user(profil_id) {
        if (!this.afavoriteNote_list.includes(profil_id)) {
            this.afavoriteNote_list.push(profil_id);
        }
    }

    /**
     * Entfernt ein Profil aus der Liste
     *
     * @param {*} profil_id - die id des Profils
     */

    del_user(profil_id) {
        const index = this.afavoriteNote_list.indexOf(profil_id);
        if (index !== -1) {
            this.afavoriteNote_list.splice(index, 1);
        }
    }

    /**
     * Holt sich alle Profile aus der Liste
     */

    get_all_users() {
        return this.afavoriteNote_list;
    }

    /**
     * Gibt ein Array der FavoriteNoteBO als JSON struktur zurück
     */

    static fromJSON(afavoriteNote_list) {
            let result = [];

            if (Array.isArray(afavoriteNote_list)) {
                afavoriteNote_list.forEach((f) => {
                    Object.setPrototypeOf(f, favoriteNoteBO.prototype);
                    result.push(f);
                })
            } else {
                let f = afavoriteNote_list
                Object.setPrototypeOf(f, favoriteNoteBO.prototype);
                result.push(f);
            }

            return result;
    }
}