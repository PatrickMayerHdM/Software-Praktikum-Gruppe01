from BusinessObject import BusinessObject as bo


class profileNeu(bo):
    # Hier wird die Mindestanforderung an Eigenschaften direkt ins profil implementiert
    def __init__(self):
        super().__init__()
        self.__firstname = ""
        self.__surname = ""
        self.__birthdate = ""
        self.__hair_color = ""
        self.__height = ""
        self.__smoker = ""
        self.__religion = ""

    def get_firstname(self):
        return self.__firstname

    def delete_firstname(self):
        self.__firstname = None

    def set_firstname(self, value):
        self.__firstname = value

    def get_surname(self):
        return self.__surname

    def delete_surname(self):
        self.__surname = None

    def set_surname(self, value):
        self.__surname = value

    def get_birthdate(self):
        return self.__birthdate

    def delete_birthdate(self):
        self.__birthdate = None

    def set_birthdate(self, value):
        self.__birthdate = value

    def get_hair_color(self):
        return self.__hair_color

    def delete_hair_color(self):
        self.__hair_color = None

    def set_hair_color(self, value):
        self.__hair_color = value

    def get_height(self):
        return self.__height

    def delete_height(self):
        self.__height = None

    def set_height(self, value):
        self.__height = value

    def get_smoker(self):
        return self.__smoker

    def delete_smoker(self):
        self.__smoker = None

    def set_smoker(self, value):
        self.__smoker = value

    def get_religion(self):
        return self.__religion

    def delete_religion(self):
        self.__religion = None

    def set_religion(self, value):
        self.__religion = value

    def __str__(self):
        # str Methode gibt das erstellte profil in Form eines String zurück
        return "profile: {}, {}, {}, {}, {}, {}, {}, ".format(self.get_id(), self.__firstname,
                                                              self.__surname, self.__birthdate,
                                                              self.__hair_color, self.__height,
                                                              self.__smoker, self.__religion)


"""
obj = profileNeu()
obj.set_firstname("Michael")
obj.set_surname("Fezer")
obj.set_birthdate("21.10.2001")
obj.set_hair_color("braun")
obj.set_height("180 cm")
obj.set_smoker(False)
obj.set_religion("Atheismus")

print(obj)
"""
