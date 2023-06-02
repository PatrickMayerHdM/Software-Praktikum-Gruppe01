from server.bo.BusinessObject import BusinessObject as bo
from Characteristic import Characteristics


class InfoObject(bo):
    def __init__(self):
        super().__init__()
        self.char_fk = None
        self.profile_fk = None
        self.value = None
        self.age = None
        self.firstname = None
        self.gender = None
        self.hair = None
        self.height = None
        self.lastname = None
        self.religion = None
        self.smoking = None

    def set_value(self, value):
        self.value = value

    def get_value(self):
        return self.value

    """Fremdschlüsselbeziehung zwischen InfoObject und Characteristic wird hier gesetzt"""

    def set_char_fk(self, char_fk):
        self.char_fk = char_fk

    def get_char_fk(self):
        return self.char_fk

    """Fremdschlüsselbeziehung zwischen InfoObject und Profil wird hier gesetzt"""

    def set_profile_fk(self, profile):
        self.profile_fk = profile

    def get_profile_fk(self):
        return self.profile_fk

    def set_age(self, age):
        self.age = age

    def get_age(self):
        return self.age

    def set_first_name(self, firstname):
        self.firstname = firstname

    def get_first_name(self):
        return self.firstname

    def set_gender(self, gender):
        self.gender = gender

    def get_gender(self):
        return self.gender

    def set_hair(self, hair):
        self.hair = hair

    def get_hair(self):
        return self.hair

    def set_height(self, height):
        self.height = height

    def get_height(self):
        return self.height

    def set_last_name(self, lastname):
        self.lastname = lastname

    def get_last_name(self):
        return self.lastname

    def set_religion(self, religion):
        self.religion = religion

    def get_religion(self):
        return self.religion

    def set_smoking_status(self, smoking):
        self.smoking = smoking

    def get_smoking_status(self):
        return self.smoking

    def get_char_by_key(self, key):
        # Mapping der Schlüssel zu char_fk
        char_fk_mapping = {
            'age': 10,
            'firstName': 20,
            'gender': 30,
            'hair': 40,
            'height': 50,
            'lastName': 60,
            'religion': 70,
            'smoking': 80
        }
        return char_fk_mapping.get(key, None)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = InfoObject()
        obj.set_id(dictionary.get('id'))
        obj.set_profile_fk(dictionary.get('profile_id'))
        obj.set_value(dictionary.get('value'))
        obj.set_age(dictionary.get('age'))
        obj.set_first_name(dictionary.get('firstName'))
        obj.set_gender(dictionary.get('gender'))
        obj.set_hair(dictionary.get('hair'))
        obj.set_height(dictionary.get('height'))
        obj.set_last_name(dictionary.get('lastName'))
        obj.set_religion(dictionary.get('religion'))
        obj.set_smoking_status(dictionary.get('smoking'))
        return obj

    def to_dict(self):
        info_dict = {
            'age': self.get_age(),
            'firstName': self.get_first_name(),
            'gender': self.get_gender(),
            'hair': self.get_hair(),
            'height': self.get_height(),
            'lastName': self.get_last_name(),
            'religion': self.get_religion(),
            'smoking': self.get_smoking_status()
        }
        return info_dict


"""
x = "Haarfarbe"

diction = {"id": 1, "char_name": x}
char = Characteristics()
Characteristics.from_dict(diction)


info = InfoObject()
info.set_char_fk(char)
print(info.get_char_fk())
"""
# In diesem Beispiel wird immer die Ausgabe 0 folgen, da wir die set_id() Methode erst in den
# Mapper-Klassen automatisch hochzählen lassen
