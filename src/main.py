import time

from flask import Flask, request, redirect, url_for
from flask_restx import Api, Resource, fields
#CORS ermöglicht es einem Client, Ressourcen von einem Server anzufordern, dessen Ursprung sich von dem des Clients unterscheidet.
from flask_cors import CORS, cross_origin

from server.Administration import Administration
from server.bo.Profile import Profile
from server.bo.favoriteNote import FavoriteNote
from server.bo.blockNote import BlockNote
from server.bo.Message import Message
from server.bo.InfoObject import InfoObject
from server.bo.SearchProfile import SearchProfile
from server.bo.namedInfoObject import NamedInfoObject
from server.bo.Profilevisits import Profilevisits

#SecurityDecorator übernimmt die Authentifikation
from SecurityDecorator import secured

#Flask wird instanziert
app = Flask(__name__, static_folder="build", static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


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
    'char_id': fields.Integer(attribute='_char_id', description='Eigenschafts ID '),
    'char_name': fields.String(attribute='_char_name', description='Eigenschaftsname')
})

infoobject = api.inherit('InfoObject', bo, {
    'char_id': fields.Integer(attribute='char_id', description='ID einer Eigenschaft'),
    'char_value': fields.String(attribute='char_value', description='Inhalt des Infoobjekts'),
    'profile_fk': fields.String(attribute='profile_fk', description='Google ID des Users'),
    'searchprofile_id': fields.Integer(attribute='searchprofile_id', description='Suchprofil eines Users'),
})

namedinfoobject = api.inherit('NamedInfoObjects', bo, {
    'profile_fk': fields.String(attribute='profile_fk', description=' Google ID des Users'),
    'searchprofile_id': fields.Integer(attribute='searchprofile_id', description=' Suchprofil ID eines Users'),
    'char_id': fields.String(attribute='char_id', description='Char ID '),
    'char_name': fields.Integer(attribute='named_char_name', description=' Char_Name eines Users'),
    'char_desc': fields.Integer(attribute='named_char_desc', description=' Char Desc eines Users')
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
    'google_id': fields.String(attribute='google_id', description='Google_ID eines SuchProfils')
})

profilevisits = api.inherit('Profilevisits', bo, {
    'mainprofile_id': fields.String(attribute='mainprofile_id', description='Das Profil der Person, welche jemanden besucht'),
    'visitedprofile_id': fields.String(attribute='visitedprofile_id', description='Das Profil der besuchten Person'),
})

matchmaking = api.inherit('Matchmaking', bo, {
    'google_fk': fields.String(attribute='google_id', description='GoogleID eines Matches'),
    'percentage': fields.Integer(attribute='percentage', description='Ganzzahl des Matchmakings'),
    'searchprofile_id': fields.Integer(attribute='searchprofile_id', description='Suchprofil ID eines Users')
})


"get- liest alles Projekte aus der DB und gibt diese als JSON ans Frontend weiter"
"post- greift auf ein JSON, welches aus dem Frontend kommt, zu und transformiert dies zu einem Projekt Objekt und"
"schreibt es in die DB"


@datingapp.route('/profiles')
@datingapp.response(500, 'Serverseitiger Fehler')
class ProfileListOperations(Resource):
    @datingapp.doc('Create new Profile')
    @secured
    def get(self):
        """ Auslesen aller Profil-Objekte. """
        adm = Administration()
        profiles = adm.get_all_profiles() #Admin.py noch nicht angelegt
        print(profiles)

        if profiles is not None:
            return profiles, 200
        else:
            return "", 500

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

            print("Main Proifle: ", p)
            return p, 200
        else:
            # Wenn etwas schief geht, geben wir einen String zurück und werfen einen Server-Fehler
            return ' ProfileOperations "Post" fehlgeschlagen', 500

