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
        // Auslesen des Hinzufügenden.
        return this.adding_id;
    }

    set addingId(aadding_id) {
        // Setzen des Hinzufügenden.
        this.adding_id = aadding_id;
    }

    get addedId() {
        // Auslesen des Hinzugefügten.
        return this.added_id;
    }

    set addedId(aadded_id) {
        // Setzen des Hinzugefügten.
        this.added_id = aadded_id;
    }

}