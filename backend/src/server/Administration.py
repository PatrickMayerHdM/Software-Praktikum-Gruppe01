from server.bo.Message import Message
from server.db.MessageMapper import MessageMapper
from blockNote import blockNote
from server.db.blockNoteMapper import BlockNoteMapper
from favoriteNote import favoriteNote
from server.db.FavoriteNoteMapper import FavoriteNoteMapper
from Account import Account
from server.db.AccountMapper import AccountMapper
from server.db.profileMapper import ProfileMapper
from server.db.CharMapper import CharMapper
from server.db.InfoObjectMapper import InfoObjectMapper
from Profile import Profile
from InfoObject import InfoObject
from Characteristic import Characteristics
class Administration(object):
    def __init__(self):
        pass

    """ Account-spezifische Methoden """

    def create_account(self, google_id, profile_id, name, email):
        account = Account()
        account.set_google_id(google_id)
        account.set_profile_id(profile_id)
        account.set_user_name(name)
        account.set_email(email)
        account.set_id(1)

        with AccountMapper() as mapper:
            return mapper.insert(account)

    def get_account_by_name(self, name):
        with AccountMapper() as mapper:
            return mapper.find_by_name(name)

    def get_account_by_id(self, number):
        with AccountMapper() as mapper:
            return mapper.find_by_key(number)

    def get_account_by_email(self, email):
        with AccountMapper() as mapper:
            return mapper.find_by_email(email)

    def get_account_by_google_id(self, id):
        with AccountMapper() as mapper:
            return mapper.find_by_google_id(id)

    def get_all_accounts(self):
        with AccountMapper() as mapper:
            return mapper.find_all()

    def save_account(self, account):
        with AccountMapper() as mapper:
            mapper.update(account)

    def delete_account(self, account):
        with AccountMapper() as mapper:
            mapper.delete(account)

    """Spezifische Methoden für message"""

    def addMessage(self, sender, recipient, content):
        """Objekt der Klasse Massage wird erstellt"""
        m = Message()
        m.set_id(1)
        m.set_sender(sender)
        m.set_recipient(recipient)
        m.set_content(content)

        """Objekt wird mit insert-methode in DB eingebunden"""
        with MessageMapper() as mapper:
            return mapper.insert(m)

    def save_message(self, msg):
        with MessageMapper() as mapper:
            mapper.update(msg)

    def delete_message(self, message):
        """Hier wird "message" mit mapper aus DB gelöscht"""
        with MessageMapper() as mapper:
            mapper.delete(message)

    def get_all_messages(self):
        """Alle messages auslesen"""
        with MessageMapper() as mapper:
            return mapper.find_all()

    def get_message_by_sender_id(self, senderid):
        """messages anhand sender auslesen"""
        with MessageMapper() as mapper:
            return mapper.find_by_sender_id(senderid)

    def get_message_by_recipient_id(self, recipientid):
        """messages anhand recipient auslesen"""
        with MessageMapper() as mapper:
            return mapper.find_by_recipient(recipientid)

    def get_message_by_id(self, key):
        with MessageMapper() as mapper:
            return mapper.find_by_key(key)

    """Spezifische Methoden für blockNote"""

    def create_blocknote(self, profile_id):
        blocklist = blockNote()
        blocklist.add_user(profile_id)
        blocklist.set_id(1)

        with BlockNoteMapper() as mapper:
            return mapper.insert(blocklist)

    def save_blocklist(self, blocklist):
        with BlockNoteMapper() as mapper:
            mapper.update(blocklist)

    def delete_blocklist(self, blocklist):
        with BlockNoteMapper() as mapper:
            mapper.delete(blocklist)

    def get_all_blocklists(self):
        with BlockNoteMapper() as mapper:
            return mapper.find_all()

    def get_blocklist_by_id(self, key):
        with BlockNoteMapper() as mapper:
            return mapper.find_by_key(key)

    def get_blocklist_by_user(self, user_id):
        with BlockNoteMapper() as mapper:
            return mapper.find_by_user(user_id)

    """Spezifische Methoden für blockNote"""

    def create_favoritenote(self, profile_id):
        favoritenote = favoriteNote()
        favoritenote.add_user(profile_id)
        favoritenote.set_id(1)

        with FavoriteNoteMapper() as mapper:
            mapper.insert(favoritenote)

    def save_favoritenote(self, favoritenote):
        with FavoriteNoteMapper() as mapper:
            mapper.update(favoritenote)

    def delete_favoritenote(self, favoritenote):
        with FavoriteNoteMapper() as mapper:
            mapper.delete(favoritenote)

    def get_all_favoritenotes(self):
        with FavoriteNoteMapper() as mapper:
            return mapper.find_all()

    def get_favoritenote_by_id(self, key):
        with FavoriteNoteMapper() as mapper:
            return mapper.find_by_key(key)

    def get_favoritenote_by_user(self, user_id):
        with FavoriteNoteMapper() as mapper:
            return mapper.find_by_user(user_id)

   # Hier wird die Logik für das Profil auf Basis der Mapper realisiert
    def create_profile(self, favouriteNote_id, blockNote_id, profile):
        prof = Profile()
        prof.set_favorite_note_id(favouriteNote_id)
        prof.set_block_note_id(blockNote_id)
        #.set_account_id(account_id)
        prof.set_id(1)
        with ProfileMapper() as mapper:
            return mapper.insert(prof)

    def save_profile(self, profile):
        with ProfileMapper() as mapper:
            mapper.update(profile)

    def delete_profile(self, profile):
        with ProfileMapper() as mapper:
            mapper.update(profile)

    def get_all_profiles(self, profile):
        with ProfileMapper() as mapper:
            return mapper.find_all()

    def get_profile_by_id(self, key):
        with ProfileMapper() as mapper:
            return mapper.find_by_key(key)

    # def get_profile_by_account_id(self, account_id):
    #     with ProfileMapper() as mapper:
    #         return mapper.find_by_account_id(account_id)

    # Hier wird die Logik für das Characteristic auf Basis der Mapper realisiert

    def get_all_char(self):
        with CharMapper() as mapper:
            return mapper.find_all()

    def get_char_by_id(self, key):
        with CharMapper() as mapper:
            return mapper.find_by_key(key)

    # Hier wird die Logik für das InfoObjekt auf Basis der Mapper realisiert

    def get_all_info_objects(self):
        with InfoObjectMapper() as mapper:
            return mapper.find_all()

    def get_info_object_by_id(self, key):
        with InfoObjectMapper() as mapper:
            return mapper.find_by_key(key)

    def create_info_object(self, infoobject):
        with InfoObjectMapper() as mapper:
            return mapper.insert(infoobject)

    def update_info_object(self, infoobject):
        with InfoObjectMapper() as mapper:
            return mapper.update(infoobject)

    def delete_info_object(self, infoobject):
        with InfoObjectMapper() as mapper:
            return mapper.delete(infoobject)

    # Logik für Profil, did die Info-Objekte in

