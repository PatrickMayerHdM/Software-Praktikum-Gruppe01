import messageBO from './MessageBO';
import profileBO from "./ProfileBO";
import ProfileBO from "./ProfileBO";
import Characteristic from "./CharacteristicBO";
import infoobjectBO from "./InfoObjectBO";
import favoriteNoteBO from "./FavoriteNoteBO";
import blockNoteBO from "./BlockNoteBO";
import searchprofileBO from "./SearchprofileBO";
import FavoriteNoteBO from '../api/FavoriteNoteBO';
import NamedInfoObjectBO from "./NamedInfoObjectBO";
import CharacteristicBO from "./CharacteristicBO";
import profilevisitsBO from "./ProfilevisitsBO";
import BusinessObject from "./BusinessObject";

export default class DatingSiteAPI {

    // Singelton instance
    static #api = null;

    // Local Python backend
    #datingServerBaseURL = '/system';

    // Local http-fake-backend
    // #datingServerBaseURL = '/api/system';


    // Message related

    #getAllMessagesURL = (profileID, otherprofileID) => `${this.#datingServerBaseURL}/ChatWindow/${profileID}/${otherprofileID}`;
    #addMessageURL = () => `${this.#datingServerBaseURL}/ChatWindow`;
    #getChatsURL = (id) => `${this.#datingServerBaseURL}/ChatProfileBoxList/${id}`;

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
            console.log("Innerhalb der Dating API: ", responseJSON)
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
     * Verantwortlich, um die Profile zu bekommen, mit welchen ein User einen Chat hat.
     */

