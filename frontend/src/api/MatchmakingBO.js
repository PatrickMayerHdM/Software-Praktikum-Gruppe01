import BusinessObject from "./BusinessObject";

/**
 * Representiert ein Matchmakingobjekt (Matchmaking)
 */
export default class matchmakingBO extends BusinessObject {

    /**
     * Baut eine matchmakingBO mit google_fk, percentage und searchprofile_id
     *
     * @param {*} agoogle_fk
     * @param {*} apercentage
     * @param {*} asearchprofile_id
     */

    constructor(agoogle_fk, apercentage, asearchprofile_id) {
        super();
        this.google_fk = agoogle_fk;
        this.percentage = apercentage;
        this.searchprofile_id = asearchprofile_id;
    }

    get_google_fk() {
        return this.google_fk
    }

    set_google_fk(asearchprofile_id) {
        this.google_fk = asearchprofile_id
    }

    get_percentage() {
        return this.percentage
    }

    set_percentage(apercentage) {
        this.percentage = apercentage
    }

    get_searchprofile_id() {
        return this.searchprofile_id
    }

    set_searchprofile_id(asearchprofile_id) {
        this.searchprofile_id = asearchprofile_id
    }
    static fromJSON(matchmaking) {
            let result = [];

            if (Array.isArray(matchmaking)) {
                matchmaking.forEach((mm) => {
                    Object.setPrototypeOf(mm, matchmakingBO.prototype);
                    result.push(mm);
                })
            } else {
                let mm = matchmaking
                Object.setPrototypeOf(mm, matchmakingBO.prototype);
                result.push(mm);
            }
            console.log("Parsed MM Objekt: ", result);
            return result;
    }

}

