from server.bo.BusinessObject import BusinessObject as bo

class Characteristic(bo):
    def __init__(self, firstname=None, surname=None, age=None, sex=None, bodyheight=None, haircolor=None,
                 description=None, smoking=None, religion=None, searchingfor=None):
        super().__init__()
        self._firstName = firstname
        self._surName = surname
        self._age = age
        self._sex = sex
        self._bodyheight = bodyheight
        self._haircolor = haircolor
        self._description = description
        self._smoking = smoking
        self._religion = religion
        self._searchingFor = searchingfor


    def set_firstname(self, firstname):
        """Setzen des Vornamens."""
        self._firstName = firstname

    def change_firstname(self, firstname):
        """Ändern des Vornamens."""
        self._firstName = firstname

    def delete_firstname(self):
        """Löschen des Vornamens."""
        self._firstName = None

    def get_firstname(self):
        """Auslesen des Vornamens."""
        return self._firstName

    def set_surname(self, surname):
        """Setzen des Nachnamens."""
        self._surName = surname

    def change_surname(self, surname):
        """Ändern des Nachnamens."""
        self._surName = surname

    def delete_surname(self):
        """Löschen des Nachnamens."""
        self._surName = None

    def get_surname(self):
        """Auslesen des Nachnamens."""
        return self._surName
    def set_age(self, age):
        """Setzen des Alters."""
        self._age = age

    def change_age(self, age):
        """Ändern des Alters."""
        self._age = age

    def delete_age(self):
        """Löschen der Altersangabe."""
        self._age = None

    def get_age(self):
        """Auslesen des Alters."""
        return self._age

    def set_sex(self, sex):
        """Setzen des Geschlechts."""
        self._sex = sex

    def change_sex(self, sex):
        """Ändern des Geschlechts."""
        self._sex = sex

    def delete_sex(self):
        """Löschen der Geschlechtsangabe."""
        self._sex = None

    def get_sex(self):
        """Auslesen des Geschlechts."""
        return self._sex

    def set_bodyheight(self, bodyheight):
        """Setzen der Koerpergroesse."""
        self._bodyheight = bodyheight

    def change_bodyheight(self, bodyheight):
        """Ändern der Koerpergroesse."""
        self._bodyheight = bodyheight

    def delete_bodyheight(self):
        """Löschen der Koerpergroessenangabe."""
        self._bodyheight = None

    def get_bodyheight(self):
        """Auslesen der Koerpergroesse."""
        return self._bodyheight

    def set_haircolor(self, haircolor):
        """Setzen der Haarfarbe."""
        self._haircolor = haircolor

    def change_haircolor(self, haircolor):
        """Ändern der Haarfarbe."""
        self._haircolor = haircolor

    def delete_haircolor(self):
        """Löschen der Haarfarbe."""
        self._haircolor = None

    def get_haircolor(self):
        """Auslesen der Haarfarbe."""
        return self._haircolor

    def set_description(self, description):
        """Setzen der Freitextbeschreibung."""
        self._description = description

    def change_description(self, description):
        """Ändern der Freitextbeschreibung."""
        self._description = description

    def delete_description(self):
        """Löschen der Freitextbeschreibung."""
        self._description = None

    def get_description(self):
        """Auslesen der Freitextbeschreibung."""
        return self._description

    def set_smoking(self, smoking):
        """Setzen der Eigenschaft: Raucher."""
        self._smoking = smoking

    def change_smoking(self, smoking):
        """Ändern der Eigenschaft: Raucher."""
        self._smoking = smoking

    def delete_smoking(self):
        """Löschen der Eigenschaft: Raucher."""
        self._smoking = None

    def get_smoking(self):
        """Auslesen der Eigenschaft: Raucher."""
        return self._smoking

    def set_religion(self, religion):
        """Setzen der Religionszügehörigkeit."""
        self._religion = religion

    def change_religion(self, religion):
        """Ändern der Religionszugehörigkeit."""
        self._religion = religion

    def delete_religion(self):
        """Löschen der Religionszugehörigkeit."""
        self._religion = None

    def get_religion(self):
        """Auslesen der Religionszugehörigkeit."""
        return self._religion

    def set_searchingfor(self, pref):
        """Setzen der Beziehungspräferenz."""
        self._searchingFor = pref

    def change_searchingfor(self, pref):
        """Ändern der Beziehungspräferenz."""
        self._searchingFor = pref

    def delete_searchingfor(self):
        """Löschen der Beziehungspräferenz."""
        self._searchingFor = None

    def get_searchingfor(self):
        """Auslesen der Beziehungspräferenz."""
        return self._searchingFor