@datingapp.route('/profiles/<string:google_fk>')
@datingapp.response(500, 'Serverseitiger-Fehler')
@datingapp.param('id', 'Die Google-ID des Profil-Objekts')
class ProfileOperations(Resource):
    @datingapp.marshal_with(profile) #Datenstruktur des Objektes der Get-Methode
    @secured
    def get(self, google_fk):
        """ Auslesen eines bestimmten Profil-Objekts. """
        adm = Administration()
        prof = adm.get_profile_by_google_id(google_fk)
        #print('get-Methode in Profile:', prof)
        #print(type(prof))
        return prof

    @secured
    def delete(self, google_fk):
        print('Hier :', google_fk)
        """ Löschen eines besimmten Profil-Objekts. """

        adm = Administration()
        print("Google ID Main: ", google_fk)

        # Auslesen aller Suchprofile einer Google-Id
        sps = adm.get_searchprofiles_by_google_id(google_fk)

        for sp in sps:
            # Löschen der InfoObjekte der Suchprofile
            adm.delete_info_object_search(sp)
            # Löschen der Suchprofile
            adm.delete_searchprofile(sp)

        # Auslesen der InfoObjekte einer Google-Id
        info_obj = adm.get_info_object_by_id(google_fk)
        # Löschen der InfoObjekte
        adm.delete_info_object(info_obj)
        # Löschen der Nachrichten
        adm.delete_message(google_fk)
        # Auslesen des Profils
        prof = adm.get_profile_by_google_id(google_fk)
        # Löschen des Profils
        adm.delete_profile(prof)
        return '', 200

"""SuchProfil"""
@datingapp.route('/SearchProfiles')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt")
@datingapp.param('id','searchprofile')
class SearchProfileOpterations(Resource):

    @datingapp.marshal_list_with(searchprofile)
    @secured
    def get(self):
        """Auslesen aller Searchprofile-Objekte"""
        adm = Administration()
        SearchProfiles = adm.get_all_searchprofile()
        return SearchProfiles

    #@datingapp.marshal_with(SearchProfile, code=200)
    @datingapp.expect(searchprofile)
    @secured
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
    @secured
    def post(self):
        """ Anlegen eines neuen InfoObject-Objekts. """
        adm = Administration()
        time.sleep(3)
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

@datingapp.route('/SearchProfiles/infoobjects/<searchprofile_id>')
@datingapp.response(500, 'Serverseitiger Fehler')
class SearchInfoObjectUpdateOperations(Resource):
    @datingapp.marshal_with(infoobject)
    @datingapp.expect(infoobject, validate=True) # Wir akzeptieren das Objekt, auch wenn es von der infoobject Struktur abweicht.
    @secured
    def put(self, searchprofile_id):
        print("Main.py: PUT-Befehl: ", searchprofile_id)
        print("API.payload SUCHPROFIL", api.payload)

        """ Update eines bestimmten Such-Profils. """
        adm = Administration()
        proposal = InfoObject.from_dict(api.payload)

        if proposal is not None:
            infoobj = adm.update_search_info_object(
                proposal.get_searchprofile_id(),
                proposal.to_dict()
            )

            return infoobj, 200
        else:
            return 'Suchprofil konnte nicht aktualisiert werden.', 500


"""Handling um alle Suchprofil ID's eines Profils zu bekommen"""
@datingapp.route('/Search/SearchProfiles/<profile_id>/')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt.")
@datingapp.param('profile_id','GoogleID für welche die Suchprofile gesucht werden')
class SearchProfilesOperations(Resource):

    # @secured
    def get(self, profile_id):

        adm = Administration()
        SearchP = adm.get_searchprofiles_by_google_id(profile_id)

        if SearchP is not None:
            return SearchP, 200
        else:
            return "", 500

"""Handling, um ein spezifisches Suchprofil eines Profils zu bekommen"""
@datingapp.route('/Search/SearchProfiles/<int:searchprofile_id>')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt.")
@datingapp.param('searchprofile_id', 'Die Searchprofile-ID des Searchprofile-Objekts')
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

    @secured
    def delete(self, searchprofile_id):
        """ Löschen eines besimmten Suchprofil-Objekts. """

        adm = Administration()
        info_obj = adm.get_info_object_by_searchid(searchprofile_id)
        adm.delete_info_object_search(info_obj)
        adm.delete_searchprofile(searchprofile_id)
        return '', 200


