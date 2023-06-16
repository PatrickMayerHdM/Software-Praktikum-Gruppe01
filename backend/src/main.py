from flask import Flask, jsonify
from flask_restx import Api, Resource, fields
#CORS ermöglicht es einem Client, Ressourcen von einem Server anzufordern, dessen Ursprung sich von dem des Clients unterscheidet.
from flask_cors import CORS, cross_origin
import json




from server.Administration import Administration
from server.bo.Account import Account
from server.bo.Profile import Profile
from server.bo.favoriteNote import FavoriteNote
from server.bo.blockNote import BlockNote
from server.bo.Message import Message
from server.bo.Characteristic import Characteristics
from server.bo.InfoObject import InfoObject
from server.bo.BusinessObject import BusinessObject
from server.bo.SearchProfile import SearchProfile

#SecurityDecorator übernimmt die Authentifikation
from SecurityDecorator import secured

#Flask wird instanziert
app = Flask(__name__)

# Aufrufe mit /system/* werden ermöglicht.
CORS(app, resources=r'/system/*')

#falls es hiermit probleme geben sollte könnten wir auch folgendes Probieren:
#CORS(app, support_credentials=True,
 #    resources={r'/system/*': {'origins':'*'}})

#API um Daten zwischen Clients und Server zu tauschen.
api = Api(app, version='1.0', title='DatingApp System API',
          description='System-API der DatingApp')

#Namespace wird angelegt. Dieser fasst alle Operationen unter dem Präfix /datingapp zusammen
datingapp = api.namespace('system', description='Funktionen der Datingapp')

#Hier werden für einige Klassen die JSON Strukturen definiert.
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='ID des BO´s')
})

account = api.inherit('Account', bo, {
    'google_id': fields.String(attribute='_google_id', description='GoogleID eines Accounts'),
    'profile_id': fields.Integer(attribute='_profile_id', description='Profil eines Accounts'),
    'name': fields.String(attribute='_name', description='Google-Name eines Accounts'),
    'email': fields.String(attribute='_email', description='E-Mail eines Google Accounts')
})

profile = api.inherit('Profile', bo, {
    'favoritenote_id': fields.Integer(attribute='_favoritenote_id', description='Merkliste eines Profils'),
    'blocknote_id': fields.Integer(attribute='_blocknote_id', description='Blockierliste eines Profils'),
    'google_fk': fields.String(attribute='_google_fk', description='Google_ID des Admin-Kontos')
})

message = api.inherit('Message', bo, {
    'sender_id': fields.String(attribute='_sender_id', description='Absender einer Nachricht'),
    'recipient_id': fields.String(attribute='_recipient_id', description='Empfänger einer Nachricht'),
    'content': fields.String(attribute='_content', description='Inhalt einer Nachricht')
})

characteristic = api.inherit('Characteristics', bo, {
    'char_id': fields.Integer(attribute='_char_id', description='ID einer Eigenschaft'),
    'char_name': fields.String(attribute='_char_name', description='Eigenschaftsname')
})

infoobject = api.inherit('InfoObject', bo, {
    'age': fields.DateTime(attribute='_age', description='Geburtsdatum des Profilinhabers'),
    'firstName': fields.String(attribute='_firstName', description='Vorname des Profilinhabers'),
    'gender': fields.String(attribute='_gender', description='Geschlecht'),
    'hair': fields.String(attribute='_hair', description='Haarfarbe'),
    'height': fields.Integer(attribute='_height', description='Größe'),
    'lastName': fields.String(attribute='_lastName', description='Nachname des Profilinhabers'),
    'religion': fields.String(attribute='_religion', description='Religion'),
    'smoking': fields.String(attribute='_smoking', description='Raucher oder Nichtraucher'),
    # Ab hier die fürs SuchProfil
    'minAge': fields.String(attribute='_minAge', description='Das minimalalter in einem SuchProfil'),
    'maxAge': fields.String(attribute='_maxAge', description='Das maximalalter in einem SuchProfil'),
    'searchprofile_fk': fields.String(attribute='searchprofile_fk', description='Die fk Verbindung zu SuchProfil'),
})

chat = api.inherit('Chat', bo, {
    'message_id': fields.Integer(attribute='_message_id', description='Unique Id einer Nachricht'),
    'profile_id': fields.Integer(attribute='_profile_id', description='Unique Id eines Profils')
})

