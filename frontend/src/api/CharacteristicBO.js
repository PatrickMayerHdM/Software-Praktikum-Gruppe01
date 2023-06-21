import BusinessObject from "./BusinessObject";

export default class CharacteristicBO extends BusinessObject {

    /**
     * Baut eine CharacteristicBO mit id, name und typ
     * Parameter für Characteristics BO
     * @param {*} achar_id
     * @param {*} achar_name
     */

    constructor(achar_id, achar_name) {
        super();
        this.char_id = achar_id;
        this.char_name = achar_name;
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