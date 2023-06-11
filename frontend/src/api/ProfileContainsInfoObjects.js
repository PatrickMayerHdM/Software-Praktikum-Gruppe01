import BusinessObject from "./BusinessObject";
import * as profilecontainsinfoobj from "react-bootstrap/ElementChildren";

/**
 * Verknüpft die Profile mit den InfoObjects
 */

export default class profilecontainsobjectsBO extends BusinessObject {

    /**
     * Baut eine Verknüpfung mit profile_id und infoobj_id
     *
     *  @param {*} aprofile_id
     *  @param {*} ainfoobj_id
     */

    constructor(aprofile_id, ainfoobj_id) {
        super();
        this.profile_id = aprofile_id;
        this.infoobj_id = ainfoobj_id;
    }

    /**
     * Zuweisungs eines Profils in die Verbindungstabelle
     *
     * @param {*} aprofile_id - Id
     */

    setProfileId(aprofile_id){
        this.profile_id = aprofile_id;
    }

    /**
     * Auslesen des Profils
     */

    getProfileId() {
        return this.profile_id
    }

    /**
     * Zweisung einer Infoobject Id zu einem Profil
     *
     * @param {*} ainfoobj_id - Id
     */

    setInfoobjId(ainfoobj_id) {
        this.infoobj_id = ainfoobj_id;
    }

    /**
     * Liest Infoobjekte aus einem Profil aus
     */

    getInfoobjId() {
        return this.infoobj_id
    }

    /**
     * Gibt ein Array der ProfileContainsObjectsBO als JSON Struktur zurück
     */

     static fromJSON(profilecontainsinfoobjects) {
        let result = [];

        if (Array.isArray(profilecontainsinfoobjects)) {
            profilecontainsinfoobjects.forEach((p) => {
                Object.setPrototypeOf(p, profilecontainsobjectsBO.prototype);
                result.push(p);
            })
        } else {
            let p = profilecontainsinfoobj
            Object.setPrototypeOf(p, profilecontainsobjectsBO.prototype);
            result.push(p);
        }

        return result;
    }
}
