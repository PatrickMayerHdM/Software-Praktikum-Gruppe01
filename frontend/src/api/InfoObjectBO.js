import BusinessObject from "./BusinessObject";

/**
 * Repräsentiert ein Infoobjekt (infobject)
 */

export default class infoobjectBO extends BusinessObject {

    /**
     * Baut ein infoobjectBO mit infoobject_id, und infoobject wert (value)
     *
     * @param {*} ainfoobject_id
     * @param {*} ainfoobject_value
     * */

    constructor(
        ainfoobject_id = null,
        ainfoobject_value = null,
    ) {
        super();
        this._ainfoobject_id = ainfoobject_id;
        this._ainfoobject_value = ainfoobject_value;
    }

    /**
     *  Setzen der Id
     */
    set_ainfoobject_id(id) {
        this._ainfoobject_id = id;
    }

    /**
     *  Löschen der Id
     */

    delete_ainfoobject_id() {
        this._ainfoobject_id = null;
    }

    /**
     *  Gibt die Id zurück
     */

    get_ainfoobject_id() {
        return this._ainfoobject_id
    }


    /**
     *  Setzen des values
     */
    set_ainfoobject_value(value) {
        this._ainfoobject_value = value;
    }

    /**
     *  Löschen des values
     */

    delete_ainfoobject_value() {
        this._ainfoobject_value = null;
    }

    /**
     *  Gibt den value zurück
     */

    get_ainfoobject_value() {
        return this._ainfoobject_value
    }

      static fromJSON(infoobject) {
            let result = [];

            if (Array.isArray(infoobject)) {
                infoobject.forEach((i) => {
                    Object.setPrototypeOf(i, infoobject.prototype);
                    result.push(i);
                })
            } else {
                let i = infoobject
                Object.setPrototypeOf(i, infoobject.prototype);
                result.push(i);
            }

            return result;
    }
}