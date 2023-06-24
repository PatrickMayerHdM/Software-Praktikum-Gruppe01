import BusinessObject from "./BusinessObject";

/**
 * Zeigt das Profilevisitsobjekt im Front-End
 */

export default class profilevisitsBO extends BusinessObject {

    constructor(props, amainprofile_id, avisitedprofile_id) {
        // mainprofile_id = das eigene Profil
        // visitedprofile_id = das besuchte Profil
        super(props);
        this.mainprofile_id = amainprofile_id
        this.visitedprofile_id = avisitedprofile_id
    }

    get_mainprofile_id() {
        // Auslesen des mainprofiles.
        return this.mainprofile_id
    }

    set_mainprofile_id(amainprofile_id) {
        // Setzen des mainprofiles.
        this.mainprofile_id = amainprofile_id
    }

    get_visitedprofile_id() {
        // Auslesen des besuchten Profils.
        return this.visitedprofile_id
    }

    set_visitedprofile_id(avisitedprofile_id) {
        // Setzen des besuchten Profils.
        this.visitedprofile_id = avisitedprofile_id
    }

    static fromJSON(profilevisits) {
        let result = [];

        if (Array.isArray(profilevisits)) {
            profilevisits.forEach((p) => {
                Object.setPrototypeOf(p, profilevisits.prototype);
                result.push(p);
            })
        } else {
            let p = profilevisits
            Object.setPrototypeOf(p, profilevisits.prototype);
            result.push(p);
        }

        return result;
    }
}