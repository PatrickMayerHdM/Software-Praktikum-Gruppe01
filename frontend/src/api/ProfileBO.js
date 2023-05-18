import BusinessObject from "./BusinessObject";

/**
 * Zeigt ein Profilobjekt im Front-End
 */
export default class profileBO extends BusinessObject {

    /**
     * Baut die profileBO mit firstname, surname, birthdate,
     * favoriteNote_id, account_id und blockNote_id
     *
     * @param {*} afirstname
     * @param {*} asurname
     * @param {*} abirthdate
     * @param {*} afavoriteNote_id
     * @param {*} aaccount_id
     * @param {*} ablockNote_id
     */


    constructor(afirstname, asurname, abirthdate, afavoriteNote_id, aaccount_id, ablockNote_id) {
        super();
        this.firstname = afirstname;
        this.surname = asurname;
        this.birthdate = abirthdate;
        this.favoriteNote_id = afavoriteNote_id;
        this.account_id = aaccount_id;
        this.blockNote_id = ablockNote_id;
    }

    /**
     * Setzt den Vornamen
     *
     * @param {*} afirstname - Neuer Vorname
     */

    setFirstname(afirstname) {
        this.firstname = afirstname;
    }

    /**
     * Holt sich den Vornamen
     */

    getFirstname() {
        return this.firstname
    }

    /**
     * Setzt den Nachnamen
     *
     * @param {*} asurname - Neuer Nachname
     */

    setSurname(asurname) {
        this.surname = asurname;
    }

    /**
     * Holt sich den Nachnamen
     */

    getSurname() {
        return this.surname
    }

     /**
     * Setzt den neun Geburtstag
     *
     * @param {*} abirthdate - der neue Geburtstag
     */

    setBirthdate(abirthdate) {
        this.birthdate = abirthdate;
    }

    /**
     * Holt sich den Geburtstag
     */

    getBirthdate() {
        return this.birthdate
    }

    /**
     * Setzt eine Merklisten_id
     *
     * @param {*} afavoriteNote_id - die neue Merklisten_id (favoriteNote_id)
     */

    setFavoriteNote_id(afavoriteNote_id) {
        this.favoriteNote_id = afavoriteNote_id;
    }

    /**
     * Holt sich eine Merklisten_id
     */

    getFavoriteNote_id() {
        return this.favoriteNote_id
    }

    /**
     * Setzt einen Account
     *
     * @param {*} aaccount_id - die neue Account_id (account_id)
     */

    setAccount_id(aaccount_id) {
        this.account_id = aaccount_id;
    }

    /**
     * Holt sich einen Account
     */

    getAccount_id() {
        return this.account_id
    }

    /**
     * Setzt einen Account
     *
     * @param {*} ablockNote_id - die neue Kontaktsperren_id (blockNote_id)
     */

    setBlockNote_id(ablockNote_id) {
        this.blockNote_id = ablockNote_id;
    }

    /**
     * Holt sich einen Account
     */

    getBlockNote_id() {
        return this.blockNote_id
    }


    /**
     * Gibt ein Array der ProfileBO als JSON struktur zurück
     */

    static fromJSON(profile) {
        let result = [];

        if (Array.isArray(profile)) {
            profile.forEach((m) => {
                Object.setPrototypeOf(m, profileBO.prototype);
                result.push(m);
            })
        } else {
            let m = profile
            Object.setPrototypeOf(m, profileBO.prototype);
            result.push(m);
        }

        return result;
    }
}


