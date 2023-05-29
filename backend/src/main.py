from flask import Flask
from flask_restx import Api, Resource, fields
#CORS ermöglicht es einem Client, Ressourcen von einem Server anzufordern, dessen Ursprung sich von dem des Clients unterscheidet.
from flask_cors import CORS, cross_origin


from server.Administration import Administration
from server.bo.Account import Account
from server.bo.Profile import Profile
from server.bo.favoriteNote import favoriteNote
from server.bo.blockNote import blockNote
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
})

message = api.inherit('Message', bo, {
    'sender_id': fields.Integer(attribute='_sender_id', description='Absender einer Nachricht'),
    'recipient_id': fields.Integer(attribute='_recipient_id', description='Empfänger einer Nachricht'),
    'content': fields.String(attribute='_content', description='Inhalt einer Nachricht')
})

characteristic = api.inherit('Characteristics', bo, {
    'char_id': fields.Integer(attribute='_char_id', description='ID einer Eigenschaft'),
    'char_name': fields.String(attribute='_char_name', description='Eigenschaftsname')
})

infoobject = api.inherit('InfoObject', bo, {
    'charx_id': fields.Integer(attribute='_charx_id', description='Fremdschlüssel der Eigenschafts-ID'),
    'value': fields.Integer(attribute='_value', description='Eingabewerte / Merkmalsausprägung zur Eigenschaft')
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

        if proposal is not None:

            p = adm.create_profile(
                proposal.get_favorite_note_id(),
                proposal.get_account_id(), proposal.get_block_note_id())

            return p, 200
        else:
            # Wenn etwas schief geht, geben wir einen String zurück und werfen einen Server-Fehler
            return ' ProfileOperations "Post" fehlgeschlagen', 500

@datingapp.route('/profiles/<int:id>')
@datingapp.response(500, 'Serverseitiger-Fehler')
@datingapp.param('id', 'Die ID des Profil-Objekts')
class ProfileOperations(Resource):
    @datingapp.marshal_with(profile)
    @secured
    def get(self, id):
        """ Auslesen eines bestimmten Profil-Objekts. """
        pass

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

@datingapp.route('/messages/<int:id>')
@datingapp.response(500, 'Serverseitiger Fehler')
@datingapp.param('id','Die ID des Message-Objekts.')
class MessageOperations(Resource):
    @datingapp.marshal_with(message)
    @secured
    def get(self, id):
        """ Auslesen eines bestimmten Chat-Objekts."""
        adm = Administration()
        msg = adm.get_messages(id)

        if msg is not None:
            return msg
        else:
            return '', 500 # Wenn es keine Message unter ID gibt.



if __name__ == '__main__':
    app.run(debug=True, port=8000)