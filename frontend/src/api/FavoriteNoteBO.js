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

}