from flask import Flask
from flask_restx import Api, Resource, fields
#CORS ermöglicht es einem Client, Ressourcen von einem Server anzufordern, dessen Ursprung sich von dem des Clients unterscheidet.
from flask_cors import CORS, cross_origin


from server.Administration import Administration
from server.bo.Account import Account
from server.bo.Profile import Profile
from server.bo.favoriteNote import FavoriteNote
from server.bo.blockNote import BlockNote
from server.bo.Message import Message
from server.bo.Characteristic import Characteristics
from server.bo.InfoObject import InfoObject
from server.bo.BusinessObject import BusinessObject

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
    'favoriteNote_id': fields.Integer(attribute='_favoriteNote_id', description='Merkliste eines Profils'),
    'account_id': fields.Integer(attribute='_account_id', description='Account eines Profils'),
    'blockNote_id': fields.Integer(attribute='_blockNote_id', description='Blockierliste eines Profils'),
    'google_fk': fields.String(attribute='_google_id', description='Google_ID des Admin-Kontos')
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
    'firstName': fields.String(attribute='_firstName', description='Vorname des Profilinhabers'),
    'lastName': fields.String(attribute='_lastName', description='Nachname des Profilinhabers'),
    'age': fields.DateTime(attribute='_age', description='Geburtsdatum des Profilinhabers'),
    'gender': fields.String(attribute='_gender', description='Geschlecht'),
    'height': fields.Integer(attribute='_height', description='Größe'),
    'religion': fields.String(attribute='_religion', description='Religion'),
    'hair': fields.String(attribute='_hair', description='Haarfarbe'),
    'smoking': fields.String(attribute='_smoking', description='Raucher oder Nichtraucher')

})

chat = api.inherit('Chat', bo, {
    'message_id': fields.Integer(attribute='_message_id', description='Unique Id einer Nachricht'),
    'profile_id': fields.Integer(attribute='_profile_id', description='Unique Id eines Profils')
})

favoritenote = api.inherit('FavoriteNote', bo, {
    'added_id': fields.Integer(attribute='_added_id', description='Id des hinzugefügten Profils'),
    'adding_id': fields.Integer(attribute='_adding_id', description='Id des hinzufügenden Profils')
})

blocknote = api.inherit('BlockNote', bo, {
    'blocked_id': fields.Integer(attribute='_blocked_id', description='Id des geblockten Profils'),
    'blocking_id': fields.Integer(attribute='_blocking_id', description='Id des blockenden Profils')
})

"get- liest alles Projekte aus der DB und gibt diese als JSON ans Frontend weiter"
"post- greift auf ein JSON, welches aus dem Frontend kommt, zu und transformiert dies zu einem Projekt Objekt und"
"schreibt es in die DB"

@datingapp.route('/profiles')
@datingapp.response(500, 'Serverseitiger Fehler')
class ProfileListOperations(Resource):
    @datingapp.doc('Create new Profile')
    @datingapp.marshal_list_with(profile)
    @secured
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
        #print(api.payload)

        if proposal is not None:

            p = adm.create_profile(
                proposal.get_favorite_note_id(),
                proposal.get_block_note_id(),
                proposal.get_google_fk())

            return p, 200
        else:
            # Wenn etwas schief geht, geben wir einen String zurück und werfen einen Server-Fehler
            return ' ProfileOperations "Post" fehlgeschlagen', 500

@datingapp.route('/profiles/<string:googleID>')
@datingapp.response(500, 'Serverseitiger-Fehler')
@datingapp.param('google_fk', 'Die Google-ID des Profil-Objekts')
class ProfileOperations(Resource):
    @datingapp.marshal_with(profile)
    @secured
    def get(self, googleID):
        """ Auslesen eines bestimmten Profil-Objekts. """
        adm = Administration()
        prof = adm.get_profile_by_google_id(googleID)
        return prof

    @secured
    def delete(self, id):
        """ Löschen eines besimmten Profil-Objekts. """
        pass

    # hier muss noch die put methode hin.

@datingapp.route('/messages')
@datingapp.response(500, "Falls es zu einem Serverseitigen Fehler kommt.")
class ChatWindowOperations(Resource):
    @datingapp.doc("Create new message")
    @datingapp.marshal_with(message, code=201)
    @datingapp.expect(message)
    @secured

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
    @secured
    def get(self, sender_id, recipient_id):
        """ Auslesen eines Chat-Verlaufs."""
        adm = Administration()
        messages = adm.get_message_by_chat(sender_id, recipient_id)

        if messages is not None:
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
        print(api.payload)

        proposal = InfoObject.from_dict(api.payload)

        if proposal is not None:
            infoobj = adm.create_info_object(
                proposal.get_profile_fk(),
                proposal.to_dict()
            )

            return infoobj, 200
        else:
            return 'InfoObjectOperations "POST" fehlgeschlagen', 500

