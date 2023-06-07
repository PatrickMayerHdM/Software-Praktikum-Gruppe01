from server.bo.Message import Message
from server.db.MessageMapper import MessageMapper
from server.bo.blockNote import BlockNote
from server.db.blockNoteMapper import BlockNoteMapper
from server.bo.favoriteNote import FavoriteNote
from server.db.FavoriteNoteMapper import FavoriteNoteMapper
from server.bo.Account import Account
from server.db.AccountMapper import AccountMapper
from server.db.profileMapper import ProfileMapper
from server.db.CharMapper import CharMapper
from server.db.InfoObjectMapper import InfoObjectMapper
from server.bo.Profile import Profile
from server.bo.InfoObject import InfoObject
from server.bo.Characteristic import Characteristics
from server.bo.Chat import Chat
from server.db.ChatMapper import ChatMapper


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
    @staticmethod
    def create_blocknote(self, blocked_id, blocking_id):
        blocklist = BlockNote()
        blocklist.set_blocked_id(blocked_id)
        blocklist.set_blocking_id(blocking_id)
        blocklist.set_id(1)

        with BlockNoteMapper() as mapper:
            return mapper.insert(blocklist)

    def save_blocknote(self, blocklist):
        with BlockNoteMapper() as mapper:
            mapper.update(blocklist)

    def delete_blocknote(self, blocklist):
        with BlockNoteMapper() as mapper:
            mapper.delete(blocklist)

    def get_all_blocknote(self):
        with BlockNoteMapper() as mapper:
            return mapper.find_all()

    def get_blocknote_by_blocknote_id(self, key):
        with BlockNoteMapper() as mapper:
            return mapper.find_by_key(key)

    def get_blocklist_by_blocking_user(self, blocking_id):
        with BlockNoteMapper() as mapper:
            return mapper.find_by_blocking_user(blocking_id)

    """Spezifische Methoden für favoritenote"""

    def create_favoritenote(self, added_id, adding_id):
        favoritenote = FavoriteNote()
        favoritenote.set_added_id(added_id)
        favoritenote.set_adding_id(adding_id)
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

    def get_favoritenote_by_favoritenote_id(self, key):
        with FavoriteNoteMapper() as mapper:
            return mapper.find_by_key(key)

    def get_favoritenote_by_adding_user(self, adding_id):
        with FavoriteNoteMapper() as mapper:
            return mapper.find_by_adding_user(adding_id)

    # Hier wird die Logik für das Profil auf Basis der Mapper realisiert
    @staticmethod
    def create_profile(self, favoritenote_id, blocknote_id):
        prof = Profile()
        prof.set_favorite_note_id(favoritenote_id)
        prof.set_block_note_id(blocknote_id)
        prof.set_id(1)
        with ProfileMapper() as mapper:
            mapper.insert(prof)

    def save_profile(self, profile):
        with ProfileMapper() as mapper:
            mapper.update(profile)

    def delete_profile(self, profile):
        with ProfileMapper() as mapper:
            mapper.delete(profile)

    @staticmethod
    def get_all_profiles(self):
        with ProfileMapper() as mapper:
            return mapper.find_all()

    def get_profile_by_id(self, key):
        with ProfileMapper() as mapper:
            return mapper.find_by_key(key)

    def get_all_profiles_by_blocknote_id(self):
        pass

    # def get_profile_by_account_id(self, account_id):
    #     with ProfileMapper() as mapper:
    #         return mapper.find_by_account_id(account_id)

    # Hier wird die Logik für das Characteristic auf Basis der Mapper realisiert

    def get_all_char(self):
        with CharMapper() as mapper:
            return mapper.find_all()

    def get_char_by_key(self, key):
        with CharMapper() as mapper:
            return mapper.find_by_key(key)

    def create_char(self, char_name, char_typ):
        c = Characteristics()
        c.set_characteristic(char_name)
        c.set_characteristic_typ(char_typ)
        c.set_id(1)
        with CharMapper() as mapper:
            return mapper.insert(c)

    def save_char(self, char):
        with CharMapper() as mapper:
            mapper.update(char)

    def delete_char(self, char):
        with CharMapper() as mapper:
            mapper.delete(char)

    # Hier wird die Logik für das InfoObjekt auf Basis der Mapper realisiert

    def get_all_info_objects(self):
        with InfoObjectMapper() as mapper:
            return mapper.find_all()

    def get_info_object_by_id(self, key):
        with InfoObjectMapper() as mapper:
            return mapper.find_by_key(key)

    def create_info_object(self, profile_fk, info_dict):
        print("InfoDict: ", info_dict)
        with InfoObjectMapper() as mapper:
            with CharMapper() as char_mapper:
                for key, value in info_dict.items():
                    info_obj = InfoObject()
                    info_obj.set_profile_fk(profile_fk)
                    info_obj.set_value(value)
                    # Hier wird der CharMapper aufgerufen!
                    char_fk = char_mapper.find_by_key(key).get_id()
                    if char_fk is not None:
                        info_obj.set_char_fk(char_fk)
                        mapper.insert(info_obj)
                    else:
                        print(f'Ungültiger Key: {key}')

    def update_info_object(self, infoobject):
        with InfoObjectMapper() as mapper:
            return mapper.update(infoobject)

    def delete_info_object(self, infoobject):
        with InfoObjectMapper() as mapper:
            return mapper.delete(infoobject)

    # Logik für Profil, did die Info-Objekte in

    "Spezifische Methoden für das Suchprofil"
    def create_searchprofile(self):
        suchprof = Profile()
        suchprof.set_id(1)
        with ProfileMapper() as mapper:
            mapper.insert(suchprof)

    def save_searchprofile(self, searchprofile):
        with ProfileMapper() as mapper:
            mapper.update(searchprofile)

    def delete_searchprofile(self, searchprofile):
        with ProfileMapper() as mapper:
            mapper.delete(searchprofile)

    def get_all_searchprofile(self):
        with ProfileMapper() as mapper:
            return mapper.find_all()

    def get_searchprofile_by_id(self, key):
        with ProfileMapper() as mapper:
            return mapper.find_by_key(key)

    "Chat-spezifische Methoden"
    def create_chat(self, message_id):
        chat = Chat()
        chat.set_id(1)
        chat.set_message_id(message_id)
        with ChatMapper() as mapper:
            mapper.insert(chat)

    def get_all_chats(self):
        with ChatMapper() as mapper:
            return mapper.find_all()

    def get_chat_by_id(self, key):
        with ChatMapper() as mapper:
            return mapper.find_by_key(key)

    def save_chat(self, chat):
        with ChatMapper() as mapper:
            mapper.update(chat)

    def delete_chat(self, chat):
        with ChatMapper() as mapper:
            mapper.delete(chat)