    getChats(id) {
        return this.#fetchAdvanced(this.#getChatsURL(id))
            .then((responseJSON) => {
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                })

            })
    }



    // Profile related

    #addProfileURL = () => `${this.#datingServerBaseURL}/profiles`;
    #removeProfileURL = (profile_id) => `${this.#datingServerBaseURL}/profiles/${profile_id}`;
    #updateProfileURL = (profile_id) => `${this.#datingServerBaseURL}/infoobjects/${profile_id}`;
    #addInfoObject = () => `${this.#datingServerBaseURL}/infoobjects`;
    #getInfoObjectsURL = (profile_id) => `${this.#datingServerBaseURL}/infoobjects/${profile_id}`;
    #getCharNameURL = (char_id) => `${this.#datingServerBaseURL}/Profile/characteristics/${char_id}`;
    #createCharDescForProfileURL = () => `${this.#datingServerBaseURL}/namedinfoobjects`;
    #getProfileByIdURL = (profile_id) => `${this.#datingServerBaseURL}/profiles/${profile_id}`;
    #removeNamedCharByValueURL = (char_value) => `${this.#datingServerBaseURL}/infoobjects/${char_value}`;

    #updateNamedCharByCharValueURL = (profile_id) => `${this.#datingServerBaseURL}/updateNamedCharNamesAndValues`;


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
            console.log("API Proifle bei der Erstellung: ", profile)
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

    updateInfoObject(infoobject) {
        console.log("InfoObject: ", infoobject)
        return this.#fetchAdvanced(this.#updateProfileURL(infoobject.get_profile_fk()), {
            method: "PUT",
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

    updateNamedCharByURL(google_fk) {
        console.log("updatedNamedChar: ", google_fk)
        return this.#fetchAdvanced(this.#updateNamedCharByCharValueURL(google_fk), {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(google_fk)
        }).then((responseJSON) => {
            let newnamedcharvalue = NamedInfoObjectBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(newnamedcharvalue);
            })
        })
    }


    createCharDescForProfile(characteristic_desc_name) {
        return this.#fetchAdvanced(this.#createCharDescForProfileURL(), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(characteristic_desc_name)
        }).then((responseJSON) => {
            let createdCharDescForProfile = NamedInfoObjectBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(createdCharDescForProfile);
            })
        })
    }

    getInfoObjects(googleID) {
        console.log("Google ID für InfosObjeckte: ", googleID)
        return this.#fetchAdvanced(this.#getInfoObjectsURL(googleID))
            .then((responseJSON) => {
                let infoobjectBOs = infoobjectBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(infoobjectBOs);
                });
            });
    }

    /**
     * @param {characteristicBO} characteristic object
     * @public
     */


    getCharName(char_id) {
        console.log("EigenschaftsID: ", char_id);
        return this.#fetchAdvanced(this.#getCharNameURL(char_id))
            .then((responeJSON) => {
                let namedCHAR = CharacteristicBO.fromJSON(responeJSON);
                return namedCHAR
            })
    }

    removeNamedChar(char_value) {
        console.log("Namedchar in der API: ", char_value);
        return this.#fetchAdvanced(this.#removeNamedCharByValueURL(char_value), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(char_value)
        })
    }

    getProfileByID(google_fk) {
        let profile = this.#fetchAdvanced(this.#getProfileByIdURL(google_fk));
        console.log("Profile: ", profile);
        return this.#fetchAdvanced(this.#getProfileByIdURL(google_fk))
            .then((responseJSON) => {
            console.log("Profilid: ", responseJSON)
            let responseProfileBO = profileBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseProfileBO);
            })
        })
    }

    /**
     * Bereich für die Suche
     */

    #getSearchProfilesByIdURL = (profile_id) => `${this.#datingServerBaseURL}/Search/SearchProfiles/${profile_id}`;
    #removeSearchProfile = (searchprofile_id) => `${this.#datingServerBaseURL}/Search/SearchProfiles/${searchprofile_id}`;
    #addSearchProfileURL = () => `${this.#datingServerBaseURL}/SearchProfiles`;
    #addSearchInfoObject = () => `${this.#datingServerBaseURL}/SearchProfiles/infoobjects`;
    #getOneSearchprofileByIdURL = (searchprofile_id) => `${this.#datingServerBaseURL}/Search/SearchProfiles/${searchprofile_id}`;
    #updateSearchProfileURL = (searchprofile_id) => `${this.#datingServerBaseURL}/SearchProfiles/infoobjects/${searchprofile_id}`;
    #getSearchResultsURL = (searchprofile_id) => `${this.#datingServerBaseURL}/Search/Matchmaking/${searchprofile_id}`;


    /**
     * Verantwortlich, um die Suchprofile eines Users anhand der ID zu bekommen.
     */

    getSearchProfileIDs(profile_id){
        return this.#fetchAdvanced(this.#getSearchProfilesByIdURL(profile_id))
            .then((responseJSON) => {
                //console.log("Das responseJSON")
                //console.log(responseJSON)
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                })

            })
    }

    removeSearchProfile(searchprofile_id) {
        return this.#fetchAdvanced(this.#removeSearchProfile(searchprofile_id), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
        })
            .then((responseJSON) => {
                let removedsearchprofBO = searchprofileBO.fromJSON(responseJSON)[0];
                return new Promise(function (resolve) {
                    resolve(removedsearchprofBO);
                })
            })
    }

    /**
     * Verantwortlich, um die InfoObjekte eines erstellten Suchprofils an das Backend zu übergeben.
     */

    addSearchInfoObject(infoobject) {
        return this.#fetchAdvanced(this.#addSearchInfoObject(), {
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

    /**
     * Verantwortlich, um ein erstelltes Suchprofil an das Backend zu übergeben.
     */

    addSearchProfile(searchprofile){
        return this.#fetchAdvanced(this.#addSearchProfileURL(), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(searchprofile)
        }).then((responseJSON) => {
            let oneSearchProfile = searchprofileBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(oneSearchProfile);
            })
        })
    }


    getOneSearchprofile(searchprofile_id){
        return this.#fetchAdvanced(this.#getOneSearchprofileByIdURL(searchprofile_id))
            .then((responseJSON) => {
                let infoobjectBOs = infoobjectBO.fromJSON(responseJSON);
                console.log("responseJSON API Infoobjects Suchprofil: ", responseJSON);
                return new Promise(function (resolve) {
                    resolve(infoobjectBOs);
                })
            })
    }

    /**
     * Verantwortlich, um die Suchergebnisse basierend auf einem Suchprofil zu erhalten.
     */
    getSearchResults(searchprofile_id){
        return this.#fetchAdvanced(this.#getSearchResultsURL(searchprofile_id))
            .then((responseJSON) => {
                return new Promise(function (resolve){
                    resolve(responseJSON)
                })
            });
    }


    updateSearchInfoObject(infoobject) {
        console.log("InfoObject: ", infoobject)
        return this.#fetchAdvanced(this.#updateSearchProfileURL(infoobject.get_searchprofile_id()), {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(infoobject)
        }).then((responseJSON) => {
            let newsearchinfoobjectBO = infoobjectBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(newsearchinfoobjectBO);
            })
        })
    }



        // Favoritenote related

    #getFavoritenoteProfileURL = (profile_id) => `${this.#datingServerBaseURL}/FavoritenoteProfiles/${profile_id}`;
    #addFavoriteProfile = (profile_id) => `${this.#datingServerBaseURL}/Favoritenote`;
    #removeFavoriteProfileURL = (profile_id, other_profile_id) => `${this.#datingServerBaseURL}/FavoritenoteProfiles/${profile_id}/${other_profile_id}`;


    getFavoritenoteProfileURL(profile_id){
        return this.#fetchAdvanced(this.#getFavoritenoteProfileURL(profile_id))
            .then((responseJSON) => {
                console.log("Das responseJSON: ", responseJSON);
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                });
            });
    }



   addFavoritenoteProfileURL(profile_id) {
        return this.#fetchAdvanced(this.#addFavoriteProfile(profile_id), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(profile_id)
        }).then((responseJSON) => {
            let favorBO = favoriteNoteBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(favorBO);
            })
        })
    }

   removeFavoritenoteProfileURL(profile_id, other_profile_id) {
        return this.#fetchAdvanced(this.#removeFavoriteProfileURL(profile_id, other_profile_id), {
            method: 'DELETE'
        })
            .then((responseJSON) => {
                let delBO = favoriteNoteBO.fromJSON(responseJSON[0]);
                return new Promise(function (resolve) {
                    resolve(delBO);
                })
            })
   }


    // blockNote related

    #getBlocknoteProfileURL = (profile_id) => `${this.#datingServerBaseURL}/BlocknoteProfiles/${profile_id}`;
    #addBlockProfile = (profile_id) => `${this.#datingServerBaseURL}/Blocknote`;
    #removeBlockProfileURL = (profile_id, other_profile_id) => `${this.#datingServerBaseURL}/BlocknoteProfiles/${profile_id}/${other_profile_id}`;


    getBlocknoteProfileURL(profile_id){
        return this.#fetchAdvanced(this.#getBlocknoteProfileURL(profile_id))
            .then((responseJSON) => {
                console.log("Das responseJSON: ", responseJSON);
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                });
            });
    }

    addBlocknoteProfileURL(profile_id) {
        return this.#fetchAdvanced(this.#addBlockProfile(profile_id), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(profile_id)
        }).then((responseJSON) => {
            let blockBO = blockNoteBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(blockBO);
            })
        })
    }

    /**
     * Verantwortlich, um an das Backend weiterzuleiten, dass ein User von der Blockierliste eines anderen Users
     * entfernt werden soll.
     */

    removeBlocknoteProfile(profile_id, other_profile_id) {
        return this.#fetchAdvanced(this.#removeBlockProfileURL(profile_id, other_profile_id), {
            method: 'DELETE'
        })
            .then((responseJSON) => {
                let delBO = favoriteNoteBO.fromJSON(responseJSON[0]);
                return new Promise(function (resolve) {
                    resolve(delBO);
                })
            })

    }
    #addprofilevisitsURL = () => `${this.#datingServerBaseURL}/visit`

    addprofilevisits(profilevisits) {
        return this.#fetchAdvanced(this.#addprofilevisitsURL(), {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(profilevisits)
        }).then((responseJSON) => {
            let newprofilevisitsBO = profilevisitsBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(newprofilevisitsBO);
            })
        })
    }
}

