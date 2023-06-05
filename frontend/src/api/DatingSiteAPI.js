import messageBO from './MessageBO';
import profileBO from "./ProfileBO";
import ProfileBO from "./ProfileBO";
import Characteristic from "./CharacteristicBO";
import infoobjectBO from "./InfoObjectBO";


export default class DatingSiteAPI {

    // Singelton instance
    static #api = null;

    // Local Python backend
    #datingServerBaseURL = '/system';

    // Local http-fake-backend
    //#datingServerBaseURL = '/api/system';


    // Message related

    #getAllMessagesURL = () => `${this.#datingServerBaseURL}/messages`;
    #addMessageURL = () => `${this.#datingServerBaseURL}/messages`;
    //#getMessageByIdURL = (id) => `${this.#datingServerBaseURL}/Message/${id}`;

    // Singelton API
    static getAPI() {
        if (this.#api == null) {
            this.#api = new DatingSiteAPI();
        }
        return this.#api;
    }

    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
         })


    /**
     * @param {messageBO} message object
     * @public
     */

    getAllMessages() {
        return this.#fetchAdvanced(this.#getAllMessagesURL()).then((responseJSON) => {
            let messageBOs = messageBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(messageBOs);
            })
        })
    }

    /**
     * @param {messageBO} message object
     * @public
     */

    addMessage(message) {
        return this.#fetchAdvanced(this.#addMessageURL(), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(message)
        }).then((responseJSON) => {
            let mssageBO = messageBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(mssageBO);
            })
        })
    }

    /*getMessageByID(messageID) {
        return this.#fetchAdvanced(this.#getMessageByIdURL(messageID)).then((responseJSON) => {
            let responseMessageBO = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseMessageBO);
            })
        })
    }*/


    // Profile related

    #getAllProfilesURL = () => `${this.#datingServerBaseURL}/profiles`;
    #addProfileURL = () => `${this.#datingServerBaseURL}/profiles`;
    #removeProfileURL = () => `${this.#datingServerBaseURL}/profiles`;
    #updateProfileURL = () => `${this.#datingServerBaseURL}/profiles`;
    #addInfoObject = () => `${this.#datingServerBaseURL}/characteristics`;
    #createCharForProfileURL = () => `${this.#datingServerBaseURL}/characteristics`;
    #getProfileByIdURL = (id) => `${this.#datingServerBaseURL}/Profile/${id}`;


    /**
     * @param {profileBO} profile object
     * @public
     */

    addProfile(profile) {
        return this.#fetchAdvanced(this.#addProfileURL(), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(profile)
        }).then((responseJSON) => {
            let prfileBO = profileBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(prfileBO);
            })
        })
    }

    /**
     * @param {profileBO} profile object
     * @public
     */

    removeProfile(profile) {
        return this.#fetchAdvanced(this.#removeProfileURL(), {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(profile)
        }).then((responseJSON) => {
            let removedprfileBO = profileBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(removedprfileBO);
            })
        })
    }

    /**
     * @param {profileBO} profile object
     * @public
     */

    updateProfile(profile) {
        return this.#fetchAdvanced(this.#updateProfileURL(), {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(profile)
        }).then((responseJSON) => {
            let updatedprfileBO = profileBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(updatedprfileBO);
            })
        })
    }

    /**
     * @param {infoobjectBO} infoobject object
     * @public
     */
    addInfoObject(infoobject) {
        return this.#fetchAdvanced(this.#addInfoObject(), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(infoobject)
        }).then((responseJSON) => {
            let infoobjectBO = infoobjectBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(infoobjectBO);
            })
        })
    }

    createCharForProfile(characteristic) {
        return this.#fetchAdvanced(this.#createCharForProfileURL(), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(characteristic)
        }).then((responseJSON) => {
            let createdCharForProfile = profileBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(createdCharForProfile);
            })
        })
    }

    getAllProfiles() {
        return this.#fetchAdvanced(this.#getAllProfilesURL()).then((responseJSON) => {
            let profileBOs = ProfileBO.fromJSON(responseJSON);

            return new Promise(function (resolve) {
                resolve(profileBOs);
            })
        })
    }

    getProfileByID(profileID) {
        return this.#fetchAdvanced(this.#getProfileByIdURL(profileID)).then((responseJSON) => {
            let responseProfileBO = ProfileBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProfileBO);
            })
        })

    }

    /**
     * Bereich für die Suche
     */

    #getNewProfilesByIdURL = (profileID) => `${this.#datingServerBaseURL}/${profileID}/newprofiles`;
    #getSearchProfilesByIdURL = (id) => `${this.#datingServerBaseURL}/SearchProfileIDs`;
    #deleteSearchProfile = (id) => `${this.#datingServerBaseURL}/Profiles`;


    /**
     * Gibt ein Promise zurück, welches dann ein Array mit ProfilIDs enthält
     * @param {Number} profileID übergibt die profileID welche ein Profil nicht nicht besucht haben soll
    */

    getOnlyNewProfiles(profileID){
        return this.#fetchAdvanced(this.#getNewProfilesByIdURL(profileID))
            .then((responseJSON) => {
                console.log("Das ist das profile_id Dings im API call: ",profileID )
                console.log("Das responseJSON")
                console.log(responseJSON)
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                })

            })

    }

    /**
     * Gibt ein Promise zurück, welches dann ein Array mit den verschiedenen ProfilIDs für Suchprofile
     * @param {Number} accountID übergibt die accountID für welche die Profile nicht
    */

    getSearchProfileIDs(){
        return this.#fetchAdvanced(this.#getSearchProfilesByIdURL())
            .then((responseJSON) => {
                console.log("Das responseJSON")
                console.log(responseJSON)
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                })

            })
    }

    /**
     * Gibt ein Promise zurück, welches dann nur die neuen Profile anzeigt
     * @param {Number} profileID übergibt die profileID welche ein Profil nicht nicht besucht haben soll
    */

    deleteSearchProfile(profile_id) {
    return this.#fetchAdvanced(this.#deleteSearchProfile(profile_id), {
      method: 'DELETE'
    })
      .then((responseJSON) => {
        let profileBOs = ProfileBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(profileBOs);
        })
      })
  }

}

