import BusinessObject from "./BusinessObject";

/**
 * Zeigt ein Profilobjekt im Front-End
 */
export default class profileBO extends BusinessObject {

    /**
     * Baut die profileBO mit profile_id, favoriteNote_id, account_id,
     * blockNote_id
     *
     * @param {*} aprofile_id
     * @param {*} afavoriteNote_id
     * @param {*} ablockNote_id
     * @param {*} agoogle_fk
     */


    constructor(aprofile_id, afavoriteNote_id, ablockNote_id, agoogle_fk) {
        super();
        this.profile_id = aprofile_id;
        this.favoriteNote_id = afavoriteNote_id;
        this.blockNote_id = ablockNote_id;
        this.google_id = agoogle_fk;
    }

    /**
     * Setzt die profile_id
     *
     * @param {*} aprofile_id
     */

    set_profile_id(aprofile_id) {
        this.profile_id = aprofile_id;
    }

    /**
     * Holt sich die profile_id
     */

    get_profile_id() {
        return this.profile_id
    }

    /**
     * Setzt eine favoriteNote_id
     *
     * @param {*} afavoriteNote_id
     */

    set_favoriteNote_id(afavoriteNote_id) {
        this.favoriteNote_id = afavoriteNote_id;
    }

    /**
     * Holt sich eine favoriteNote_id
     */

    get_favoriteNote_id() {
        return this.favoriteNote_id
    }

    /**
     * Setzt eine blockNote_id
     *
     * @param {*} ablockNote_id
     */

    set_blockNote_id(ablockNote_id) {
        this.blockNote_id = ablockNote_id;
    }

    /**
     * Holt sich einne blockNote_id
     */

    get_blockNote_id() {
        return this.blockNote_id;
    }

    /* Auslesen der GoogleID */
    get_google_id() {
        return this.agoogle_fk;
    }
    /* Setzen der GoogleID */
    set_google_id(agoogle_fk) {
        this.google_id = agoogle_fk;
    }


    /**
     * Gibt ein Array der ProfileBO als JSON struktur zurück
     */

    static fromJSON(profile) {
        console.log("JSON: ", profile)
        let result = [];

        if (Array.isArray(profile)) {
            profile.forEach((p) => {
                Object.setPrototypeOf(p, profileBO.prototype);
                result.push(p);
            })
        } else {
            let p = profile;
            Object.setPrototypeOf(p, profileBO.prototype);
            result.push(p);
        }

        return result;
    }
}


