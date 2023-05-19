import BusinessObject from "./BusinessObject";

/**
 * Repräsentiert ein Infoobjekt (infobject)
 */

export default class infoobjectBO extends BusinessObject {

    /**
     * Baut ein infoobjectBO mit infoobject_id,
     *
     * @param {*} ainfoobject_id
     *
     * */

    constructor(ainfoobject_id) {
        super();
        this.infoobject_id = ainfoobject_id
    }

    /**
     * Setzt die Id eines Infoobjekts
     *
     * @param {*} ainfoobject_id - die neue id es Infoobjekts
     * */

    setInfoobjectId(ainfoobject_id) {
        this.infoobject_id = ainfoobject_id;
    }

    /**
     * Holt sich die Id des Infoobjekts
     * */

    getInfoObjectId() {
        return this.infoobject_id
    }

    /**
     * Setzt etwas anderes
     * */

    /**
     * Holt etwas anderes
     * */


    /**
     * Gibt ein Array der InfoobjectBO als JSON Struktur zurück
     * */
}