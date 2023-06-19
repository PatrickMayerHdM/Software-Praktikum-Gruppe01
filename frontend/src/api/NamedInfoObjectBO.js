import BusinessObject from "./BusinessObject";

export default class NamedInfoObjectBO extends BusinessObject {

    /**
     * Baut eine NamedInfoObjectBO mit id, name
     * Parameter für NamedInfoObjects BO
     * @param {*} aid
     * @param {*} aprofile_fk
     * @param {*} asearchprofile_id
     * @param {*} achar_desc
     */
    constructor(aid, aprofile_fk, asearchprofile_id, achar_desc) {
        super();
        this.id = aid;
        this.profile_fk = aprofile_fk;
        this.searchprofile_id = asearchprofile_id;
        this.char_desc = achar_desc;
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