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
from server.bo.SearchProfile import SearchProfile
from server.db.SearchProfileMapper import SearchProfileMapper
from datetime import datetime

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

    def delete_message(self, google_id):
        """Hier wird "message" mit mapper aus DB gelöscht"""
        with MessageMapper() as mapper:
            mapper.delete(google_id)

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

    def get_message_by_chat(self, sender_profile, recipient_profile):
        """ messages zwischen zwei Personen auslesen """
        with MessageMapper() as mapper:
            print(mapper.find_by_chat(sender_profile, recipient_profile))
            return mapper.find_by_chat(sender_profile, recipient_profile)

    # @staticmethod
    # def find_by_chat(sender_profile, recipient_profile):
    #     """Auslesen aller Nachrichten zwischen zwei Personen."""
    #     message_mapper = MessageMapper()
    #     messages = message_mapper.find_by_chat(sender_profile, recipient_profile)
    #     return messages

    """Spezifische Methoden für blockNote"""
    def create_blocknote(self, blocking_id, blocked_id):
        blocknote = BlockNote()
        blocknote.set_id(1)
        blocknote.set_blocking_id(blocking_id)
        blocknote.set_blocked_id(blocked_id)

        with BlockNoteMapper() as mapper:
            return mapper.insert(blocknote)

    def save_blocknote(self, blocklist):
        with BlockNoteMapper() as mapper:
            mapper.update(blocklist)

    def delete_blocknote(self, blocking_id, blocked_id):
        with BlockNoteMapper() as mapper:
            mapper.delete(blocking_id, blocked_id)


    def get_all_blocknote(self):
        with BlockNoteMapper() as mapper:
            return mapper.find_all()

    def get_blocknote_by_blocknote_id(self, key):
        with BlockNoteMapper() as mapper:
            return mapper.find_by_key(key)

    def get_blocknote_by_blocking_user(self, blocking_user):

        profiles = []
        with BlockNoteMapper() as mapper:
            block_profiles = mapper.find_by_blocking_user(blocking_user)

            for block_profile in block_profiles:
                blocked_user = block_profile.get_blocked_id()
                profiles.append(blocked_user)

        return profiles

    """Spezifische Methoden für favoritenote"""

    def create_favoritenote(self, adding_id, added_id):
        favoritenote = FavoriteNote()
        favoritenote.set_id(1)
        favoritenote.set_adding_id(adding_id)
        favoritenote.set_added_id(added_id)

        with FavoriteNoteMapper() as mapper:
            mapper.insert(favoritenote)

    def save_favoritenote(self, favoritenote):
        with FavoriteNoteMapper() as mapper:
            mapper.update(favoritenote)

    def delete_favoritenote(self, adding_id, added_id):
        with FavoriteNoteMapper() as mapper:
            mapper.delete(adding_id, added_id)

    def get_all_favoritenotes(self):
        with FavoriteNoteMapper() as mapper:
            return mapper.find_all()

    def get_favoritenote_by_favoritenote_id(self, key):
        with FavoriteNoteMapper() as mapper:
            return mapper.find_by_key(key)

    def get_favoritenote_by_adding_user(self, adding_user):

        profiles = []
        with FavoriteNoteMapper() as mapper:
            fav_profiles = mapper.find_by_adding_user(adding_user)

            for fav_profile in fav_profiles:
                added_user = fav_profile.get_added_id()
                profiles.append(added_user)

        return profiles



    # Hier wird die Logik für das Profil auf Basis der Mapper realisiert
    def create_profile(self, favoritenote_id, blocknote_id, google_fk):
        prof = Profile()
        prof.set_favorite_note_id(favoritenote_id)
        prof.set_block_note_id(blocknote_id)
        prof.set_google_fk(google_fk)
        # prof.set_account_id(account_id)
        prof.set_id(1)
        with ProfileMapper() as mapper:
            mapper.insert(prof)

    def save_profile(self, profile):
        with ProfileMapper() as mapper:
            mapper.update(profile)

    def delete_profile(self, profile):
        with ProfileMapper() as mapper:
            print("Admin: ", profile)
            mapper.delete(profile)

    def get_all_profiles(self):
        profiles = []
        with ProfileMapper() as mapper:
            found_profiles = mapper.find_all()

            for found_profile in found_profiles:
                found_user = found_profile.get_google_fk()
                profiles.append(found_user)

        print(profiles)
        return profiles

    def get_profile_by_google_id(self, key):
        with ProfileMapper() as mapper:
            #print("Admin FinByKey Profil: ", key)
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
            print("Admin Info Findbykey: ", key)
            return mapper.find_by_id(key)

    def get_info_object_by_searchid(self, key):
        with InfoObjectMapper() as mapper:
            print("Admin Info Findbykey: ", key)
            return mapper.find_by_searchid(key)

    def get_info_object(self, key):
        with InfoObjectMapper() as mapper:
            return mapper.find_by_key(key)

    def create_info_object(self, profile_fk, info_dict):
        """
        Erstellt Info Objekte basierend aus einem übergebenen Dictionary.
        :param profile_fk: Die GoogleID eines Users.
        :param info_dict: Ein Dictionary, dass alle Informationen enthält.
        """
        print("InfoDict: ", info_dict)
        with InfoObjectMapper() as mapper:
            with CharMapper() as char_mapper:
                for key, value in info_dict.items():
                    info_obj = InfoObject()
                    info_obj.set_profile_fk(profile_fk) # Setzt den Fremdschlüssel des Profils.
                    info_obj.set_value(value) # Setzt dem Value aus dem Dict-Eintrag.
                    char_fk = char_mapper.find_by_key(key).get_id() # char_fk anhand des keys finden.
                    if char_fk is not None:
                        info_obj.set_char_fk(char_fk)
                        mapper.insert(info_obj)
                    else:
                        print(f'Ungültiger Key: {key}')

    def update_info_object(self, profile_fk, info_dict):
        """
        In dieser Methode ist die Logik beschrieben, damit ein bestehendes Profil aktualisiert wird.
        :param profile_fk: google-ID des Users.
        :param info_dict: Dictionary mit Key-Value paaren. Ein Key repräsentiert eine Eigenschaft.
        """
        print("Admin.py InfoDict: ", info_dict)
        with InfoObjectMapper() as mapper:
            with CharMapper() as char_mapper:
                for key, value in info_dict.items():
                    if key == '30': # Das Alter (Geburtsdatum) soll nicht aktualisiert werden.
                        continue

                    info_obj = InfoObject()
                    info_obj.set_profile_fk(profile_fk)
                    info_obj.set_value(value)
                    char_fk = char_mapper.find_by_key(key).get_id()

                    #print('Admin.py Char-FK:', char_fk)
                    if char_fk is not None:
                        info_obj.set_char_fk(char_fk)
                        #print('Admin.py: dieses Objekt wird an mapper gegeben:', info_obj.get_value() )
                        mapper.update(info_obj)
                    else:
                        print(f'Ungültiger Key: {key}')

    def find_info_object_by_id(self, infoobject_id, profile_id):
        with InfoObjectMapper() as mapper:
            return mapper.find_by_id(infoobject_id, profile_id)


    def delete_info_object(self, infoobject):
        with InfoObjectMapper() as mapper:
            return mapper.delete(infoobject)

    def delete_info_object_search(self, infoobject):
        with InfoObjectMapper() as mapper:
            return mapper.delete_searchprofile(infoobject)

    # Hier wird die Logik für das InfoObjekt (Suchprofil) auf Basis der Mapper realisiert

    def create_Search_info_object(self, profile_fk, info_dict):
        print("InfoDict (aus Administration.py - create_Search_info_object): ", info_dict)
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
                        mapper.Searchinsert(info_obj)
                    else:
                        print(f'Ungültiger Key im Search Insert: {key}')

    # Logik für Profil, did die Info-Objekte in

    "Chat-spezifische Methoden"
    """
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
"""
    def get_profile_by_message(self, profile_id):
        """Diese Methode gibt eine Liste von Profilen in Form von profile_ids zurück,
        welche mit dem "owner"-Profil in Form der profile_id kommunizieren"""
        profiles = []

        with MessageMapper() as message_mapper:
            messages = message_mapper.find_all()

            for message in messages:
                sender_id = message.get_sender()
                recipient_id = message.get_recipient()

                # Überprüfen ob profile_id mit sender_id oder recipient_id übereinstimmt
                if sender_id == profile_id and recipient_id not in profiles:
                    profiles.append(recipient_id)

                if recipient_id == profile_id and sender_id not in profiles:
                    profiles.append(sender_id)

        print("Profiles:", profiles)

        return profiles


    """ Suchprofil-spezifische Methoden """

    """Erstellt ein Suchprofil in der Datenbank, erwartet ein Suchprofil BO"""
    def create_searchprofile(self, searchprofile):
        searchprofile.set_id(1)
        with SearchProfileMapper() as mapper:
            mapper.insert(searchprofile)

    def save_searchprofile(self, searchprofile):
        with SearchProfileMapper() as mapper:
            mapper.update(searchprofile)

    def delete_searchprofile(self, searchprofile_id):
        with SearchProfileMapper() as mapper:
            mapper.delete(searchprofile_id)

    def get_all_searchprofile(self):
        with SearchProfileMapper() as mapper:
            return mapper.find_all()

    """Gibt alle suchprofile_id's eines Profils zurück, dies wird mithilfe der google_id gemacht"""
    def get_searchprofiles_by_google_id(self, key):
        with SearchProfileMapper() as mapper:
            return mapper.find_by_key(key)

    def get_searchprofile_by_key(self, searchprofile):
        with SearchProfileMapper() as mapper:
            return mapper.find_by_searchprofile(searchprofile)

    def update_search_info_object(self, searchprofile_id, info_dict):

        """
        In dieser Methode ist die Logik beschrieben, damit ein bestehendes Suchprofil aktualisiert wird.
        :param searchprofile_id: searchprofile_id des Users.
        :param info_dict: Dictionary mit Key-Value paaren. Ein Key repräsentiert eine Eigenschaft.
        """
        with InfoObjectMapper() as mapper:
            with CharMapper() as char_mapper:
                for key, value in info_dict.items():
                    if key == '30': # Das Alter (Geburtsdatum) soll nicht aktualisiert werden.
                        continue

                    info_obj = InfoObject()
                    info_obj.set_searchprofile_id(searchprofile_id)
                    info_obj.set_value(value)
                    char_fk = char_mapper.find_by_key(key).get_id()

                    if char_fk is not None:
                        info_obj.set_char_fk(char_fk)
                        mapper.update_search(info_obj)
                    else:
                        print(f'Ungültiger Key: {key}')

    def calculate_age(self, info_objects):
        """
        Diese Methode bildet die Applikationslogik ab, um ein Alter anhand des Geburtstages zu berechnen.
        Die Methode empfängt "info_objects". Dabei handelt es sich um eine Liste, die aus InfoObjects-Objekten besteht.
        Nachdem das Objekt mit der char_id "30" gefunden wurde, wird das Alter berechnet und anschließend alle Werte
        des Tupels (processed_infoobj) der processed_tuples Liste übergeben. Aus dieser Liste wird anschließend ein neues
        InfoObject erstellt, das der main.py übergeben wird.
        """
        processed_tuples = []

        for infoobj in info_objects:
            age = infoobj.calc_age()
            if age is not None:
                processed_infoobj = (infoobj._id, infoobj.char_id, age, infoobj.profile_fk, infoobj.searchprofile_id)
                processed_tuples.append(processed_infoobj)
                #print('calculate_age Methode in Admin.py:', processed_tuples)
                new_infoobj = InfoObject()
                new_infoobj.set_id(processed_tuples[0][0])
                new_infoobj.set_char_fk(processed_tuples[0][1])
                new_infoobj.set_value(str(processed_tuples[0][2]))
                new_infoobj.set_profile_fk(processed_tuples[0][3])
                new_infoobj.set_searchprofile_id(processed_tuples[0][4])
                #print('Admin.py: New Infoobj', new_infoobj.get_value())
            return new_infoobj