@datingapp.route('/infoobjects/<string:googleID>')
@datingapp.response(500, 'Serverseitiger-Fehler')
@datingapp.param('google_fk', 'Die Google-ID des Profil-Objekts')
class InfoObjectsOperations(Resource):
    @datingapp.marshal_with(infoobject)
    @secured
    def get(self, googleID):
        """ Auslesen eines bestimmten InfoObjekt-Objekts anhand der GoogleID. """
        adm = Administration()
        infoobj = adm.get_info_object_by_id(googleID)
        return infoobj


"""Ab hier FavoriteNote"""


@datingapp.route('/FavoriteNote')
@datingapp.response(500, 'Serverseitiger Fehler')
class FavoriteNoteListOperations(Resource):
    @datingapp.doc('Create new FavoriteNote')
    @datingapp.marshal_with(favoritenote, code=201)
    @datingapp.expect(favoritenote)
    @secured
    def post(self):
        """Erstellen einer neuen FavoriteNote"""

        adm = Administration()

        proposal = FavoriteNote.from_dict(api.payload)

        if proposal is not None:

            added_id = proposal.get_added_id()
            adding_id = proposal.get_adding_id()
            result = adm.create_favoritenote(added_id, adding_id)
            return result, 200
        else:
            """Falls was schiefgeht, passiert nicht und Fehlerausgabe"""
            return '', 500


@datingapp.route('/FavoriteNote/<int:id>')
@datingapp.response(500, 'Serverseitiger Fehler')
@datingapp.param('id', 'Die ID des FavoriteNote-Objekts')
class FavoriteNoteOperations(Resource):
    @datingapp.marshal_with(favoritenote)
    @secured
    def get(self, id):
        """Auslesen eines FavoriteNote-Objekts.
        Das Objekt wird durch die id in dem URI bestimmt"""

        adm = Administration()
        fnote = adm.get_favoritenote_by_favoritenote_id(id)

        if fnote is not None:
            return fnote
        else:
            return '', 500

    @secured
    def delete(self, id):
        """Löschen eines FavoriteNote-Objekts.
        Das Objekt wird durch die id in dem URI bestimmt"""

        adm = Administration()
        fnote = adm.get_favoritenote_by_favoritenote_id(id)

        if fnote is not None:
            adm.delete_favoritenote(fnote)
            return '', 200
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


@datingapp.route('/BlockNote')
@datingapp.response(500, 'Serverseitiger Fehler')
class BlockNoteListOperations(Resource):
    @datingapp.doc('Create new BlockNote')
    @datingapp.marshal_with(blocknote, code=201)
    @datingapp.expect(blocknote)
    @secured
    def post(self):
        """Erstellen einer neuen BlockNote"""

        adm = Administration()

        proposal = BlockNote.from_dict(api.payload)

        if proposal is not None:

            blocked_id = proposal.get_blocked_id()
            blocking_id = proposal.get_blocking_id()
            result = adm.create_blocknote(blocked_id, blocking_id)
            return result, 200
        else:
            """Falls was schiefgeht, passiert nicht und Fehlerausgabe"""
            return '', 500


@datingapp.route('/BlockNote/<int:id>')
@datingapp.response(500, 'Serverseitiger Fehler')
@datingapp.param('id', 'Die ID des BlockNote-Objekts')
class BlockNoteOperations(Resource):
    @datingapp.marshal_with(blocknote)
    @secured
    def get(self, id):
        """Auslesen eines FavoriteNote-Objekts.
        Das Objekt wird durch die id in dem URI bestimmt"""

        adm = Administration()
        bnote = adm.get_blocknote_by_blocknote_id(id)

        if bnote is not None:
            return bnote
        else:
            return '', 500

    @secured
    def delete(self, id):
        """Löschen eines BlockNote-Objekts.
        Das Objekt wird durch die id in dem URI bestimmt"""

        adm = Administration()
        bnote = adm.get_blocknote_by_blocknote_id(id)

        if bnote is not None:
            adm.delete_favoritenote(bnote)
            return '', 200
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


if __name__ == '__main__':
    app.run(debug=True, port=8000)