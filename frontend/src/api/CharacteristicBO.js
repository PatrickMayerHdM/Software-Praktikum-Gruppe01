import BusinessObject from "./BusinessObject";

export default class Characteristic extends BusinessObject {

    /**
     * Baut eine CharacteristicBO mit id und name
     * Parameter für Characteristics BO (aus Characteristics.py) id und name
     * @param {*} aid
     * @param {*} aname
     */

    constructor(
        aid = null,
        aname = null,

    ) {
        super();
        this._aid = aid;
        this._aname = aname;
    }

     /**
     *  Setzen der Id
     */
    set_aid(id) {
        this._aid = id;
    }

    /**
     *  Löschen der Id
     */

    delete_aid() {
        this._aid = null;
    }

    /**
     *  Gibt die Id zurück
     */

    get_aid() {
        return this._aid
    }

    /**
     *  Setzen des Namens
     */
    set_aname(name) {
        this._aid = name;
    }

    /**
     *  Löschen des Namens
     */

    delete_aname() {
        this._aname = null;
    }

    /**
     *  Gibt den Namen zurück
     */

     get_aname() {
        return this._aname
    }

    static fromJSON(characteristic) {
            let result = [];

            if (Array.isArray(characteristic)) {
                characteristic.forEach((c) => {
                    Object.setPrototypeOf(c, characteristic.prototype);
                    result.push(c);
                })
            } else {
                let c = characteristic
                Object.setPrototypeOf(c, characteristic.prototype);
                result.push(c);
            }

            return result;
    }
}