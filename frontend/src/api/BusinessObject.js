/**
 * Basisklasse für alle BusinessObjekte, die per defult eine ID haben.
 */
export default class BusinessObject {

    /**
     * Der null constructor
     */
    constructor() {
        this.id = 0;
    }

    /**
     * Gibt dem BusinessObject eine ID
     *
     * @param {*} aId - die neue Id des BusinessObjects
     */

    setID(aId) {
        this.id = aId;
    }

    /**
     * Gibt die ID des Bussinesobjects zurück.
     */

    getID() {
        return this.id;
    }

    /**
     * Gibt eine string representation des Objekts. Dies ist nützlich für debugging.
     */
    toString() {
        let result = '';
        for (var prop in this) {
            result += prop + ': ' + this[prop] + ' ';
        }
        return result;
    }
}