favoritenote = api.inherit('FavoriteNote', bo, {
    'added_id': fields.String(attribute='_added_id', description='Id des hinzugefügten Profils'),
    'adding_id': fields.String(attribute='_adding_id', description='Id des hinzufügenden Profils')
})


blocknote = api.inherit('BlockNote', bo, {
    'blocked_id': fields.String(attribute='_blocked_id', description='Id des geblockten Profils'),
    'blocking_id': fields.String(attribute='_blocking_id', description='Id des blockenden Profils')
})

searchprofile = api.inherit('SearchProfile', bo, {
    #'SearchProfile_id': fields.Integer(attribute='_SearchProfile_id', description='SearchProfile_id eines SuchProfils'),
    'google_id': fields.String(attribute='_google_id', description='Google_ID eines SuchProfils')
})

"get- liest alles Projekte aus der DB und gibt diese als JSON ans Frontend weiter"
"post- greift auf ein JSON, welches aus dem Frontend kommt, zu und transformiert dies zu einem Projekt Objekt und"
"schreibt es in die DB"


@datingapp.route('/profiles')
@datingapp.response(500, 'Serverseitiger Fehler')
class ProfileListOperations(Resource):
    @datingapp.doc('Create new Profile')
    @datingapp.marshal_list_with(profile)
    #@secured
    def get(self):
        """ Auslesen aller Profil-Objekte. """
        adm = Administration()
        profiles = adm.get_all_profiles() #Admin.py noch nicht angelegt
        return profiles

    @datingapp.marshal_with(profile, code=200)
    # Wir erwarten ein Profile-Objekt von Client-Seite.
    @datingapp.expect(profile)
    @secured
    def post(self):
        """ Anlegen eines neuen Profil-Objekts. """
        adm = Administration()

        proposal = Profile.from_dict(api.payload)
        print('post-Method Profile:', api.payload)

        if proposal is not None:

            p = adm.create_profile(
                proposal.get_favorite_note_id(),
                proposal.get_block_note_id(),
                proposal.get_google_fk())

            return p, 200
        else:
            # Wenn etwas schief geht, geben wir einen String zurück und werfen einen Server-Fehler
            return ' ProfileOperations "Post" fehlgeschlagen', 500

@datingapp.route('/profiles/<string:google_fk>')
@datingapp.response(500, 'Serverseitiger-Fehler')
@datingapp.param('id', 'Die Google-ID des Profil-Objekts')
class ProfileOperations(Resource):
    @datingapp.marshal_with(profile) #Datenstruktur des Objektes der Get-Methode
    #@secured
    def get(self, google_fk):
        """ Auslesen eines bestimmten Profil-Objekts. """
        adm = Administration()
        prof = adm.get_profile_by_google_id(google_fk)
        print('get-Methode in Profile:', prof)
        print(type(prof))
        return prof

    @secured
    def delete(self, google_fk):
        """ Löschen eines besimmten Profil-Objekts. """

        adm = Administration()
        print("Google ID Main: ", google_fk)
        info_obj = adm.get_info_object_by_id(google_fk)
        adm.delete_info_object(info_obj)
        adm.delete_message(google_fk)
        prof = adm.get_profile_by_google_id(google_fk)
        adm.delete_profile(prof)
        return '', 200

"""SuchProfil"""
@datingapp.route('/SearchProfiles')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt")
@datingapp.param('id','SearchProfileBO')
class SearchProfileOpterations(Resource):

    @datingapp.marshal_list_with(SearchProfile)
    #@secured
    def get(self):
        """Auslesen aller Searchprofile-Objekte"""
        adm = Administration()
        SearchProfiles = adm.get_all_searchprofile()
        return SearchProfiles

    #@datingapp.marshal_with(SearchProfile, code=200)
    @datingapp.expect(searchprofile)
    #@secured
    def post(self):
        adm = Administration()
        print("Da wir ein Suchprofil erwarten hier der print", SearchProfile)
        print("Das ist die Payload (Suchprofil)",api.payload)
        ranvar = SearchProfile.from_dict(api.payload)
        print("Das ist das proposal (nach form.dict): ", ranvar)


        if ranvar is not None:

            adm.create_searchprofile(
                ranvar
            )

            return 200
        else:
            return "Der Post in SearchProfileOpterations ist fehlgeschlagen ", 500


