import BusinessObject from "./BusinessObject";

/**
 * Representiert ein favoriteNoteBO (favoriteNote)
 */

export default class favoriteNoteBO extends BusinessObject {

    /**
     * Baut eine favoriteNoteBO mit adding_id und added_id

     * @param {*} aadding_id
     * @param {*} aadded_id
     */



    constructor(aadding_id, aadded_id) {
        super();
        this.adding_id = aadding_id;
        this.added_id = aadded_id;
    }

    get addingId() {
        return this.adding_id;
    }

    set addingId(aadding_id) {
        this.adding_id = aadding_id;
    }

    get addedId() {
        return this.added_id;
    }

    set addedId(aadded_id) {
        this.added_id = aadded_id;
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