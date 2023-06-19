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
     * @param {*} aminAge
     * @param {*} amaxAge
     * @param {*} aincome
     * @param {*} afavclub
     * @param {*} ahobby
     * @param {*} apoliticaltendency
     * @param {*} aaboutme
     * */

    constructor(aprofile_fk, achar_fk, avalue,asearchprofile_id, aage, afirstName, agender, ahair,aheight, alastName, areligion, asmoking, aminAge, amaxAge, asearchprofile_fk, aincome, afavclub, ahobby, apoliticaltendency, aaboutme) {
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
    // Ab hier hinzugefügt für Suchprofil
    this.minAge = aminAge;
    this.maxAge = amaxAge;
    this.searchprofile_fk = asearchprofile_fk;
    this.income = aincome;
    this.favclub = afavclub;
    this.hobby = ahobby;
    this.politicaltendency = apoliticaltendency;
    this.aboutme = aaboutme;
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

    /** Hinzugefügt für Suchprofil*/
    /** Setzen des minAge*/
    set_minAge(aminAge) {
        this.minAge = aminAge;
    }

    /** Auslesen des minAge*/
    get_minAge(){
        return this.minAge
    }

    /** Setzen des maxAge*/
    set_maxAge(amaxAge) {
        this.maxAge = amaxAge;
    }

    /** Auslesen des maxAge*/
    get_maxAge(){
        return this.maxAge
    }

    /** Setzen des searchprofile_fk*/
    set_searchprofile_fk(searchprofile_fk) {
        this.searchprofile_fk = searchprofile_fk;
    }

    /** Auslesen des searchprofile_fk*/
    get_searchprofile_fk(){
        return this.searchprofile_fk
    }

    /**
     * Searchprofile id Funktionen welche aus dem main übernommen wurden, für das Suchprofil an sich jedoch keine
     * Relevanz darstellen
     */

    set_searchprofile_id(asearchprofile_id) {
        this.searchprofile_id = asearchprofile_id;
    }

    get_searchprofile_id() {
        return this.searchprofile_id;
    }

    set_income(aincome) {
        this.income = aincome;
    }

    get_income() {
        return this.income;
    }
    set_favclub(afavclub) {
        this.favclub = afavclub;
    }

    get_favclub() {
        return this.favclub;
    }

    set_hobby(ahobby) {
        this.hobby = ahobby;
    }

    get_hobby() {
        return this.hobby;
    }

    set_politicaltendency(apoliticaltendency) {
        this.politicaltendency = apoliticaltendency ;
    }

    get_politicaltendency() {
        return this.politicaltendency;
    }

    set_aboutme(aaboutme) {
        this.aboutme = aaboutme
    }

    get_aboutme() {
        return this.aboutme;
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
            return result;
    }
}