"""Da das Suchprofil ein eigenes InfoObjekt Handling besitzt wird dies hier definiert """
@datingapp.route('/SearchProfiles/infoobjects')
@datingapp.response(500, 'Serverseitiger Fehler')
class InfoObjectListOperationsSearch(Resource):
    @datingapp.marshal_with(infoobject, code=200)
    @datingapp.expect(infoobject)
    #@secured
    def post(self):
        """ Anlegen eines neuen InfoObject-Objekts. """
        adm = Administration()
        print("Das ist die api.payload im main.py der InfoObjectListOperationsSearch", api.payload)

        proposal = InfoObject.from_dict(api.payload)

        if proposal is not None:
            infoobj = adm.create_Search_info_object(
                proposal.get_profile_fk(),
                proposal.to_dict()
            )

            return infoobj, 200
        else:
            return 'InfoObjectOperations "POST" fehlgeschlagen', 500


"""Handling um alle Suchprofil ID's eines Profils zu bekommen"""
@datingapp.route('/Search/SearchProfiles/<id>/')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt.")
@datingapp.param('id','GoogleID für welche die Suchprofile gesucht werden')
class SearchProfilesOperations(Resource):

    #@secured
    def get(self, id):

        adm = Administration()
        SearchP = adm.get_searchprofiles_by_google_id(id)

        if SearchP is not None:
            return SearchP, 200
        else:
            return "", 500


"""Handling, um ein spezifisches Suchprofil eines Profils zu bekommen"""
@datingapp.route('/Search/SearchProfiles/<int:searchprofile_id>')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt.")
@datingapp.param('id', 'Die Searchprofile-ID des Searchprofile-Objekts')
class SearchOneProfileOperation(Resource):

    @datingapp.marshal_with(infoobject)
    @secured
    def get(self, searchprofile_id):

        adm = Administration()
        search_info_objs = adm.get_searchprofile_by_key(searchprofile_id)

        if search_info_objs is not None:
            return search_info_objs, 200
        else:
            return "", 500


"""Handling im main, für den getChats() in der DaitingSiteAPI.
Dies übergibt ein Objekt mit allen ProfileIDs, mit den ein User geschieben hat. """


@datingapp.route('/ChatProfileBoxList/<id>/')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt.")
@datingapp.param('id','profileBO')
class ChatListOperations(Resource):

    #@datingapp.marshal_with(chatList)
    #@secured
    def get(self, id):

        adm = Administration()
        x = adm.get_profile_by_message(id)

        # Holt sich das result (return) von der get_profile_by_message(id), dies ist dann eine Liste mit Chatpartnern.
        if x is not None:
            return x, 200
        else:
            return "", 500



@datingapp.route('/ChatWindow')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt.")
class ChatWindowOperations(Resource):
    @datingapp.doc("Create new message")
    @datingapp.marshal_with(message, code=200)
    @datingapp.expect(message)
    # @secured

    def post(self):
        adm = Administration()
        proposal = Message.from_dict(api.payload)

        if proposal is not None:
            sender = proposal.get_sender()
            recipient = proposal.get_recipient()
            content = proposal.get_content()
            result = adm.addMessage(sender, recipient, content)
            return result, 200
        else:
            return '', 500

@datingapp.route('/ChatWindow/<string:sender_id>/<string:recipient_id>')
@datingapp.response(500, 'Serverseitiger Fehler')
@datingapp.param('id', 'Die ID des Message-Objekts.')
class MessageOperations(Resource):
    @datingapp.marshal_with(message)
    # @secured
    def get(self, sender_id, recipient_id):
        """ Auslesen eines Chat-Verlaufs."""
        adm = Administration()
        messages = adm.get_message_by_chat(sender_id, recipient_id)

        if messages is not None:
            print('get Chat', messages)
            return messages
        else:
            return '', 500 # Wenn es keine Messages gibt.


