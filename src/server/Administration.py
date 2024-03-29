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
from server.db.SearchProfileMapper import SearchProfileMapper
from datetime import datetime
from server.bo.namedInfoObject import NamedInfoObject
from server.db.ProfilevisitsMapper import ProfilevisitsMapper
from server.db.MatchmakingMapper import MatchmakingMapper

class Administration(object):
    def __init__(self):
        pass

    """ Account-spezifische Methoden """

    def create_account(self, google_id, profile_id, name, email):
        """ Erstellen einer Account-Instanz. """
        account = Account()
        account.set_google_id(google_id)
        account.set_profile_id(profile_id)
        account.set_user_name(name)
        account.set_email(email)
        account.set_id(1)

        with AccountMapper() as mapper:
            return mapper.insert(account)

    def get_account_by_name(self, name):
        """ Auslesen einer Account-Instanz anhand des User-Namens. """
        with AccountMapper() as mapper:
            return mapper.find_by_name(name)

    def get_account_by_id(self, number):
        """ Auslesen einer Account-Instanz anhand der ID. """
        with AccountMapper() as mapper:
            return mapper.find_by_key(number)

    def get_account_by_email(self, email):
        """ Auslesen einer Account-Instanz anhand der User-Email. """
        with AccountMapper() as mapper:
            return mapper.find_by_email(email)

    def get_account_by_google_id(self, id):
        """ Auslesen einer Account-Instanz anhand der GoogleID. """
        with AccountMapper() as mapper:
            return mapper.find_by_google_id(id)

    def get_all_accounts(self):
        """ Auslesen aller Account-Instanzen. """
        with AccountMapper() as mapper:
            return mapper.find_all()

    def save_account(self, account):
        """ Update einer Account-Instanz. """
        with AccountMapper() as mapper:
            mapper.update(account)

    def delete_account(self, account):
        """ Löschen einer Account-Instanz. """
        with AccountMapper() as mapper:
            mapper.delete(account)

    """ Spezifische Methoden für message """

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
        """ Aktualisieren einer Nachricht. """
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
        """messages anhand eines keys auslesen"""
        with MessageMapper() as mapper:
            return mapper.find_by_key(key)

    def get_message_by_chat(self, sender_profile, recipient_profile):
        """
        Nachrichten zwischen zwei Personen auslesen.
        Es werden alle Nachrichten ausgelesen. Anschließend wird gefiltert, ob eine der Nachrichten von einer
        blockierten GoogleID stammt.
        """

        messages = [] # Ausgabe der Nachrichten
        blocked_chat_profiles = [] # Liste der Profile, die nicht angezeigt werden sollen

        with MessageMapper() as mapper:
            chat_messages = mapper.find_by_chat(sender_profile, recipient_profile)

        with BlockNoteMapper() as blockmapper:
            blocked_chat_profs = blockmapper.find_blocked_ids_for_chat(sender_profile, recipient_profile)

        for obj in blocked_chat_profs:
            blocked_chat_profiles.append(obj.get_blocked_id())

        for msg in chat_messages:
            a_msg = msg.get_sender()

            if a_msg not in blocked_chat_profiles:
                messages.append(msg)

        return messages


    """ Spezifische Methoden für blockNote """

    def create_blocknote(self, blocking_id, blocked_id):
        """ Erstellen einer neuer Instanz von BlockNote. """
        blocknote = BlockNote()
        blocknote.set_id(1)
        blocknote.set_blocking_id(blocking_id)
        blocknote.set_blocked_id(blocked_id)
        """ Einfügen der neuen Instanz in die Datenbank. """
        with BlockNoteMapper() as mapper:
            return mapper.insert(blocknote)

    def save_blocknote(self, blocklist):
        """ Updaten einer Instanz von BlockNote. """
        with BlockNoteMapper() as mapper:
            mapper.update(blocklist)

    def delete_blocknote(self, blocking_id, blocked_id):
        """ Löschen einer Instanz von BlockNote. """
        with BlockNoteMapper() as mapper:
            mapper.delete(blocking_id, blocked_id)

    def get_all_blocknote(self):
        """ Auslesen aller Instanzen von BlockNote. """
        with BlockNoteMapper() as mapper:
            return mapper.find_all()

    def get_blocknote_by_blocknote_id(self, key):
        """ Auslesen aller Instanzen von BlockNote mit einer bestimmten id. """
        with BlockNoteMapper() as mapper:
            return mapper.find_by_key(key)

    def get_blocknote_by_blocking_user(self, blocking_user):
        """ Auslesen aller Instanzen von BlockNote eines Users. """

        profiles = []
        with BlockNoteMapper() as mapper:
            block_profiles = mapper.find_by_blocking_user(blocking_user)

            for block_profile in block_profiles:
                blocked_user = block_profile.get_blocked_id()
                profiles.append(blocked_user)

        return profiles

    """ Spezifische Methoden für favoritenote """

    def create_favoritenote(self, adding_id, added_id):
        """ Erstellen einer neuer Instanz von FavoriteNote. """
        favoritenote = FavoriteNote()
        favoritenote.set_id(1)
        favoritenote.set_adding_id(adding_id)
        favoritenote.set_added_id(added_id)
        """ Einfügen der neuen Instanz in die Datenbank. """
        with FavoriteNoteMapper() as mapper:
            mapper.insert(favoritenote)

    def save_favoritenote(self, favoritenote):
        """ Updaten einer Instanz von FavoriteNote. """
        with FavoriteNoteMapper() as mapper:
            mapper.update(favoritenote)

    def delete_favoritenote(self, adding_id, added_id):
        """ Löschen einer Instanz von FavoriteNote. """
        with FavoriteNoteMapper() as mapper:
            mapper.delete(adding_id, added_id)

    def get_all_favoritenotes(self):
        """ Auslesen aller Instanzen von FavoriteNote. """
        with FavoriteNoteMapper() as mapper:
            return mapper.find_all()

    def get_favoritenote_by_favoritenote_id(self, key):
        """ Auslesen aller Instanzen von FavoriteNote mit einer bestimmten id. """
        with FavoriteNoteMapper() as mapper:
            return mapper.find_by_key(key)

    def get_favoritenote_by_adding_user(self, adding_user):
        """
        Auslesen aller Instanzen von FavoriteNote eines Users.
        In dieser Methode wird die Merkliste eines Nutzers erstellt. Dabei werden anhand der GoogleID eines Nutzers
        alle Datensätze der DB geladen. Anschließend wird geprüft, ob eine der GoogleIDs in der blockiert wurde.
        """

        profiles = [] # Ergebnisliste der Methode
        self_blocked_list = [] # Liste aller Profile, die der Nutzer blockiert hat
        other_blocked_list = [] # Liste aller Profile, die den Nutzer blockiert haben

        with FavoriteNoteMapper() as mapper:
            fav_profiles = mapper.find_by_adding_user(adding_user)

        with BlockNoteMapper() as blockmapper:
            self_blocked_user = blockmapper.find_blocked_ids_by_blocking_id(adding_user)

            other_blocked_user = blockmapper.find_blocked_ids_by_blocked_id(adding_user)

        for obj in self_blocked_user:
            self_blocked_list.append(obj.get_blocked_id()) # Google-Id der geblockten Profile durch den Nutzer

        for obj2 in other_blocked_user:
            other_blocked_list.append(obj2.get_blocking_id()) # Google-Id von denjenigen, die den Nutzer geblockt haben

        for fav_profile in fav_profiles:
            added_user = fav_profile.get_added_id()

            if (added_user not in self_blocked_list) and (added_user not in other_blocked_list):
                profiles.append(added_user)

        return profiles



    # Hier wird die Logik für das Profil auf Basis der Mapper realisiert
    def create_profile(self, favoritenote_id, blocknote_id, google_fk):
        """
        Erstellen eines Profils.
        :param favoritenote_id: ID der Merkliste
        :param blocknote_id: ID der Blockierliste
        :param google_fk: GoogleID des Nutzers

        Bevor ein Profil erstellt wird, werden die "Standard" Eigenschaften die jedes Profil haben muss in die DB
        gespeichert. Anschließend wird eine Profil-Instanz erstellt.
        """
        self.create_char_list()
        prof = Profile()
        prof.set_favorite_note_id(favoritenote_id)
        prof.set_block_note_id(blocknote_id)
        prof.set_google_fk(google_fk)
        prof.set_id(1)
        with ProfileMapper() as mapper:
            mapper.insert(prof)

    def save_profile(self, profile):
        """ Aktualisieren einer Profil-Instanz. """
        with ProfileMapper() as mapper:
            mapper.update(profile)

    def delete_profile(self, profile):
        """ Löschen einer Profil-Instanz. """
        with ProfileMapper() as mapper:
            mapper.delete(profile)

    def get_all_profiles(self):
        """
        Auslesen aller Profile.
        In dieser Methode werden alle Profile aus der DB geladen. Anschließend wird nach der GoogleID der jeweiligen
        Objekte gesucht und in eine Liste gespeichert. Diese Liste wird ist der Return.
        """
        profiles = []
        with ProfileMapper() as mapper:
            found_profiles = mapper.find_all()

            for found_profile in found_profiles:
                found_user = found_profile.get_google_fk()
                profiles.append(found_user)

        return profiles

    def get_profile_by_google_id(self, key):
        """ Auslesen einer Profil-Instanz anhand der GoogleID. """
        with ProfileMapper() as mapper:
            return mapper.find_by_key(key)

    # Hier wird die Logik für das Characteristic auf Basis der Mapper realisiert
    def create_char_list(self):
        """
        Erstellen der Basis-Eigenschaften der Applikation. Diese stellen die Eigenschaften dar, die mindestens
        vorgegeben werden sollen. Sie stellen soz. default-Werte dar, die jedem Nutzer von Beginn an vorgeschlagen werden.
        """

        with CharMapper() as mapper:
            chars = mapper.find_all()
            if chars:
                return chars

            characteristics_list = [
                (10, "firstName"),
                (20, "lastName"),
                (30, "age"),
                (40, "gender"),
                (50, "height"),
                (60, "religion"),
                (70, "hair"),
                (80, "smoking"),
                (90, "Über Mich"),
                (100, "minAge"),
                (110, "maxAge"),
                (120, "income"),
                (130, "educationalstatus"),
                (140, "favclub"),
                (150, "hobby"),
                (160, "politicaltendency")
            ]

            for char_id, char_name in characteristics_list:
                char = Characteristics()
                char.set_id(char_id)
                char.set_characteristic(char_name)
                with CharMapper() as mapper:
                    mapper.insert(char)
    def get_all_char(self):
        """ Auslesen aller Eigenschaften. """
        with CharMapper() as mapper:
            return mapper.find_all()

    def get_char_by_key(self, key):
        """
        Mit dieser Methode kann man eine Eigenschaft durch eine ID auslesen.
        :param key: Eigenschafts-ID
        :return: Es wird der Eigenschaftsname zurückgegeben.
        """
        with CharMapper() as mapper:
            return mapper.find_char_by_key(key)

    def get_all_char_names(self):
        """
        Mit dieser Methode werden alle Eigenschaftsnamen ausgelesen.
        :return: Es werden alle Eigenschaftsnamen ausgegeben.
        """
        with CharMapper() as mapper:
            return mapper.find_all()

    def create_char(self, named_char_name, char_typ):
        """
        Mit dieser Methode wird ein NamedInfoObjekt erstellt.
        :param named_char_name: der Value des NamedInfoObjekts.
        """
        c = NamedInfoObject()
        c.set_named_char(named_char_name)
        c.set_char_typ(char_typ)
        c.set_id(1)
        with CharMapper() as mapper:
            return mapper.insert_named_char(c)

    def save_char(self, char):
        """ Aktualisieren einer Eigenschaft. """
        with CharMapper() as mapper:
            mapper.update(char)

    def delete_char(self, char):
        """ Löschen einer Eigenschaft. """
        with CharMapper() as mapper:
            mapper.delete(char)

    # Hier wird die Logik für das InfoObjekt auf Basis der Mapper realisiert

    def get_all_info_objects(self):
        """ Auslesen aller Infoobjekte. """
        with InfoObjectMapper() as mapper:
            return mapper.find_all()

    def get_info_object_by_id(self, key):
        """
        Mit dieser Methode werden InfoObjekte basierend auf dem Key ausgelesen.
        :param key: InfoObjekt-ID
        :return: Das entsprechende InfoObjekt wird zurückgegeben.
        """
        with InfoObjectMapper() as mapper:
            return mapper.find_by_id(key)

    def get_info_object_by_searchid(self, key):
        """ Auslesen von Infoobjekten anhand der Suchprofil-ID"""
        with InfoObjectMapper() as mapper:
            print("Admin Key: ", key)
            return mapper.find_by_searchid(key)

    def get_info_object(self, key):
        """ Auslesen von Infoobjekten anhand der Profile-ID """
        with InfoObjectMapper() as mapper:
            return mapper.find_by_key(key)

    def create_info_object(self, profile_fk, info_dict):
        """
        Erstellt Info Objekte basierend aus einem übergebenen Dictionary.
        :param profile_fk: Die GoogleID eines Users.
        :param info_dict: Ein Dictionary, dass alle Informationen enthält.
        """
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

    def create_named_info_object(self, profile_fk, infoobj, char_name, searchprofile_id):
        """
        Erstellt ein NamedInfoObjekt basierend auf den angegebenen Attributen.
        :param profile_fk: Die GoogleID eines Users.
        :param infoobj: individuell erstelltes InfoObjekt eines Users.
        :param char_name: individuell erstellte Eigenschaft eines Users.
        """
        with InfoObjectMapper() as mapper:
            with CharMapper() as char_mapper:
                info_obj = NamedInfoObject()
                info_obj.set_id(1)
                info_obj.set_named_char_id(char_mapper.find_key_by_char_name(char_name))
                info_obj.set_named_info(infoobj)
                info_obj.set_named_profile_fk(profile_fk)
                info_obj.set_searchprofile_id(searchprofile_id)
                mapper.insert_named_info(info_obj)

        return info_obj

    def create_named_info_object_profile(self, profile_fk, infoobj, char_name):
        """
        Erstellt ein NamedInfoObjekt basierend auf den angegebenen Attributen.
        :param profile_fk: Die GoogleID eines Users.
        :param infoobj: individuell erstelltes InfoObjekt eines Users.
        :param char_name: individuell erstellte Eigenschaft eines Users.
        """
        with InfoObjectMapper() as mapper:
            with CharMapper() as char_mapper:
                info_obj = NamedInfoObject()
                info_obj.set_id(1)
                info_obj.set_named_char_id(char_mapper.find_key_by_char_name(char_name))
                info_obj.set_named_info(infoobj)
                info_obj.set_named_profile_fk(profile_fk)
                mapper.insert_named_info(info_obj)

            return info_obj


    def delete_info_object_by_char_value(self, char_value):
        """
        Löscht InfoObjekte basierend auf dem Char_Value.
        :param char_value: der Value eines InfoObjekts.
        """
        with InfoObjectMapper() as mapper:
            return mapper.delete_by_char_value(char_value)

    def get_all_info_objects_by_char_id(self, char_id):
        """
        Durch diesen Aufruf werden alle InfoObjekte ausgelesen,
        die diese individuelle Eigenschafts-ID haben.
        :param char_id: individuelle Eigenschafts-ID
        :return: Es wird eine Liste zurückgegeben, die diese InfoObjekte enthält.
        Darüber hinaus werden nur einzigartige InfoObjekte zurückgegeben, d.h., jeder char_value,
        der mehrfach vorkommt, wird nicht zur Liste hinzugefügt.
        """
        with InfoObjectMapper() as mapper:
            info_objects = mapper.find_all_info_objects_by_char_id(char_id)

        to_send_info_objects = {}

        for info_obj in info_objects:
            char_value = info_obj.get_value()
            if char_value not in to_send_info_objects:
                to_send_info_objects[char_value] = info_obj

        return list(to_send_info_objects.values())

    def update_named_info_object(self, profile_fk, char_id, char_name, infoobj):
        """
        In dieser Methode werden bereits vorhandene NamedInfoObjekte aktualisiert.
        :param profile_fk: Google-ID eines Users
        :param char_id: individuelle Eigenschafts-ID
        :param char_name: Eigenschaftsname
        :param infoobj: der Value des Users
        :return: Das aktualisierte InfoObjekt wird zurückgegeben.
        """
        with InfoObjectMapper() as InfoMapper:
            with CharMapper() as mapper:
                namedinfo = NamedInfoObject()

                if char_name is None:
                    char_name = mapper.find_char_by_key(char_id)

                namedinfo.set_named_char_id(char_id)
                namedinfo.set_named_char(char_name)

                if infoobj is not None:
                    namedinfo.set_named_info(infoobj)
                    namedinfo.set_named_profile_fk(profile_fk)
                    InfoMapper.named_update(namedinfo)

                mapper.update(namedinfo)

        return namedinfo

    def update_Search_named_info_object(self, profile_fk, char_id, char_name, infoobj, searchprofile_id):
        """
        In dieser Methode werden bereits vorhandene NamedInfoObjekte aktualisiert.
        :param profile_fk: Google-ID eines Users
        :param char_id: individuelle Eigenschafts-ID
        :param char_name: Eigenschaftsname
        :param infoobj: der Value des Users
        :param searchprofile_id: SuchProfil-ID des SuchProfils
        :return: Das aktualisierte InfoObjekt wird zurückgegeben.
        """
        with InfoObjectMapper() as InfoMapper:
            with CharMapper() as mapper:
                namedinfo = NamedInfoObject()

                if char_name is None:
                    char_name = mapper.find_char_by_key(char_id)

                namedinfo.set_named_char_id(char_id)
                namedinfo.set_named_char(char_name)

                if infoobj is not None:
                    namedinfo.set_named_info(infoobj)
                    namedinfo.set_searchprofile_id(searchprofile_id)
                    InfoMapper.Search_named_update(namedinfo)

                mapper.update(namedinfo)

        return namedinfo

    def update_info_object(self, profile_fk, info_dict):
        """
        In dieser Methode ist die Logik beschrieben, damit ein bestehendes Profil aktualisiert wird.
        :param profile_fk: google-ID des Users.
        :param info_dict: Dictionary mit Key-Value paaren. Ein Key repräsentiert eine Eigenschaft.
        """
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
        """
        Mit dieser Funktion werden InfoObjekte basierend auf einer individuellen InfoObjekt-ID
        und der passenden Profil-ID ausgelesen.
        :param infoobject_id: individuelle InfoObjekt-ID
        :param profile_id: Google-ID eines Users
        """
        with InfoObjectMapper() as mapper:
            return mapper.find_by_id(infoobject_id, profile_id)

    def delete_info_object(self, infoobject):
        """ Löschen eines Infoobjekts. """
        with InfoObjectMapper() as mapper:
            return mapper.delete(infoobject)

    def delete_info_object_search(self, key):
        """ Löschen von Infoobjekten anhand der Suchprofil-ID """
        with InfoObjectMapper() as mapper:
            return mapper.delete_searchprofile(key)


    def get_profile_by_message(self, profile_id):
        """Diese Methode gibt eine Liste von Profilen zurück, welche mit dem "owner"-Profil kommunizieren"""
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

        return profiles


    """ Suchprofil-spezifische Methoden """


    def create_searchprofile(self, searchprofile):
        """Erstellt ein Suchprofil in der Datenbank, erwartet ein Suchprofil BO"""
        searchprofile.set_id(1)
        with SearchProfileMapper() as mapper:
            mapper.insert(searchprofile)

    def get_new_searchprofile(self):
        """ Auslesen des neusten Suchprofils. """
        with SearchProfileMapper() as mapper:
            return mapper.find_new()

    # Hier wird die Logik für das InfoObjekt (Suchprofil) auf Basis der Mapper realisiert

    def create_Search_info_object(self, profile_fk, info_dict):
        """
        Erstellen von Info-Objekten für ein Suchprofil.
        :param profile_fk: GoogleID eines Nutzers
        :param info_dict: Dictionary mit Key-Value paaren

        Damit die Info-Objekte einem Suchprofil zugewiesen werden, rufen wir die Methode "get_new_searchprofile" auf und
        speichern das Ergebnis in "searchp". Das ist unsere Suchprofil-ID.
        """

        searchp = self.get_new_searchprofile()

        with InfoObjectMapper() as mapper:
            with CharMapper() as char_mapper:
                for key, value in info_dict.items():
                    info_obj = InfoObject()
                    info_obj.set_profile_fk(profile_fk)
                    info_obj.set_value(value)
                    info_obj.set_searchprofile_fk(searchp)
                    # Hier wird der CharMapper aufgerufen!
                    char_fk = char_mapper.find_by_key(key).get_id()
                    if char_fk is not None:
                        info_obj.set_char_fk(char_fk)
                        mapper.Searchinsert(info_obj)
                    else:
                        print(f'Ungültiger Key im Search Insert: {key}')

    def save_searchprofile(self, searchprofile):
        """ Aktualisieren eines Suchprofils. """
        with SearchProfileMapper() as mapper:
            mapper.update(searchprofile)

    def delete_searchprofile(self, searchprofile_id):
        """ Löschen eines Suchprofils. """
        with SearchProfileMapper() as mapper:
            mapper.delete(searchprofile_id)

    def get_all_searchprofile(self):
        """ Auslesen aller Suchprofile. """
        with SearchProfileMapper() as mapper:
            return mapper.find_all()


    def get_searchprofiles_by_google_id(self, key):
        """ Gibt alle suchprofile_id's eines Profils zurück, dies wird mithilfe der google_id gemacht. """
        with SearchProfileMapper() as mapper:
            return mapper.find_by_key(key)

    def get_searchprofile_by_key(self, searchprofile):
        """ Auslesen aller Suchprofile anhand der Suchprofil-ID. """
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

    def get_infoobj_by_searchid(self, searchid):
        with InfoObjectMapper() as mapper:
            return mapper.find_all_by_searchid(searchid)

    def delete_info_object_by_char_value_and_search_id(self, value, searchid):
        with InfoObjectMapper() as mapper:
            return mapper.find_info_obj_by_value_and_search_id(value, searchid)

    def calculate_age(self, info_objects):
        """
        Diese Methode stellt die Applikationslogik dar, um ein Alter anhand des Geburtstages zu berechnen.
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
                new_infoobj = InfoObject()
                new_infoobj.set_id(processed_tuples[0][0])
                new_infoobj.set_char_fk(processed_tuples[0][1])
                new_infoobj.set_value(str(processed_tuples[0][2]))
                new_infoobj.set_profile_fk(processed_tuples[0][3])
                new_infoobj.set_searchprofile_id(processed_tuples[0][4])
                #print('Admin.py: New Infoobj', new_infoobj.get_value())
            return new_infoobj

    """Spezifische Methoden für Profilevisits"""

    def get_profilevisits(self, key):
        """ Auslesen der besuchten Profile für ein mainprofile, welches hier der Key ist."""
        with ProfilevisitsMapper() as mapper:
            return mapper.find_by_key(key)

    def create_profilevisits(self, visitedprofile):
        """ Hinzufügen eines Profils, welches vom mainprofile besucht wurde."""
        visitedprofile.set_id(1)

        with ProfilevisitsMapper() as mapper:
            mapper.insert(visitedprofile)

    """ Matching Methode """

    def execute_matchmaking(self, searchprof):
        """
        Diese Methode stellt die Ausführung des Algorithmus dar, um potenzielle Partner auf der Plattform zu finden.
        Das Matchmaking durchläuft verschiedene Etappen. Zuerst werden alle Profile geladen. Die zweite Etappe filtert
        nach dem gesuchten Geschlecht. In der dritten Etappe wird nach dem gesuchten Alter gefiltert. Die Liste mit den
        Profilen, für die das Matchmaking kalkuliert werden soll ist die "age_filtered_list". Es wird auch überprüft,
        ob eines der Profile bereits vom Suchenden blockiert wurde. Über die "age_filtered_list" wird iteriert
        und der Inhalt der Infoobjekte abgeglichen. Für jedes abgleichende Infoobjekt wird "total_checked_elem" hochgezählt
        und bei Übereinstimmung der "score" +1 addiert. Das Ergebnis wird für jedes Profil berechnet und der "Result-Liste"
        hinzugefügt. Am Schluss wird noch geprüft, ob das Profil bereits besucht wurde. Wenn der Suchende das Profil
        bereits angesehen hatte wird ein "True" in den Listeneintrag aufgenommen, anderenfalls ein "False".
         """

        searchprofile = searchprof  # Searchprofile ist das Dict mit ID und Char-Values
        print('Admin.py: Dieses Suchprofil wurde an Algo übergeben: ', searchprofile)
        result = []  # Ergebnisliste, die später übergeben werden soll. Ähnlichkeit: [['zQokAwj2tchqk4dkovLVvqCmzWp2', 11]]
        gid_list = []  # Alle Google IDs des Systems
        gender_filtered_list = [] # Alle Profile, die dem gesuchten Geschlecht entsprechen
        age_filtered_list = [] # Alle Profile, die in der gesuchten Altersrange liegen

        """ 
        Zuerst werden alle Profil-Objekte aus der DB geladen und die jeweilige GoogleID ausgelesen. Die GoogleIDs
        werden dann in die gid_list hinzugefügt. 
        """
        with ProfileMapper() as prof_mapper:
            profiles = prof_mapper.find_all()
            for gid in profiles:
                gid_list.append(gid.get_google_fk())  # Füge der gid_list alle google_fk´s zu.


        """ 
        Überprüfung, ob sich eine gefundene Google-ID in der Blockierliste befindet. Wenn eine GoogleID aus der gid_list
        vom Suchenden blockiert wurde, wird sie aus der gid_list entfernt. 
        """
        with SearchProfileMapper() as searchprof_mapper:
            search_google_id = searchprof_mapper.find_gid_by_searchid(searchprofile['Searchprofile ID'])
            with BlockNoteMapper() as block_mapper:
                blocked_profiles = block_mapper.find_by_blocking_user(search_google_id) #finde alle blockierten profile
                for googleid in blocked_profiles: # suche nach den googleid´s
                    blocked_id = googleid.get_blocked_id()
                    if blocked_id in gid_list:
                        gid_list.remove(blocked_id) # entferne alle blockierten profile

        """ Entfernen der eigenen Google ID um nicht selbst in der Liste gefunden zu werden. """
        gid_list.remove(search_google_id)

        """ Für jedes Profil werden nun die Info-Objekte geladen. """
        for elem in gid_list:
            with InfoObjectMapper() as info_mapper:
                info_obj = info_mapper.find_by_key(elem)  # Findet alle Infoobjekte eines Profils
                char_values = {}  # Erzeuge ein leeres Dict

            for i in info_obj:
                char_id = i.get_char_fk()  # Setzt den Eigenschafts-Foreign Key eines Infoobjektes
                char_value = i.get_value()  # Setzt den "Value" einer Eigenschaft.
                char_values[char_id] = char_value  # fügt dem char_values Dict das Element hinzu. (z.B. 20:'Wunderlich')

            """ Gender Filter: Überprüft ob das Geschlecht dem gesuchten Geschlecht entspricht """
            if 40 in char_values:
                search_gender = searchprofile['Char Values'].get(40)  # Gesuchte Geschlecht des Suchprofils
                profile_gender = char_values[40]  # Geschlecht des Profils

                if search_gender is not None and profile_gender is not None and search_gender == profile_gender:
                    profile = {
                        'Profile ID': elem,
                        'Char Values': char_values,
                    }
                    gender_filtered_list.append(profile)  # Füge das Profil inkl. Infoobjekte der ersten "filter-list" hinzu.

        """ Age Filter: Soll das gewünschte Alter der gesuchten Person ermitteln und nur Kandidaten in dieser Spanne zur Suche hinzufügen """
        if 100 in searchprofile['Char Values'] and 110 in searchprofile['Char Values']:
            min_age = searchprofile['Char Values'][100]
            max_age = searchprofile['Char Values'][110]

            for profile in gender_filtered_list:  # jedes Profil aus der Liste holen
                if 'Char Values' in profile:
                    char_values = profile['Char Values']
                    if 30 in char_values:  # Prüfe den Value mit dem Key 30
                        age = char_values[30]
                        calculated_age = self.agefilter(age)  # Berechne das Alter anhand des Geburtstages

                        if calculated_age is not None:
                            if int(min_age) <= calculated_age <= int(max_age):  # Abfrage ob das berechnete Alter in der Suchrange liegt
                                age_filtered_list.append(profile)

        # Jetzt finden die Berechnungen statt. Dabei wird das Suchprofil mit den Profilen in der age-filtered-list abgeglichen
        # Zuerst wird der Text bzw. der Wert verglichen dafür wird die Methode compare text aufgerufen
        for prof in age_filtered_list:
            score = 0  # Anfangswert des Scores. Der Score wird bei Compare Text genutzt
            total_checked_elem = 0
            # Vergleich der Religion zwischen Such- und Userprofil
            if searchprofile['Char Values'][60] is not None:
                if 60 in prof['Char Values']:
                    total_checked_elem += 1  # Addiert das überprüfte Element für die finale Berechnung
                    compare_text = self.compare_text(searchprofile['Char Values'][60], prof['Char Values'][60])
                    if compare_text == 1:
                        score += 1
            else:
                pass

            # Vergleich der Haarfarbe
            if searchprofile['Char Values'][70] is not None:
                if 70 in prof['Char Values']:
                    total_checked_elem += 1  # Addiert das überprüfte Element für die finale Berechnung
                    compare_text = self.compare_text(searchprofile['Char Values'][70], prof['Char Values'][70])
                    if compare_text == 1:
                        score += 1
            else:
                pass

            # Vergleich des Raucherstatus zwischen Such- und Userprofil
            if searchprofile['Char Values'][80] is not None:
                if 80 in prof['Char Values']:
                    total_checked_elem += 1  # Addiert das überprüfte Element für die finale Berechnung
                    compare_text = self.compare_text(searchprofile['Char Values'][80], prof['Char Values'][80])
                    if compare_text == 1:
                        score += 1
            else:
                pass

            # Vergleich der Interessen zwischen Such- und Userprofil
            if searchprofile['Char Values'][90] is not None:
                if 90 in prof['Char Values']:
                    total_checked_elem += 1  # Addiert das überprüfte Element für die finale Berechnung
                    compare_text = self.compare_text(searchprofile['Char Values'][90], prof['Char Values'][90])
                    if compare_text > 0:
                        score += compare_text
            else:
                pass

            # Vergleich des lieblings Sportvereins zwischen Such- und Userprofil
            if searchprofile['Char Values'][140] is not None:
                if 140 in prof['Char Values']:
                    total_checked_elem += 1  # Addiert das überprüfte Element für die finale Berechnung
                    compare_text = self.compare_text(searchprofile['Char Values'][140], prof['Char Values'][140])
                    if compare_text == 1:
                        score += 1
            else:
                pass

            # Vergleich des Hobby´s zwischen Such- und Userprofil
            if searchprofile['Char Values'][150] is not None:
                if 150 in prof['Char Values']:
                    total_checked_elem += 1  # Addiert das überprüfte Element für die finale Berechnung
                    compare_text = self.compare_text(searchprofile['Char Values'][150], prof['Char Values'][150])
                    if compare_text == 1:
                        score += 1
            else:
                pass

            # Vergleich der politischen Einstellung zwischen Such- und Userprofil
            if searchprofile['Char Values'][160] is not None:
                if 160 in prof['Char Values']:
                    total_checked_elem += 1  # Addiert das überprüfte Element für die finale Berechnung
                    compare_text = self.compare_text(searchprofile['Char Values'][160], prof['Char Values'][160])
                    if compare_text == 1:
                        score += 1
            else:
                pass

            # Scorewert-Vergleich der Körpergröße
            if searchprofile['Char Values'][50] is not None:
                if 50 in prof['Char Values']:
                    total_checked_elem += 1  # Addiert das überprüfte Element für die finale Berechnung
                    search_value = searchprofile['Char Values'][50]  # small, mean, large
                    userprof = int(prof['Char Values'][50])  # integer 190 für 190cm

                    if search_value == 'small':
                        if int(userprof) < 160:
                            score += 1

                    elif search_value == 'mean':
                        if int(userprof) >= 160 and int(userprof) <= 180:
                            score += 1

                    elif search_value == 'large':
                        if int(userprof) > 180:
                            score += 1
                    else:
                        pass
            else:
                pass

            # Scorewert Berechnung des Einkommens
            if searchprofile['Char Values'][120] is not None:
                if 120 in prof['Char Values']:
                    search_value = searchprofile['Char Values'][120]  # gewünschtes Einkommen des Suchenden
                    total_checked_elem += 1  # Addiert das überprüfte Element für die finale Berechnung

                    if prof['Char Values'][120] is not None:
                        userprof = int(prof['Char Values'][120])  # angegebene Einkommen des User Profils

                        if int(userprof) >= int(search_value):
                            score += 1
            else:
                pass


            # Vergleich der individuellen Infoobjekte der Eigenschaften (Keys ab 160)
            for key in searchprofile['Char Values']:
                if key >= 161:
                    if key in prof['Char Values'] and prof['Char Values'][key] is not None:
                        compare_text = self.compare_text(searchprofile['Char Values'][key], prof['Char Values'][key])
                        total_checked_elem += 1
                        if compare_text == 1:
                            score += 1
                            continue

            """ Berechnung des Match-Wertes in Prozent """
            matching_value = score / total_checked_elem * 100  # Prozentberechnung des Match-Wertes
            result.append([prof['Profile ID'], matching_value])

            """ True oder False Statement in Liste hinzufügen, damit nur neue Profile ausgelesen werden können """
            # Zuerst laden wir uns alle Profile die bereits besucht wurden in unsere Liste.
            with ProfilevisitsMapper() as visited_mapper:
                visited_profiles_list = visited_mapper.find_by_key(search_google_id)

        # jetzt iterieren wir über die Result Liste, und setzen den State auf True wenn ein Profil bereits besucht wurde
        # oder auf false, wenn das Profil bisher noch nicht gesehen wurde.
        for profile in result:
            if profile[0] in visited_profiles_list:  # Prüfe den Listeneintrag an der Stelle 0 (googleID)
                profile.append(True) # Wenn das aktuell fokussierte Profil nicht in visited-profiles ist dann erweiter es um True

            else:
                profile.append(False) # Sonst false

        """  
        Result-Liste sortieren, damit das Matching als erstes ausgelesen wird. 
        'key=lambda x: x[1] = definiert, nach welchem Element die Liste sortiert werden sollte 
        'reverse=True' = Sortierung in absteigender Folge
        """
        result.sort(key=lambda x: x[1], reverse=True)

        return result

    def get_char_values(self, profile_id):
        """ Diese Methode holt sich die char_values je profil und speichert diese in einem Dictionary. """

        with MatchmakingMapper() as mapper:
            info_objects = mapper.find_info_by_profile(profile_id)
            char_values = {}

        for info_obj in info_objects:
            char_id = info_obj.get_char_fk()
            char_value = info_obj.get_value()
            char_values[char_id] = char_value

        return char_values

    def get_char_values_for_profiles(self, profile_id):
        """ Diese Methode gibt ein Dictionary mit einer gegebenen Profile ID und deren Char Values zurück. """
        char_values = self.get_char_values(profile_id)

        profile = {
            "Profile ID": profile_id,
            "Char Values": char_values
        }
        return profile

    def get_char_values_for_searchprofile(self, searchprofile):
        """ Diese Methode gibt ein Dictionary mit einer gegebenen Suchprofil ID und deren Char Values zurück """
        with SearchProfileMapper() as mapper:
            char_objects = mapper.find_by_searchprofile(searchprofile)
            # Die Char Values sind hier Infoobjekte: 'Char Values': [<server.bo.InfoObject.InfoObject object at 0x11b353640>, ...]
            # Hier wird eine Logik definiert, die das Dict im gewünschen Zustand übergibt. 'Char Values': {10: 'Jane', ...}}
            transformed_values = {} #leeres Dict, das später hinzugefügt wird
            for info_obj in char_objects:
                char_id = info_obj.get_char_fk() # holt den char_fk
                char_value = info_obj.get_value() # holt den value
                transformed_values[char_id] = char_value

            #print('admin.py: Transformed Values:', transformed_values)

        searchprof = {
            "Searchprofile ID": searchprofile,
            "Char Values": transformed_values
        }
        return searchprof

    def compare_text(self, text1, text2):
        """Diese Methode vergleicht den Freitext zweier InfoObjects miteinander."""

        # Um zu verhindern, dass das Programm abstürzt wenn bei der Prüfung ein "None"-Wert übergeben wird.
        if text1 is None or text2 is None:
            return 0  # Dann wird kein "Score" vergeben

        """Trennen der Freitexte in kleingeschriebene, einzelne Wörter."""
        words1 = set(text1.lower().split())
        words2 = set(text2.lower().split())

        """Anzahl der gemeinsamen Wörter berechnen."""
        num_words = len(words1.intersection(words2))

        """Anzahl der Wörter, die nicht gemeinsam sind berechnen."""
        opp_num_words = len(words1) + len(words2) - num_words

        """Der Vergleich der gemeinsamen und nicht gemeinsamen Wörter wird in der Variablen comparation gespeichert."""
        comparation = round(num_words / opp_num_words, 2)
        return comparation

    def agefilter(self, age_str):
        """
        Diese Methode berechnet das Alters eines Userprofils. Die Eingabe age_str ist dabei nur das Datum eines Profils.
        Diese Methode ist die abgewandelte Version der "calculate_age" Methode für Infoobjekte und soll ausschließlich
        für den Algorithmus (Matchmaking) genutzt werden.
        """
        birthdate = datetime.fromisoformat(age_str[:-1])  # das "z" entfernen
        curr_date = datetime.now()
        age = curr_date.year - birthdate.year - ((curr_date.month, curr_date.day) < (birthdate.month, birthdate.day))
        return age

