from server.bo.BusinessObject import BusinessObject as bo
from Characteristic import Characteristics
from datetime import datetime


class InfoObject(bo):
    def __init__(self):
        super().__init__()
        self.char_id = None
        self.profile_fk = None
        self.char_value = None
        self.searchprofile_id = None
        self.age = ""
        self.firstname = ""
        self.gender = ""
        self.hair = ""
        self.height = ""
        self.lastname = ""
        self.religion = ""
        self.smoking = ""
        # Ab hier für das Suchprofil
        self.minAge = ""
        self.maxAge = ""
        self.searchprofile_fk = None
        self.aboutme = ""
        self.income = ""
        self.favclub = ""
        self.hobby = ""
        self.politicaltendency = ""


    def set_value(self, value):
        """ Setzen des Wertes. """
        self.char_value = value

    def get_value(self):
        """ Auslesen des Wertes. """
        return self.char_value

    def set_searchprofile_id(self, id):
        """ Setzen der Suchprofil_id. """
        self.searchprofile_id = id

    def get_searchprofile_id(self):
        """ Auslesen der Suchprofil_id. """
        return self.searchprofile_id

    """Fremdschlüsselbeziehung zwischen InfoObject und Characteristic wird hier gesetzt"""

    def set_char_fk(self, char_fk):
        """ Setzen der Characteristic. """
        self.char_id = char_fk

    def get_char_fk(self):
        """ Auslesen der Characteristic. """
        return self.char_id

    """Fremdschlüsselbeziehung zwischen InfoObject und Profil wird hier gesetzt"""

    def set_profile_fk(self, profile):
        """ Setzen des Profils. """
        self.profile_fk = profile

    def get_profile_fk(self):
        """ Auslesen des Profils. """
        return self.profile_fk

    def set_age(self, age):
        """ Setzen des Alters. """
        self.age = age

    def get_age(self):
        """ Auslesen des Alters. """
        return self.age

    def set_first_name(self, firstname):
        """ Setzen des Vornamen. """
        self.firstname = firstname

    def get_first_name(self):
        """ Auslesen des Vornamen. """
        return self.firstname

    def set_gender(self, gender):
        """ Setzen des Geschlechts. """
        self.gender = gender

    def get_gender(self):
        """ Auslesen des Geschlechts. """
        return self.gender

    def set_hair(self, hair):
        """ Setzen der Haarfarbe. """
        self.hair = hair

    def get_hair(self):
        """ Auslesen der Haarfarbe. """
        return self.hair

    def set_height(self, height):
        """ Setzen der Größe. """
        self.height = height

    def get_height(self):
        """ Auslesen der Größe. """
        return self.height

    def set_last_name(self, lastname):
        """ Setzen des Nachnamen. """
        self.lastname = lastname

    def get_last_name(self):
        """ Auslesen des Nachnamen. """
        return self.lastname

    def set_religion(self, religion):
        """ Setzen der Religion. """
        self.religion = religion

    def get_religion(self):
        """ Auslesen der Religion. """
        return self.religion

    def set_smoking_status(self, smoking):
        """ Setzen des Raucherstatus. """
        self.smoking = smoking

    def get_smoking_status(self):
        """ Auslesen des Raucherstatus. """
        return self.smoking

    # Ab hier die Änderungen wegen des Suchprofils

    def get_minAge(self):
        """ Auslesen des MinAges beim Suchprofil. """
        return self.minAge

    def set_minAge(self, minAge):
        """ Setzen des MinAges beim Suchprofil. """
        self.minAge = minAge

    def get_maxAge(self):
        """ Auslesen des MaxAges beim Suchprofil. """
        return self.maxAge

    def set_maxAge(self, maxAge):
        """ Setzen des MaxAges beim Suchprofil. """
        self.maxAge = maxAge

    def get_searchprofile_fk(self):
        """ Auslesen der Suchprofil_id (hier FK). """
        return self.searchprofile_fk

    def set_searchprofile_fk(self, searchprofile_fk):
        """ Setzen der Suchprofil_id (hier FK). """
        self.searchprofile_fk = searchprofile_fk

    def get_aboutme(self):
        """ Auslesen des Textfeldes. """
        return self.aboutme

    def set_aboutme(self, text):
        """ Setzen des Textfeldes. """
        self.aboutme = text

    def get_income(self):
        """ Auslesen der Gehaltsangabe. """
        return self.income

    def set_income(self, income):
        """ Setzen des Nettogehalts. """
        self.income = income

    def get_favclub(self):
        """ Auslesen des Lieblingsvereins. """
        return self.favclub

    def set_favclub(self, club):
        """ Setzen des Lieblingsverins. """
        self.favclub = club

    def get_hobby(self):
        """ Auslesen des Hobbys. """
        return self.hobby

    def set_hobby(self, hobby):
        """ Setzen des Hobbys. """
        self.hobby = hobby

    def get_politicalstat(self):
        """ Auslesen der politischen Einstellung. """
        return self.politicaltendency

    def set_politicalstat(self, stat):
        """ Setzen der politischen Einstellung. """
        self.politicaltendency = stat

    def get_char_by_key(self, key):
        """ Mapping der Schlüssel zu char_fk """
        char_fk_mapping = {
            'age': 30,
            'firstName': 10,
            'gender': 40,
            'hair': 70,
            'height': 50,
            'lastName': 20,
            'religion': 60,
            'smoking': 80,
            'aboutme': 90,
            'minAge': 100,
            'maxAge': 110,
            'income': 120,
            'favclub': 140,
            'hobby': 150,
            'politicaltendency': 160
        }
        return char_fk_mapping.get(key, None)

    def calc_age(self):
        """
        Die Methode berechnet das aktuelle Alter des Nutzers anhand des Geburtstages.
        Dabei wird das ISO Format umgesetzt und das "Z" aus dem Datum entfernt.
        Die Berechnung findet nur statt, wenn die char_id "30" (Alter) in dem Objekt enthalten ist.
        :return: Ganzzahl der Berechnung
        """
        if self.char_id == 30:
            birthdate = datetime.fromisoformat(self.char_value[:-1])
            curr_date = datetime.now()
            age = curr_date.year - birthdate.year
            return age
        else:
            return None


    @staticmethod
    def from_dict(dictionary=dict()):
        obj = InfoObject()
        obj.set_id(dictionary.get('id'))
        obj.set_profile_fk(dictionary.get('profile_fk'))
        obj.set_searchprofile_id(dictionary.get('searchprofile_id'))
        obj.set_value(dictionary.get('char_value'))
        obj.set_age(dictionary.get('age'))
        obj.set_first_name(dictionary.get('firstName'))
        obj.set_gender(dictionary.get('gender'))
        obj.set_hair(dictionary.get('hair'))
        obj.set_height(dictionary.get('height'))
        obj.set_last_name(dictionary.get('lastName'))
        obj.set_religion(dictionary.get('religion'))
        obj.set_smoking_status(dictionary.get('smoking'))
        obj.set_minAge(dictionary.get('minAge'))
        obj.set_maxAge(dictionary.get('maxAge'))
        obj.set_aboutme(dictionary.get('aboutme'))
        obj.set_income(dictionary.get('income'))
        obj.set_favclub(dictionary.get('favclub'))
        obj.set_hobby(dictionary.get('hobby'))
        obj.set_politicalstat(dictionary.get('politicaltendency'))
        return obj

    def to_dict(self):
        """
        Konvertiert ein übergebenes Objekt in ein Dictionary. Jeder Schlüssel repräsentiert eine
        bestimmte Eigenschaft.

        :return: Ein Dict, das die Eigenschaften eines Objetks enthält.
        """
        info_dict = {
            "30": self.get_age(),
            "10": self.get_first_name(),
            "40": self.get_gender(),
            "70": self.get_hair(),
            "50": self.get_height(),
            "20": self.get_last_name(),
            "60": self.get_religion(),
            "80": self.get_smoking_status(),
            "90": self.get_aboutme(),
            "100": self.get_minAge(),
            "110": self.get_maxAge(),
            "120": self.get_income(),
            "140": self.get_favclub(),
            "150": self.get_hobby(),
            "160": self.get_politicalstat()
        }
        return info_dict