"""Handling im main, für den getChats() in der DaitingSiteAPI.
Dies übergibt ein Objekt mit allen ProfileIDs, mit den ein User geschieben hat. """

@datingapp.route('/ChatProfileBoxList/<id>/')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt.")
@datingapp.param('id','id des Profils')
class ChatListOperations(Resource):

    #@secured
    def get(self, id):
        # ermöglicht es, die Administration() mit der kürzeren Schreibweise adm abzurufen.
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
    @secured

    def post(self):
        """ Absenden einer neuen Nachricht im Chat."""
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
    @secured
    def get(self, sender_id, recipient_id):
        """ Auslesen aller Nachrichten eines Chat-Verlaufs über sender_id und recipient_id."""
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
        time.sleep(3)

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
@datingapp.param('id', 'Die Google-ID des Profil-Objekts')
class InfoObjectsOperations(Resource):
    @datingapp.marshal_with(infoobject)
    @secured
    def get(self, profile_id):
        """ Auslesen eines bestimmten InfoObjekt-Objekts anhand der GoogleID. """
        adm = Administration()
        info_objs = adm.get_info_object(profile_id)
        """ 
        adjusted_infoobjs ruft die Methode "calculate_age" auf und liefert ein InfoObject-Objekt zurück.
        Das InfoObjekt besitzt nun das Alter (z.B. 33) und nicht mehr das Geburtsdatum (TT/MM/YYYY...) 
        """
        adjusted_infoobjs = adm.calculate_age(info_objs)
        #print('adjusted_infoobjs:', adjusted_infoobjs)
        #print('adjusted_infoobjs:', adjusted_infoobjs.get_value())
        info_objs.append(adjusted_infoobjs)
        #print('get-method Infoobjects:', info_objs)
        #print(type(info_objs))
        #print('adjusted_infoobs:', adjusted_infoobjs)

        return info_objs

    @datingapp.marshal_with(infoobject)
    @datingapp.expect(infoobject, validate=True) # Wir akzeptieren das Objekt, auch wenn es von der infoobject Struktur abweicht.
    @secured
    def put(self, profile_id):
        print('Main.py: PUT Befehl: ', profile_id)
        print('Main.py: Api Payload:', api.payload)
        """ Update eines bestimmten User-Profils. """
        adm = Administration()
        proposal = InfoObject.from_dict(api.payload)

        if proposal is not None:
            infoobj = adm.update_info_object(
                proposal.get_profile_fk(),
                proposal.to_dict()
            )


            return infoobj, 200
        else:
            return 'Profil konnte nicht aktualisiert werden.', 500

@datingapp.route('/infoobjects/<string:char_value>')
@datingapp.response(500, 'Serverseitiger-Fehler')
@datingapp.param('char_value', 'Der Wert des Info-Objekts')
class NamedInfoObjectsOperations(Resource):
    @secured
    def delete(self, char_value):
        adm = Administration()
        adm.delete_info_object_by_char_value(char_value)
        return '', 200


"""Ab hier FavoriteNote"""

@datingapp.route('/Favoritenote')
@datingapp.response(500, 'Serverseitiger Fehler')
class FavoritenoteListOperations(Resource):
    @datingapp.doc('Create new FavoriteNote')
    # @datingapp.marshal_with(favoritenote, code=200)
    @datingapp.expect(favoritenote)
    @secured
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
        Das Objekt wird durch die ID in der URL bestimmt."""

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
        Das Objekt wird durch die ID in der URL bestimmt."""

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
    @secured
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
    @secured
    def get(self, profile_id):
        """Auslesen eines BlockNote-Objekts.
        Das Objekt wird durch die ID in der URL bestimmt."""

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
    @secured
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

    """ Ab hier Suchprofil """


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

