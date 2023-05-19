from BusinessObject import BusinessObject as bo


class Characteristics(bo):
    def __init__(self, birthdate, sex, bodyheight=None, haircolor=None,
                 description=None, smoking=None, religion=None):
        super().__init__()
        self.birthdate = birthdate
        self.sex = sex
        self.bodyheight = bodyheight
        self.haircolor = haircolor
        self.description = description
        self.smoking = smoking
        self.religion = religion

    def set_age(self, age):
        """Setzen des Alters."""
        self.age = age

    def delete_age(self):
        """Löschen der Altersangabe."""
        self.age = None

    def get_age(self):
        """Auslesen des Alters."""
        return self.age

    def set_sex(self, sex):
        """Setzen des Geschlechts."""
        self.sex = sex

    def delete_sex(self):
        """Löschen der Geschlechtsangabe."""
        self.sex = None

    def get_sex(self):
        """Auslesen des Geschlechts."""
        return self.sex

    def set_description(self, description):
        """Setzen der Freitextbeschreibung."""
        self.description = description

    def delete_description(self):
        """Löschen der Freitextbeschreibung."""
        self.description = None

    def get_description(self):
        """Auslesen der Freitextbeschreibung."""
        return self.description






