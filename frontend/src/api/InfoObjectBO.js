import BusinessObject from "./BusinessObject";

/**
 * Repräsentiert ein Infoobjekt (infobject)
 */

export default class infoobjectBO extends BusinessObject {

    /**
     * Baut ein infoobjectBO mit Eigenschaftsvalues auf
     *
     * @param {*} achar_fk
     * @param {*} aprofile_fk
     * @param {*} avalue
     * @param {*} aage
     * @param {*} afirstanme
     * @param {*} agender
     * @param {*} ahair
     * @param {*} aheight
     * @param {*} alastname
     * @param {*} areligion
     * @param {*} asmoking
     * */

    constructor() {
        super();
        this.char_fk = null;
        this.profile_fk = null;
        this.value = null;
        this.age = null;
        this.firstname = null;
        this.gender = null;
        this.height = null;
        this.lastname = null;
        this.religion = null;
        this.smoking = null;
    }

    /** Setzen des Values */
    set_value(avalue) {
        this.value = avalue;
    }
    /** Auslesen des Values */
    get_value() {
        return this.value;
    }
    /** Setzen des Char_fk */
    set_char_fk(achar_fk) {
        this.char_fk = achar_fk;
    }
    /** Auslesen des Char_fk */
    get_char_fk() {
        return this.char_fk;
    }
    /** Setzen des Profil_fk */
    set_profile_fk(aprofile) {
        this.profile_fk = aprofile;
    }
    /** Auslesen des Profil_fk */
    get_profile_fk() {
        return this.profile_fk;
    }
    /** Setzen des Ages */
    set_age(aage) {
        this.age = aage;
    }
    /** Auslesen des Ages */
    get_age() {
        return this.age;
    }
    /** Setzen des Firstnames */
    set_first_name(afirstname) {
        this.firstname = afirstname;
    }
    /** Auslesen des Firstnames */
    get_first_name() {
        return this.firstname;
    }
    /** Setzen des Genders */
    set_gender(agender) {
        this.gender = agender;
    }
    /** Auslesen des Genders */
    get_gender() {
        return this.gender;
    }
    /** Setzen des Hairs */
    set_hair(ahair) {
        this.hair = ahair;
    }
    /** Auslesen des Hairs */
    get_hair() {
        return this.hair;
    }
    /** Setzen des Heights */
    set_height(aheight) {
        this.height = aheight;
    }
    /** Auslesen des Heights */
    get_height() {
        return this.height;
    }
    /** Setzen des Lastnames */
    set_last_name(alastname) {
        this.lastname = alastname;
    }
    /** Auslesen des Lastnames */
    get_last_name() {
        return this.lastname;
    }
    /** Setzen der Religions */
    set_religion(areligion) {
        this.religion = areligion;
    }
    /** Auslesen der Religions */
    get_religion() {
        return this.religion;
    }
    /** Setzen des Smokings */
    set_smoking_status(asmoking) {
        this.smoking = asmoking;
    }
    /** Auslesen des Smokings */
    get_smoking_status() {
        return this.smoking;
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