import BusinessObject from "./BusinessObject";

export default class Characteristic extends BusinessObject {

    /**
     * Baut eine CharacteristicBO mit age, sex, bodyheight, haircolor, description, smoking,
     * religion, searchingfor
     *
     * @param {*} age
     * @param {*} sex
     * @param {*} bodyheight
     * @param {*} haircolor
     * @param {*} description
     * @param {*} smoking
     * @param {*} religion
     * @param {*} searchingfor
     */

    constructor(
        age = null,
        sex = null,
        bodyheight = null,
        haircolor = null,
        description = null,
        smoking = null,
        religion = null,
        searchingfor = null,
    ) {
        super();
        this._age = age;
        this._sex = sex;
        this._bodyheight = bodyheight;
        this._haircolor = haircolor;
        this._description = description;
        this._smoking = smoking;
        this._religion = religion;
        this._searchingFor = searchingfor;
    }

    /**
     *  Setzen des Alters
     */
    set_age(age) {
        this._age = age;
    }

    /**
     *  Löschen des Alters
     */

    delete_age() {
        this._age = null;
    }

    /**
     *  Gibt das Alter zurück
     */

    get_age() {
        return this._age
    }

    /**
     *  Setzen des Geschlechts
     */

    set_sex(sex) {
        this._sex = sex;
    }

    /**
     * Löschen des Geschlechts
     */

    delete_sex() {
        this._sex = null;
    }

    /**
     * Gibt das Geschlecht zurück
     */

    get_sex() {
        return this._sex;
    }

    /**
     * Setzen der Körpergröße
     */

    set_bodyheight(bodyheight) {
        this._bodyheight = bodyheight;
    }

    /**
     * Löschen der Körpergröße
     */

    delete_bodyheight() {
        this._bodyheight = null;
    }

    /**
     * Gibt die Körpergröße zurück
     */

    get_bodyheight() {
        return this._bodyheight;
    }
    /**
     * Setzen der Haarfarbe
     */

    set_haircolor(haircolor) {
        this._haircolor = haircolor;
    }

    /**
     * Löschen der Haarfarbe
     */

    delete_haircolor() {
        this._haircolor = null;
    }
    /**
     * Gibt die Haarfarbe zurück
     */

    get_haircolor() {
        return this._haircolor;
    }

    /**
     * Setzen der Beschreibung
     */

    set_description(description) {
        this._description = description;
    }

    /**
     * Löschen der Beschreibung
     */

    delete_description() {
        this._description = null;
    }
    /**
     * Gibt die Beschreibung zurück
     */

    get_description() {
        return this._description;
    }

    /**
     * Setzen des Nicht-/Raucher
     */

    set_smoking(smoking) {
        this._smoking = smoking;
    }

    /**
     * Löschen des Nicht-/Raucher
     */

    delete_smoking() {
        this._smoking = null;
    }
    /**
     * Gibt den Nicht-/Raucher zurück
     */

    get_smoking() {
        return this._smoking;
    }

    /**
     * Setzen der Religion
     */

    set_religion(religion) {
        this._religion = religion;
    }

    /**
     * Löschen der Religion
     */

    delete_religion() {
        this._religion = null;
    }
    /**
     * Gibt die Religion zurück
     */

    get_religion() {
        return this._religion;
    }

    /**
     * Setzen des gesuchten Geschlechts
     */

    set_searchingfor(pref) {
        this._searchingFor = searchingfor;
    }

    /**
     * Löschen des gesuchten Geschechts
     */

    delete_searchingfor() {
        this._searchingFor = null;
    }
    /**
     * Gibt das gesuchte Geschlecht zurück
     */

    get_searchingfor() {
        return this._searchingFor;
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