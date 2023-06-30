import BusinessObject from "./BusinessObject";

export default class NamedInfoObjectBO extends BusinessObject {

    /**
     * Baut eine NamedInfoObjectBO mit id, name
     * Parameter für NamedInfoObjects BO
     * @param {*} aid
     * @param {*} aprofile_fk
     * @param {*} asearchprofile_id
     * @param {*} achar_desc
     * @param {*} achar_name
     * @param {*} achar_id
     * @param {*} achar_typ
     */
    constructor(aid, aprofile_fk, asearchprofile_id, achar_desc, achar_name, achar_id, achar_typ) {
        super();
        this.id = aid;
        this.profile_fk = aprofile_fk;
        this.searchprofile_id = asearchprofile_id;
        this.char_id = achar_id;
        this.char_name = achar_name;
        this.char_desc = achar_desc;
        this.char_typ = achar_typ;
    }

    get_named_info_id() {
        return this.id;
    }

    get_named_info_desc() {
        return this.char_desc;
    }

    set_named_info_id(aid) {
        this.char_id = aid
    }
    set_named_info_desc(achar_desc) {
        this.char_desc = achar_desc
    }

    set_searchprofile_id(asearchprofile_id) {
        this.searchprofile_id = asearchprofile_id;
    }

    get_info_searchprofile_id() {
        return this.searchprofile_id;
    }

    set_profile_fk(aprofile_fk) {
        this.profile_fk = aprofile_fk;
    }
    get_info_profile_fk() {
        return this.profile_fk;
    }

    set_char_name(achar_name) {
        this.char_name = achar_name;
    }
    get_char_name() {
        return this.char_name;
    }

    set_char_id(achar_id) {
        this.char_id = achar_id;
    }
    get_char_id() {
        return this.char_id;
    }

    set_char_typ(achar_typ) {
        this.char_typ = achar_typ;
    }
    get_char_typ() {
        return this.char_typ;
    }

    static fromJSON(namedinfoobject) {
            let result = [];

            if (Array.isArray(namedinfoobject)) {
                namedinfoobject.forEach((i) => {
                    Object.setPrototypeOf(i, NamedInfoObjectBO.prototype);
                    result.push(i);
                })
            } else {
                let i = namedinfoobject
                Object.setPrototypeOf(i, NamedInfoObjectBO.prototype);
                result.push(i);
            }

            return result;
    }
}