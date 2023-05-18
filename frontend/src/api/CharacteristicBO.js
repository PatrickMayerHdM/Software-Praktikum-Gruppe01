import BusinessObject from "./BusinessObject";

export default class Characteristic extends BusinessObject {

    /**
     * Baut eine CharacteristicBO mit age, sex, bodyheight, haircolor, description, smoking,
     * religion, searchingfor
     *
     * @param {*} aage
     * @param {*} asex
     * @param {*} abodyheight
     * @param {*} ahaircolor
     * @param {*} adescription
     * @param {*} asmoking
     * @param {*} areligion
     * @param {*} asearchingfor
     */

    constructor(
        aage = null,
        asex = null,
        abodyheight = null,
        ahaircolor = null,
        adescription = null,
        asmoking = null,
        areligion = null,
        asearchingfor = null,
    ) {
        super();
        this._aage = aage;
        this._asex = asex;
        this._abodyheight = abodyheight;
        this._ahaircolor = ahaircolor;
        this._adescription = adescription;
        this._asmoking = asmoking;
        this._areligion = areligion;
        this._asearchingFor = asearchingfor;
    }

    /**
     *  Setzen des Alters
     */
    set_aage(age) {
        this._aage = age;
    }

    /**
     *  Löschen des Alters
     */

    delete_aage() {
        this._aage = null;
    }

    /**
     *  Gibt das Alter zurück
     */

    get_aage() {
        return this._aage
    }

    /**
     *  Setzen des Geschlechts
     */

    set_asex(sex) {
        this._asex = sex;
    }

    /**
     * Löschen des Geschlechts
     */

    delete_asex() {
        this._asex = null;
    }

    /**
     * Gibt das Geschlecht zurück
     */

    get_asex() {
        return this._asex;
    }

    /**
     * Setzen der Körpergröße
     */

    set_abodyheight(bodyheight) {
        this._abodyheight = bodyheight;
    }

    /**
     * Löschen der Körpergröße
     */

    delete_abodyheight() {
        this._abodyheight = null;
    }

    /**
     * Gibt die Körpergröße zurück
     */

    get_abodyheight() {
        return this._abodyheight;
    }
    /**
     * Setzen der Haarfarbe
     */

    set_ahaircolor(haircolor) {
        this._ahaircolor = haircolor;
    }

    /**
     * Löschen der Haarfarbe
     */

    delete_ahaircolor() {
        this._ahaircolor = null;
    }
    /**
     * Gibt die Haarfarbe zurück
     */

    get_ahaircolor() {
        return this._ahaircolor;
    }

    /**
     * Setzen der Beschreibung
     */

    set_adescription(description) {
        this._adescription = description;
    }

    /**
     * Löschen der Beschreibung
     */

    delete_adescription() {
        this._adescription = null;
    }
    /**
     * Gibt die Beschreibung zurück
     */

    get_adescription() {
        return this._adescription;
    }

    /**
     * Setzen des Nicht-/Raucher
     */

    set_asmoking(smoking) {
        this._asmoking = smoking;
    }

    /**
     * Löschen des Nicht-/Raucher
     */

    delete_asmoking() {
        this._asmoking = null;
    }
    /**
     * Gibt den Nicht-/Raucher zurück
     */

    get_asmoking() {
        return this._asmoking;
    }

    /**
     * Setzen der Religion
     */

    set_areligion(religion) {
        this._areligion = religion;
    }

    /**
     * Löschen der Religion
     */

    delete_areligion() {
        this._areligion = null;
    }
    /**
     * Gibt die Religion zurück
     */

    get_areligion() {
        return this._areligion;
    }

    /**
     * Setzen des gesuchten Geschlechts
     */

    set_asearchingfor(pref) {
        this._asearchingFor = searchingfor;
    }

    /**
     * Löschen des gesuchten Geschechts
     */

    delete_asearchingfor() {
        this._asearchingFor = null;
    }
    /**
     * Gibt das gesuchte Geschlecht zurück
     */

    get_asearchingfor() {
        return this._asearchingFor;
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