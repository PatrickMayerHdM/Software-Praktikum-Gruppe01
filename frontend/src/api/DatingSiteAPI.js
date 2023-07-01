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


    // Message related URL´s

    #getAllMessagesURL = (profileID, otherprofileID) => `${this.#datingServerBaseURL}/ChatWindow/${profileID}/${otherprofileID}`;
    #addMessageURL = () => `${this.#datingServerBaseURL}/ChatWindow`;
    #getChatsURL = (id) => `${this.#datingServerBaseURL}/ChatProfileBoxList/${id}`;

    /**
     * Singelton API:
     * Gibt eine Singleton-Instanz der DatingSiteAPI zurück. Wenn keine Instanz existiert, wird eine neue gespeichert
     * und gespeichert.
     * */
    static getAPI() {
        if (this.#api == null) {
            this.#api = new DatingSiteAPI();
        }
        return this.#api;
    }


    /**
     * Erweiterter Fetch-Aufruf, der eine URL und einen init Parameter verwendet.
     * Wenn die Antwort nicht erfolgreich ist, dann wird ein Fehler geworfen. (res.ok = false)
     * @param url = URL für den Fetch-Aufruf
     * @param init = Parameter für den Aufruf (GET, POST, PUT, DELETE)
     * */
    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        })


    /**
     * API-Aufruf, um alle Nachrichten zwischen den angegebenen Profilen auszulesen.
     * @param profileID = ID des eigenen Profils.
     * @param otherprofileID = ID des anderen Profils.
     */

    getAllMessages(profileID, otherprofileID) {
        return this.#fetchAdvanced(this.#getAllMessagesURL(profileID, otherprofileID)).then((responseJSON) => {
            let messageBOs = messageBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(messageBOs);
            })
        })
    }

    /**
     * API-Aufruf um eine Nachricht zu versenden.
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
    #getAllCharNameURL = () => `${this.#datingServerBaseURL}/characteristics/all`;
    #updateNamedCharByCharValueURL = () => `${this.#datingServerBaseURL}/updateNamedCharNamesAndValues`;
    #getAllInfoObjectsByCharIDURL = (char_id) => `${this.#datingServerBaseURL}/infoobjects/all/${char_id}`


    /**
     * Hinzufügen eines Profils.
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
     * Löschen einer Profil-Instanz.
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
     * API-Aufruf zum hinzufügen von InfoObjekten.
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
            let newinfoobjectBO = infoobjectBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(newinfoobjectBO);
            })
        })
    }

    /**
     * API-Aufruf um InfoObjekte auszulesen.
     * */
    getInfoObjectsCharID(char_id) {
        return this.#fetchAdvanced(this.#getAllInfoObjectsByCharIDURL(char_id))
            .then((responeJSON) => {
                return responeJSON
            })
    }

    /**
     * API-Aufruf um InfoObjekte zu aktualisieren.
     * */
    updateInfoObject(infoobject) {
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

    /**
     * Aktualisieren einer Characteristic anhand der GoogleID
     * */
    updateNamedCharByURL(google_fk) {
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

    /**
     * Ruft alle Charakternamen ab.
     */
    getAllCharNames() {
        return this.#fetchAdvanced(this.#getAllCharNameURL())
            .then((responeJSON) => {
                let namedCHAR = CharacteristicBO.fromJSON(responeJSON);
                return namedCHAR
            })
    };


    /**
     * API-Aufruf um eine Charakterbeschreibung für ein Profil zu erstellen.
     * */
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

    /**
     * API-Aufruf aller InfoObjekte eines Profils.
     * */
    getInfoObjects(googleID) {
        return this.#fetchAdvanced(this.#getInfoObjectsURL(googleID))
            .then((responseJSON) => {
                let infoobjectBOs = infoobjectBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(infoobjectBOs);
                });
            });
    }

    /**
     * API-Aufruf um den char_name zu erhalten.
     */
    getCharName(char_id) {
        return this.#fetchAdvanced(this.#getCharNameURL(char_id))
            .then((responeJSON) => {
                let namedCHAR = CharacteristicBO.fromJSON(responeJSON);
                return namedCHAR
            })
    }

    /**
     * API-Aufruf um eine Characteristic zu löschen.
     * */
    removeNamedChar(char_value) {
        return this.#fetchAdvanced(this.#removeNamedCharByValueURL(char_value), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': "application/json",
            },
            body: JSON.stringify(char_value)
        })
    }

    /**
     * API-Aufruf um ein Profil auszulesen
     * @param google_fk = GoogleID eines Users.
     */
    getProfileByID(google_fk) {
        let profile = this.#fetchAdvanced(this.#getProfileByIdURL(google_fk));
        return this.#fetchAdvanced(this.#getProfileByIdURL(google_fk))
            .then((responseJSON) => {
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
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                })

            })
    }

    /**
     * API-Aufruf um ein Suchprofil zu löschen.
     * */
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


    /**
     * API-Aufruf um ein bestimmtes Suchprofil aufzurufen.
     * */
    getOneSearchprofile(searchprofile_id){
        return this.#fetchAdvanced(this.#getOneSearchprofileByIdURL(searchprofile_id))
            .then((responseJSON) => {
                let infoobjectBOs = infoobjectBO.fromJSON(responseJSON);
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


    /**
     * API-Aufruf um die InfoObjekte eines Suchprofils zu aktualisieren.
     * */
    updateSearchInfoObject(infoobject) {
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


    /**
     * API-Aufruf zum Auslesen der Merkliste.
     * */
    getFavoritenoteProfileURL(profile_id){
        return this.#fetchAdvanced(this.#getFavoritenoteProfileURL(profile_id))
            .then((responseJSON) => {
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                });
            });
    }



    /**
     * Hinzufügen eines Merklisten-Eintrags
     * */
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

    /**
     * Entfernen eines Merklisten-Eintrags.
     * */
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


    /**
     * Sperrlisteneinträge eines Profils abrufen.
     * */
    getBlocknoteProfileURL(profile_id){
        return this.#fetchAdvanced(this.#getBlocknoteProfileURL(profile_id))
            .then((responseJSON) => {
                return new Promise(function (resolve) {
                    resolve(responseJSON);
                });
            });
    }

    /**
     * Hinzufügen eines Profils in die Sperrliste
     * */
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

    /**
     * Profilvisits related Api-Aufrufe
     * */
    #addprofilevisitsURL = () => `${this.#datingServerBaseURL}/visit`

    /**
     * Hinzufügen einer Profil-Besichtigung
     * */
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

