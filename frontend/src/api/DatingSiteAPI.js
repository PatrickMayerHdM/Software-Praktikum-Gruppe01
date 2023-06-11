import messageBO from './MessageBO';
import profileBO from "./ProfileBO";
import ProfileBO from "./ProfileBO";
import Characteristic from "./CharacteristicBO";
import infoobjectBO from "./InfoObjectBO";
import favoriteNoteBO from "./FavoriteNoteBO";


export default class DatingSiteAPI {

    // Singelton instance
    static #api = null;

    // Local Python backend
    #datingServerBaseURL = '/system';

    // Local http-fake-backend
    //#datingServerBaseURL = '/api/system';


    // Message related

    #getAllMessagesURL = (profileID, otherprofileID) => `${this.#datingServerBaseURL}/ChatWindow/${profileID}/${otherprofileID}`;
    #addMessageURL = () => `${this.#datingServerBaseURL}/ChatWindow`;
    #getChatsURL = (id) => `${this.#datingServerBaseURL}/ChatProfileBoxList/${id}`;
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

    getAllMessages(profileID, otherprofileID) {
        return this.#fetchAdvanced(this.#getAllMessagesURL(profileID, otherprofileID)).then((responseJSON) => {
            console.log("Innerhalb der Dating API: ", responseJSON )
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

    /**
     *
     * @param ID
     * @returns {Promise<unknown>}
     */
    getChats(id){
        return this.#fetchAdvanced(this.#getChatsURL(id))
            .then((responseJSON) => {
                console.log("Das responseJSON:")
                console.log(responseJSON)
                return new Promise(function (resolve) {
                    resolve(responseJSON);
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
    #removeProfileURL = (profile_id) => `${this.#datingServerBaseURL}/profiles/${profile_id}`;
    #updateProfileURL = () => `${this.#datingServerBaseURL}/profiles`;
    #addInfoObject = () => `${this.#datingServerBaseURL}/infoobjects`;
    #getInfoObjectsURL = (profile_id) => `${this.#datingServerBaseURL}/infoobjects/${profile_id}`;
    #createCharForProfileURL = () => `${this.#datingServerBaseURL}/characteristics`;
    #getProfileByIdURL = (profile_id) => `${this.#datingServerBaseURL}/profiles/${profile_id}`;


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

    removeProfile(google_fk) {
        return this.#fetchAdvanced(this.#removeProfileURL(google_fk), {
            method: "DELETE",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(google_fk)
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
     * @param {infoobjectBO} infoobjec object
     * @public
     */
    addInfoObject(infoobject) {
        console.log("InfoObject: ", infoobject)
        return this.#fetchAdvanced(this.#addInfoObject(), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(infoobject)
        }).then((responseJSON) => {
            let newinfoobjectBO = infoobjectBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(newinfoobjectBO);
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

    getInfoObjects() {
        return this.#fetchAdvanced(this.#getInfoObjectsURL(), {
            method: "GET",
            header: {
                'Accept': 'application/json, text/plain'
            }
        }).then((responseJSON) => {
            let infoObects = infoobjectBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(infoObects);
            });
        });
    }

    getAllProfiles() {
        return this.#fetchAdvanced(this.#getAllProfilesURL()).then((responseJSON) => {
            let profileBOs = ProfileBO.fromJSON(responseJSON);

            return new Promise(function (resolve) {
                resolve(profileBOs);
            })
        })
    }

    getProfileByID(google_fk) {
        return this.#fetchAdvanced(this.#getProfileByIdURL(google_fk))
            .then((responseJSON) => {
            console.log("BackEnd Objekt:", responseJSON)
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

        // Favoritenote related

    #getFavoritenoteProfileURL = (profile_id) => `${this.#datingServerBaseURL}/FavoritenoteProfiles/${profile_id}`;
    // #removeFavoriteProfileByIdURL = (profile_id) => `${this.#datingServerBaseURL}/FavoritenoteProfilesIDs/${profile_id}`;
    // #addFavoriteProfile = (profile_id) => `${this.#datingServerBaseURL}/FavoritenoteProfiles/${profile_id}`;

    getFavoritenoteProfileURL(profile_id){
        return this.#fetchAdvanced(this.#getFavoritenoteProfileURL(profile_id))
            .then((responseJSON) => {
                console.log("Das responseJSON: ", responseJSON);
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                });
            });
    }



   // addFavoriteProfile(profile_id) {
   //      return this.#fetchAdvanced(this.#addFavoriteProfile(profile_id), {
   //          method: "POST",
   //          headers: {
   //              'Accept': 'application/json, text/plain',
   //              'Content-type': "application/json",
   //          },
   //          body: JSON.stringify(profile_id)
   //      }).then((responseJSON) => {
   //          let favorBO = favoriteNoteBO.fromJSON(responseJSON)[0];
   //          return new Promise(function (resolve) {
   //              resolve(favorBO);
   //          })
   //      })
   //  }
   //
   //  removeFavoritenoteProfileByIdURL(profile_id) {
   //  return this.#fetchAdvanced(this.#removeFavoriteProfileByIdURL(profile_id), {
   //    method: 'DELETE'
   //  })
   //    .then((responseJSON) => {
   //      let favorBOs = favoriteNoteBO.fromJSON(responseJSON)[0];
   //      return new Promise(function (resolve) {
   //        resolve(favorBOs);
   //      })
   //    })
   //  }


    // blockNote related

    #getBlocknoteProfileURL = (profile_id) => `${this.#datingServerBaseURL}/BlocknoteProfiles/${profile_id}`;

    getBlocknoteProfileURL(profile_id){
        return this.#fetchAdvanced(this.#getBlocknoteProfileURL(profile_id))
            .then((responseJSON) => {
                console.log("Das responseJSON: ", responseJSON);
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                });
            });
    }

}

