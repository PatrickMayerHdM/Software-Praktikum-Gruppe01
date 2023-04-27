from BusinessObject import BusinessObject as bo


class profileNeu(bo):
    # Hier wird die Mindestanforderung an Eigenschaften direkt ins profil implementiert
    def __init__(self):
        super().__init__()
        self.firstname = ""
        self.surname = ""
        self.birthdate = ""
        self.hair_color = ""
        self.height = ""
        self.smoker = ""
        self.religion = ""

    def get_firstname(self):
        return self.firstname

    def set_firstname(self, value):
        self.firstname = value

    def get_surname(self):
        return self.surname

    def set_surname(self, value):
        self.surname = value

    def get_birthdate(self):
        return self.birthdate

    def set_birthdate(self, value):
        self.birthdate = value

    def get_hair_color(self):
        return self.hair_color

    def set_hair_color(self, value):
        self.hair_color = value

    def get_height(self):
        return self.height

    def set_height(self, value):
        self.height = value

    def get_smoker(self):
        return self.smoker

    def set_smoker(self, value):
        self.smoker = value

    def get_religion(self):
        return self.religion

    def set_religion(self, value):
        self.religion = value

    def __str__(self):
        # str Methode gibt das erstellte profil in Form eines String zurück
        return "profile: {}, {}, {}, {}, {}, {}, {}, ".format(self.get_id(), self.firstname,
                                                              self.surname, self.birthdate,
                                                              self.hair_color, self.height,
                                                              self.smoker, self.religion)


obj = profileNeu()
obj.set_firstname("Michael")
obj.set_surname("Fezer")
obj.set_birthdate("21.10.2001")
obj.set_hair_color("braun")
obj.set_height("180 cm")
obj.set_smoker(False)
obj.set_religion("Atheismus")

print(obj)
