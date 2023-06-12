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
     * @param {*} asearchprofile_id
     * @param {*} aage
     * @param {*} afirstName
     * @param {*} agender
     * @param {*} ahair
     * @param {*} aheight
     * @param {*} alastName
     * @param {*} areligion
     * @param {*} asmoking
     * */

    constructor(aprofile_fk, achar_fk, avalue, asearchprofile_id, aage, afirstName, agender, ahair, aheight, alastName, areligion, asmoking) {
    super();
    this.profile_fk = aprofile_fk;
    this.char_fk = achar_fk;
    this.value = avalue;
    this.searchprofile_id = asearchprofile_id;
    this.age = aage;
    this.firstName = afirstName;
    this.gender = agender;
    this.hair = ahair;
    this.height = aheight;
    this.lastName = alastName;
    this.religion = areligion;
    this.smoking = asmoking;
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
    set_first_name(afirstName) {
        this.firstName = afirstName;
    }
    /** Auslesen des Firstnames */
    get_first_name() {
        return this.firstName;
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
    set_last_name(alastName) {
        this.lastName = alastName;
    }
    /** Auslesen des Lastnames */
    get_last_name() {
        return this.lastName;
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

    set_searchprofile_id(asearchprofile_id) {
        this.searchprofile_id = asearchprofile_id;
    }

    get_searchprofile_id() {
        return this.searchprofile_id;
    }

      static fromJSON(infoobjects) {
            let result = [];

            if (Array.isArray(infoobjects)) {
                infoobjects.forEach((i) => {
                    Object.setPrototypeOf(i, infoobjectBO.prototype);
                    result.push(i);
                })
            } else {
                let i = infoobjects
                Object.setPrototypeOf(i, infoobjectBO.prototype);
                result.push(i);
            }
            console.log("Parsed infoobject:", result);
            return result;
    }
}