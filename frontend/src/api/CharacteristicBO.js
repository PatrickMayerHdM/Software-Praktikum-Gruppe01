import BusinessObject from "./BusinessObject";

export default class CharacteristicBO extends BusinessObject {

    /**
     * Baut eine CharacteristicBO mit id, name und typ
     * Parameter für Characteristics BO
     * @param {*} aid
     * @param {*} achar_name
     * @param {*} achar_typ
     */

    constructor(aid, achar_name, achar_typ) {
        super();
        this.id = aid;
        this.char_name = achar_name;
        this.char_typ = achar_typ;
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
                    Object.setPrototypeOf(c, CharacteristicBO.prototype);
                    result.push(c);
                })
            } else {
                let c = characteristic
                Object.setPrototypeOf(c, CharacteristicBO.prototype);
                result.push(c);
            }

            return result;
    }
}