@datingapp.route('/infoobjects')
@datingapp.response(500, 'Serverseitiger Fehler')
class InfoObjectListOperations(Resource):
    @datingapp.marshal_with(infoobject, code=200)
    @datingapp.expect(infoobject)
    @secured
    def post(self):
        """ Anlegen eines neuen InfoObject-Objekts. """
        adm = Administration()
        print('Post-Method Infoobject:', api.payload)

        proposal = InfoObject.from_dict(api.payload)

        if proposal is not None:
            infoobj = adm.create_info_object(
                proposal.get_profile_fk(),
                proposal.to_dict()
            )

            return infoobj, 200
        else:
            return 'InfoObjectOperations "POST" fehlgeschlagen', 500


@datingapp.route('/infoobjects/<string:profile_id>')
@datingapp.response(500, 'Serverseitiger-Fehler')
@datingapp.param('google_fk', 'Die Google-ID des Profil-Objekts')
class InfoObjectsOperations(Resource):
    @datingapp.marshal_with(infoobject)
    @secured
    def get(self, profile_id):
        """ Auslesen eines bestimmten InfoObjekt-Objekts anhand der GoogleID. """
        adm = Administration()
        info_objs = adm.get_info_object(profile_id)

        print('get-method Infoobjects:', info_objs)
        print(type(info_objs))
        return info_objs

    @datingapp.marshal_with(infoobject)
    @secured
    def put(self, googleID):
        adm = Administration()
        proposal = InfoObject.from_dict(api.payload)

        if proposal is not None:
            info_obj_id = proposal.get_id()
            new_value = proposal.get_value()

            # InfoObject in der Datenbank suchen
            info_obj = adm.get_info_object_by_id(info_obj_id, googleID)

            if info_obj is not None:
                # Überprüfen, welche Felder aktualisiert werden sollen und die entsprechenden Setter aufrufen
                if new_value != "":
                    info_obj.set_value(new_value)
                if proposal.get_age() != "":
                    info_obj.set_age(proposal.get_age())
                if proposal.get_first_name() != "":
                    info_obj.set_first_name(proposal.get_first_name())
                if proposal.get_gender() != "":
                    info_obj.set_gender(proposal.get_gender())
                if proposal.get_hair() != "":
                    info_obj.set_hair(proposal.get_hair())
                if proposal.get_height() != "":
                    info_obj.set_height(proposal.get_height())
                if proposal.get_last_name() != "":
                    info_obj.set_last_name(proposal.get_last_name())
                if proposal.get_religion() != "":
                    info_obj.set_religion(proposal.get_religion())
                if proposal.get_smoking_status() != "":
                    info_obj.set_smoking_status(proposal.get_smoking_status())

                # InfoObject in der Datenbank aktualisieren
                affected_rows = adm.update_info_object(info_obj)

                if affected_rows > 0:
                    return info_obj, 200
                else:
                    return 'InfoObject konnte nicht aktualisiert werden', 500
            else:
                return 'InfoObject nicht gefunden', 404
        else:
            return 'Ungültiges InfoObject', 400


"""Ab hier FavoriteNote"""


@datingapp.route('/Favoritenote')
@datingapp.response(500, 'Serverseitiger Fehler')
class FavoritenoteListOperations(Resource):
    @datingapp.doc('Create new FavoriteNote')
    # @datingapp.marshal_with(favoritenote, code=200)
    @datingapp.expect(favoritenote)
    # @secured
    def post(self):
        """Erstellen einer neuen FavoriteNote"""

        adm = Administration()
        proposal = FavoriteNote.from_dict(api.payload)


        if proposal is not None:

            adding_id = proposal.get_adding_id()
            added_id = proposal.get_added_id()
            result = adm.create_favoritenote(adding_id, added_id)
            return result, 200
        else:
            """Falls was schiefgeht, passiert nichts und Fehlerausgabe"""
            return '', 500


@datingapp.route('/FavoritenoteProfiles/<profile_id>/<other_profile_id>')
@datingapp.response(500, 'Serverseitiger Fehler')
class FavoritenoteDeleteOperations(Resource):
    @secured
    def delete(self, profile_id, other_profile_id):
        """Löschen eines FavoriteNote-Objekts.
        Das Objekt wird durch die ID's in der URL bestimmt"""

        adm = Administration()
        #print("profile_id im main: ", profile_id)
        #print("other_profile_id im main:  ", other_profile_id)

        if profile_id and other_profile_id is not None:
            adm.delete_favoritenote(profile_id, other_profile_id)
            return '', 200
        else:
            return '', 500


