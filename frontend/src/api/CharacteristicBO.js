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
     *  Setzen des Sexes
     */

    set_sex(sex) {
        this._sex = sex;
    }

    /**
     *  Setzen des Alters
     */

}