@datingapp.route('/namedinfoobjects')
@datingapp.response(500, 'Serverseitiger Fehler')
class NamedInfoObjectListOperations(Resource):
    @datingapp.marshal_with(namedinfoobject, code=200)
    @datingapp.expect(namedinfoobject)
    @secured
    def post(self):
        """ Anlegen eines neuen NamedInfoObject-Objekts. """
        adm = Administration()
        print('Post-Method Infoobject:', api.payload)

        proposal = NamedInfoObject.from_dict(api.payload)

        if proposal is not None:
            charobj = adm.create_char(
                proposal.get_named_char_name()
            )

            infoobj = adm.create_named_info_object(
                proposal.get_named_profile_fk(),
                proposal.get_named_info_name(),
                proposal.get_named_char_name()
            )

            respone = {charobj, infoobj}
            print("Post NamednfoBO: ", respone)
            return respone, 200
        else:
            return 'InfoObjectOperations "POST" fehlgeschlagen', 500


@datingapp.route('/Profile/characteristics/<int:char_id>', methods=['GET'])
@datingapp.response(500, 'Serverseitiger Fehler')
class NamedCharacteristicsOperations(Resource):
    #@datingapp.marshal_list_with(characteristic)
    @secured
    def get(self, char_id):
        print("Angekommen in der NamedCharacteristicsOperations", char_id)
        #print('GET-Method Char Name:', api.payload)

        adm = Administration()

        char_names = adm.get_char_by_key(char_id)

        return char_names, 200

"""Ab hier Profilevisits"""

@datingapp.route('/visit')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt.")
class ProfileVisitsOperations(Resource):
    @datingapp.doc("Create new visit")
    @datingapp.expect(profilevisits)
    @secured

    def post(self):
        adm = Administration()
        proposal = Profilevisits.from_dict(api.payload)

        if proposal is not None:
            result = adm.create_profilevisits(proposal)
            return result, 200
        else:
            return '', 500

""" Handling, um das Matchmaking aufzurufen. """

@datingapp.route('/Search/Matchmaking/<int:searchprofile_id>')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt.")
@datingapp.param('id', 'Die Searchprofile-ID des Searchprofile-Objekts')
class MatchingOperations(Resource):

    @secured
    def get(self, searchprofile_id):
        print('Main.Py übergebene Searchprofile_id:', searchprofile_id)

        adm = Administration()
        searchprof = adm.get_char_values_for_searchprofile(searchprofile_id) #Searchprof stellt ein Dictionary mit der ID und den Char-Values dar.
        print('main.py Suchprofil:', searchprof)

        profiles = adm.execute_matchmaking(searchprof) #Ergebnisliste aller Matches [[id1, 80], [id2, 30], ... ]

        print('Main.py profiles bevor es übergeben wird:', profiles)

        if profiles is not None:
            return profiles
        else:
            return 500

@datingapp.route('/Search/Matchmaking/Newprofiles/<string:google_fk>/<int:searchprofile_id>')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt.")
@datingapp.param('id', 'Die Searchprofile-ID des Searchprofile-Objekts')
class MatchingNewProfilesOperations(Resource):

    @secured
    def get(self, google_fk, searchprofile_id):
        #print('Main.Py übergebene Searchprofile_id:', searchprofile_id, "und die übergebene Google_id: ", google_fk)

        adm = Administration()
        searchprof = adm.get_char_values_for_searchprofile(searchprofile_id) #Searchprof stellt ein Dictionary mit der ID und den Char-Values dar.
        #print('main.py Suchprofil:', searchprof)

        profiles = adm.execute_matchmaking(searchprof) #Ergebnisliste aller Matches [[id1, 80], [id2, 30], ... ]

        #print('Main.py profiles bevor es übergeben wird:', profiles)

        if profiles is not None:
            return profiles
        else:
            return 500


if __name__ == '__main__':
    app.run(debug=True, port=8000)