@datingapp.route('/FavoritenoteProfiles/<profile_id>')
@datingapp.response(500, 'Serverseitiger Fehler')
@datingapp.param('profile_id', 'Die ID des FavoriteNote-Objekts')
class FavoriteNoteOperations(Resource):
    @secured
    def get(self, profile_id):
        """Auslesen eines FavoriteNote-Objekts.
        Das Objekt wird durch die id in dem URL bestimmt"""

        adm = Administration()
        fnotes = adm.get_favoritenote_by_adding_user(profile_id)

        if fnotes is not None:
            print(fnotes)
            return fnotes
        else:
            return '', 500


    @datingapp.marshal_with(favoritenote)
    @secured
    def put(self, id):
        "Update eines bestimmten FavoriteNote-Objektes"

        adm = Administration()
        fnote = FavoriteNote.from_dict(api.payload)

        if fnote is not None:

            """Hierdurch wird die id des zu überschreibenden FavoriteNote-Objekts gesetzt"""
            fnote.set_id(id)
            adm.save_favoritenote(fnote)
            return '', 200
        else:
            return '', 500


"""Ab hier BlockNote"""


@datingapp.route('/Blocknote')
@datingapp.response(500, 'Serverseitiger Fehler')
class BlocknoteListOperations(Resource):
    @datingapp.doc('Create new BlockNote')
    # @datingapp.marshal_with(blocknote, code=201)
    @datingapp.expect(blocknote)
    # @secured
    def post(self):
        """Erstellen einer neuen BlockNote"""

        adm = Administration()
        proposal = BlockNote.from_dict(api.payload)

        if proposal is not None:

            blocking_id = proposal.get_blocking_id()
            blocked_id = proposal.get_blocked_id()
            result = adm.create_blocknote(blocking_id, blocked_id)
            return result, 200
        else:
            """Falls was schiefgeht, passiert nichts und Fehlerausgabe"""
            return '', 500


@datingapp.route('/BlocknoteProfiles/<profile_id>')
@datingapp.response(500, 'Serverseitiger Fehler')
@datingapp.param('profile_id', 'Die ID des BlockNote-Objekts')
class BlockNoteOperations(Resource):
    #@secured
    def get(self, profile_id):
        """Auslesen eines BlockNote-Objekts.
        Das Objekt wird durch die id in dem URI bestimmt"""

        adm = Administration()
        bnotes = adm.get_blocknote_by_blocking_user(profile_id)
        print(bnotes)

        if bnotes is not None:
            return bnotes
        else:
            return '', 500


    @datingapp.marshal_with(blocknote)
    @secured
    def put(self, id):
        "Update eines bestimmten BlockNote-Objektes"

        adm = Administration()
        bnote = BlockNote.from_dict(api.payload)

        if bnote is not None:

            """Hierdurch wird die id des zu überschreibenden FavoriteNote-Objekts gesetzt"""
            bnote.set_id(id)
            adm.save_favoritenote(bnote)
            return '', 200
        else:
            return '', 500

@datingapp.route('/BlocknoteProfiles/<profile_id>/<other_profile_id>')
@datingapp.response(500, 'Serverseitiger Fehler beim Löschen der Blocknote')
class BlocknoteDeleteOperations(Resource):
    #@secured
    def delete(self, profile_id, other_profile_id):
        """Löschen eines BlockNote-Objekts in der Datenbank.
        Das Objekt wird durch die ID's in der URL bestimmt"""
        print("Test vor adm = Administration()")
        adm = Administration()
        print("profile_id im main (BlocknoteDeleteOperations): ", profile_id)
        print("other_profile_id im main (BlocknoteDeleteOperations):  ", other_profile_id)

        if other_profile_id and profile_id is not None:
            adm.delete_blocknote(profile_id, other_profile_id)
            return '', 200
        else:
            return '', 500


@datingapp.route('/Suche/Suchprofil')
@datingapp.response(500, 'Serverseitiger Fehler')
class SearchprofileListOperations(Resource):
    @datingapp.doc('Create new Searchprofile')
    @datingapp.marshal_list_with(searchprofile)
    @secured
    def get(self):
        """ Auslesen aller Suchprofil-Objekte. """
        adm = Administration()
        searchprofiles = adm.get_all_searchprofile()
        return searchprofiles



if __name__ == '__main__':
    app.run(debug=True, port=8000)