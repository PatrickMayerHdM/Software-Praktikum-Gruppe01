from BusinessObject import BusinessObject as bo
from Characteristic import Characteristics
from InfoObject import InfoObject


class Profile(bo):
    # Grundgerüst profile
    def __init__(self):
        super().__init__()
        self.firstname = ""
        self.surname = ""
        """self.infoObjectsList = []"""
        self.blockNote = None
        self.favoriteNote = None

    def get_firstname(self):
        return self._firstname

    def delete_firstname(self):
        self._firstname = None

    def set_firstname(self, value):
        self._firstname = value

    def get_surname(self):
        return self._surname

    def delete_surname(self):
        self._surname = None

    def set_surname(self, value):
        self._surname = value

    def get_birthdate(self):
        return self.__birthdate

    def delete_birthdate(self):
        self.__birthdate = None

    def set_birthdate(self, value):
        self.__birthdate = value

    """def add_infoObject(self, infoObject):
        self.infoObjectsList.append(infoObject)"""
    # Die zwei Methoden waren testweise in der Klasse vorhanden
    """def get_characteristic(self):
        return self.__characteristic"""

    def __str__(self):
        # str Methode gibt das erstellte profil in Form eines String zurück
        return "profile: {}, {}, {}, {}".format(self.get_id(), self._firstname,
                                                self._surname, self.__birthdate)


"""info = InfoObject(["Alter", "Sex", "Größe", "Haarfarbe", "Beschreibung", "Raucher", "Religion"])
char = Characteristics("21", "männlich", "180", "braun", "Beispiel Beschreibung", False, "keine")
print(info.werte)
print(info.werte[2])
print(char.sex, char.description)"""

"""
profil_eigenschaft = profil.get_characteristic()
print(profil_eigenschaft.get_age())


obj = profileNeu()
obj.set_firstname("Michael")
obj.set_surname("Fezer")
obj.set_birthdate("21.10.2001")


print(obj)
"""
