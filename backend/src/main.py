from flask import Flask
from flask_restx import Api, Resource, fields
#CORS ermöglicht es einem Client, Ressourcen von einem Server anzufordern, dessen Ursprung sich von dem des Clients unterscheidet.
from flask_cors import CORS

from server.Administration import Administration
from server.bo.Account import Account
from server.bo.profileNEU import profileNeu
from server.bo.favoriteNote import favoriteNote
from server.bo.blockNote import blockNote
from server.bo.Message import Message
from server.bo.Characteristic import Characteristic
from server.bo.InfoObject import InfoObject

#SecurityDecorator übernimmt die Authentifikation
#from SecurityDecorator import secured

#Flask wird instanziert
app = Flask(__name__)

# Aufrufe mit /system/* werden ermöglicht.
CORS(app, resources=r'/system/*')
"""
#falls es hiermit probleme geben sollte könnten wir auch folgendes Probieren:

CORS(app, support_credentials=True, 
     resources={r'/system/*': {'origins':'*'}})
"""

#API um Daten zwischen Clients und Server zu tauschen.
api = Api(app, version='1.0', title='DatingApp System API',
          description='System-API der DatingApp')

#Namespace wird angelegt. Dieser fasst alle Operationen unter dem Präfix /dating zusammen
datingapp = api.namespace('dating', description='Funktionen der Datingapp')

#Hier werden für einige Klassen die JSON Strukturen definiert.
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='ID des BO´s')
})

Account = api.inherit('Account', bo, {
    'google_id': fields.String(attribute='_google_id', description='GoogleID eines Accounts'),
    'profile_id': fields.Integer(attribute='_profile_id', description='Profil eines Accounts'),
})

profileNeu = api.inherit('profileNeu', bo, {
    'favoriteNote_id': fields.Integer(attribute='_favoriteNote_id', description='Merkliste eines Profils'),
    'account_id': fields.Integer(attribute='_account_id', description='Account eines Profils'),
    'blockNote_id': fields.Integer(attribute='_blockNote_id', description='Blockierliste eines Profils'),
})

Message = api.inherit('Message', bo, {
    'sender_id': fields.Integer(attribute='_sender_id', description='Absender einer Nachricht'),
    'recipient_id': fields.Integer(attribute='_recipient_id', description='Empfänger einer Nachricht'),
    'timestamp': fields.DateTime(attribute='_timestamp', description='Zeitstempel einer Nachricht'),
    'content': fields.String(attribute='_content', description='Inhalt einer Nachricht')
})
# Hier müssen noch weitere Klassen hinzugefügt werden. DW 09.05.23