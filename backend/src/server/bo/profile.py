from BusinessObject import BusinessObject as bo
from Characteristic import Characteristic
from favoriteNote import favoriteNote
from blockNote import blockNote
from Message import Message
from Account import Account

"""Diese Klasse kann später gelöscht werden."""


class profile(bo):
    """Erbt von der Klasse BusinessObject"""

    def __init__(self):
        super().__init__()
        self.chars = Characteristic(firstname=None, surname=None, age=None, sex=None, bodyheight=None, haircolor=None,
                                    description=None, smoking=None, religion=None, searchingfor=None)
        self.content = None
        self.contact_id = None
        self.favoriteNote = favoriteNote
        self.blockNote = blockNote
        self.messageList = []
        self.account = Account
        """self.char2 = Characteristic"""

    """def get_characteristic(self):
        return self.char2"""

    def get_account(self):
        """ Richtiger Lösungsweg für get_profile_id? """
        return self.account

    def get_favoriteNote(self):
        return self.favoriteNote

    def get_blockNote(self):
        return self.blockNote

    def add_char(self, Cha):
        """Die Charasteristics werden der Liste self.chars hinzugefügt"""
        char = Characteristic()
        self.chars.append(char)

    def del_chars(self, chars):
        """Die Charasteristics werden von der Liste self.charsList entfernt"""
        if chars in self.chars:
            self.chars.remove(chars)

    def show_char(self):
        """Zeigt die Charesteristics an"""
        return self.chars

    def send_message(self, contact_id, content):
        """Neues Objekt von Message wird erstellt mit den Attributen id, contact_id und content
        Anschließend message Objekt in Liste message"""
        messageObj = Message(self.get_id(), contact_id, content)
        self.messageList.append(messageObj)

    def get_all_messages(self):
        return self.messageList


"""
Test des Codes

A = profile()

A.add_char("Raucher")
print(A.show_char())
"""

"""
p1 = profile()

fn1 = favoriteNote
p1.favoriteNote = fn1

p1.favoriteNote.add_user(123)
"""
