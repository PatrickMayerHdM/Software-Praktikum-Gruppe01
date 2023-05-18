import BusinessObject from "./BusinessObject";

/**
 * Repräsentiert eine Beziehung (relationship)
 * */

export default class relationshipBO extends RelationshipBO {

    /**
     * Baut ein relationshipBO mit relationship_id
     *
     * @param {*} relationship_id
     *
     * */

    constructor(arelationship_id) {
        super();
        this.relationship_id = arelationship_id
    }

    /**
     * Setzt die Id einer Beziehung
     *
     * @param {*} arelationship_id - die neue id der Beziehung
     * */

    setRelationshipId(arelationship_id) {
        this.relationship_id = arelationship_id
    }

    /**
     * Holt sich die Id einer Beziehung
     * */

    getRelationshipId() {
        return this.relationship_id
    }

    /**
     * Setzt etwas anderes
     * */

    /**
     * Holt etwas anderes
     * */


    /**
     * Gibt ein Array der RelationshipBO als JSON Struktur zurück
     * */

}