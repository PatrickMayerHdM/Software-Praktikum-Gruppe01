import BusinessObject from "./BusinessObject";

/**
 * Zeigt ein Suchprofilobjekt im Front-End
 */

export default class searchprofileBO extends BusinessObject {

    /**
     * Baut die searchprofileBO mit searchprofile_id
     *
     * @param {*} aprofile_id
     */

    constructor(asearchprofile_id, agoogle_id) {
        super();
        this.searchprofile_id = asearchprofile_id;
        this.google_id = agoogle_id;
    }

    /**
     * Setzt die searchprofile_id
     *
     * @param {*} asearchprofile_id
     */

    get_searchprofile_id() {
        return this.searchprofile_id
    }

    set_searchprofile_id(asearchprofile_id) {
        this.searchprofile_id = asearchprofile_id
    }


    get_google_id() {
        return this.google_id;
    }

    set_google_id(agoogle_id) {
        this.google_id = agoogle_id;
    }

    /**
     * Gibt ein Array der SearchprofileBO als JSON struktur zurück
     */

    static fromJSON(searchprofile) {
        let result = [];

        if (Array.isArray(searchprofile)) {
            searchprofile.forEach((s) => {
                Object.setPrototypeOf(s, searchprofileBO.prototype);
                result.push(s);
            })
        } else {
            let s = searchprofile
            Object.setPrototypeOf(s, searchprofileBO.prototype);
            result.push(s);
        }

        return result;
    }
}