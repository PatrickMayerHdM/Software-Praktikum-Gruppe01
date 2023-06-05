import BusinessObject from "./BusinessObject";

export default class Characteristic extends BusinessObject {

    /**
     * Baut eine CharacteristicBO mit id und name
     * Parameter für Characteristics BO (aus Characteristics.py) id und name
     * @param {*} aid
     * @param {*} achar_name
     * @param {*} achar_typ
     */

    constructor() {
        super();
        this.id = null;
        this.char_name = "";
        this.char_typ = "";
    }

    /** Auslesen der Char-ID */
    get_Char_id() {
        return this.id;
    }

    /** Auslesen des Char_Names */
    get_char_name() {
        return this.char_name;
    }

    /** Auslesen des Char_Types */
    get_char_typ() {
        return this.char_typ;
    }

    /** Setzen des Char_Names */
    set_char_name(achar_name) {
        this.char_name = achar_name;
    }

    /** Setzen des Char_Types */
    set_char_type(achar_typ) {
        this.char_typ = achar_typ;
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