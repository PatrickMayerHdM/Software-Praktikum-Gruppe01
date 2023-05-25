from server.bo.BusinessObject import BusinessObject as bo
from Characteristic import Characteristics


class InfoObject(bo):
    def __init__(self):
        super().__init__()
        self.char_fk = None
        self.profile_fk = None
        self.value = None

    def set_value(self, value):
        self.value = value

    def get_value(self):
        return self.value

    """Fremdschlüsselbeziehung zwischen InfoObject und Characteristic wird hier gesetzt"""

    def set_char_fk(self, char):
        self.char_fk = char.get_char_id()

    def get_char_fk(self):
        return self.char_fk

    """Fremdschlüsselbeziehung zwischen InfoObject und Profil wird hier gesetzt"""

    def set_profile_fk(self, profile):
        self.char_fk = profile.get_char_id()

    def get_profile_fk(self):
        return self.char_fk

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = InfoObject()
        obj.set_id(dictionary['id'])
        obj.set_value(dictionary['value'])
        return obj


"""
x = "Haarfarbe"

diction = {"char_id": 6, "char_name": x}
char = Characteristics()
Characteristics.from_dict(diction)


info = InfoObject()
info.set_char_fk(char)
print(info.get_char_fk())
"""

