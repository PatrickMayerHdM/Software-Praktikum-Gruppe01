import BusinessObject from "./BusinessObject";

export default class NamedCharacteristicBO extends BusinessObject {

    /**
     * Baut eine NamedCharacteristicBO mit id, name
     * Parameter für NamedCharacteristics BO
     * @param {*} aid
     * @param {*} achar_name
     */
    constructor(aid, achar_name) {
        super();
        this.id = aid;
        this.char_name = achar_name;
    }

    get_named_char_id() {
        return this.id;
    }

    get_named_char_name() {
        return this.char_name;
    }

    set_named_char_id(aid) {
        this.char_id = aid
    }

    set_named_char_name(acharname) {
        this.char_name = acharname
    }

    static fromJSON(namedcharacteristic) {
            let result = [];

            if (Array.isArray(namedcharacteristic)) {
                namedcharacteristic.forEach((c) => {
                    Object.setPrototypeOf(c, NamedCharacteristicBO.prototype);
                    result.push(c);
                })
            } else {
                let c = namedcharacteristic
                Object.setPrototypeOf(c, NamedCharacteristicBO.prototype);
                result.push(c);
            }

            return result;
    }
}