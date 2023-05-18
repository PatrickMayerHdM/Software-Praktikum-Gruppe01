import BusinessObject from "./BusinessObject";

/**
 * Representiert ein Accountobjekt (account)
 */

export default class accountBO extends BusinessObject {

    /**
     * Baut eine accoutnBO mit profile_id, google_id und account_id
     *
     * @param {*} aaccount_id
     * @param {*} agoogle_id
     * @param {*} aname
     * @param {*} aprofile_id
     * @param {*} aemail
     */

    constructor(aprofile_id, agoogle_id, aname, aaccount_id, aemail) {
        super();
            this.account_id = aaccount_id;
            this.google_id = agoogle_id
            this.name = aname;
            this.profile_id = aprofile_id;
            this.email = aemail;
    }

    /**
     * Setzt die Id des Profils
     *
     * @param {*} aprofile_id - die neue id des Profils
     */

    setProfileId(aprofile_id) {
        this.profile_id = aprofile_id;
    }

    /**
     * Holt sich die Id des Profils
     */

    getProfileId() {
        return this.profile_id
    }

    /**
     * Setzt die Id des Google Accounts
     *
     * @param {*} agoogle_id - die neue id des Google Accounts
     */

    setGoogleId(agoogle_id) {
        this.google_id = agoogle_id;
    }

    /**
     * Holt sich die Id des Google Accounts
     */

    getGoogleId() {
        return this.google_id
    }

    /**
     * Setzt die Id des Accounts
     *
     * @param {*} aaccount_id - die neue id des Accounts
     */

    setAccountId(aaccount_id) {
        this.account_id = aaccount_id;
    }

    /**
     * Holt sich die Id des Accounts
     */

    getAccountId() {
        return this.account_id
    }

    /**
     * Setzt die E-Mail des Accounts
     *
     * @param {*} aemail - die neue id des Google Accounts
     */

    setMail(aemail) {
        this.email = aemail;
    }

    /**
     * Holt sich die E-Mail des Accounts
     */

    getMail() {
        return this.email
    }

    /**
     * Setzt den Namen des Accounts
     *
     * @param {*} aname - die neue id des Google Accounts
     */

    setName(aname) {
        this.name = aname;
    }

    /**
     * Holt sich den Namen des Accounts
     */

    getName() {
        return this.name
    }

    /**
     * * Gibt ein Array der AccountBO als JSON Struktur zurück
     */

    static fromJSON(accounts) {
        let result = [];

        if (Array.isArray(accounts)) {
            accounts.forEach((a) => {
                Object.setPrototypeOf(a, accountBO.prototype);
                result.push(a);
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let a = accounts
            Object.setPrototypeOf(a, accountBO.prototype);
            result.push(a);
        }

        return result;
    }

}