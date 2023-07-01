import BusinessObject from "./BusinessObject";

export default class CharacteristicBO extends BusinessObject {

    /**
     * Baut eine CharacteristicBO mit id, name und typ
     * Parameter für Characteristics BO
     * @param {*} achar_id
     * @param {*} achar_name
     * @param {*} achar_typ
     */

    constructor(achar_id, achar_name, achar_typ) {
        super();
        this.char_id = achar_id;
        this.char_name = achar_name;
        this.char_typ = achar_typ;
    }

    /** Auslesen der Char-ID */
    get_char_id() {
        return this.char_id;
    }

    set_char_id(achar_id) {
        this.char_id = achar_id;
    }

    /** Auslesen des Char_Names */
    get_char_name() {
        return this.char_name;
    }

    /** Setzen des Char_Names */
    set_char_name(achar_name) {
        this.char_name = achar_name;
    }

    /** Auslesen des char_typ */
    get_char_typ() {
        return this.char_typ;
    }

    /** Setzen des char_typ */
    set_char_typ(achar_typ) {
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