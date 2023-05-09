from BusinessObject import BusinessObject as bo


class Characteristic(bo):
    def __init__(self, age=None, sex=None, bodyheight=None, haircolor=None,
                 description=None, smoking=None, religion=None, searchingfor=None):
        super().__init__()
        self._age = age
        self._ageId = 1
        self._sex = sex
        self._bodyheight = bodyheight
        self._haircolor = haircolor
        self._description = description
        self._smoking = smoking
        self._religion = religion
        self._searchingFor = searchingfor

    def set_age(self, age):
        """Setzen des Alters."""
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

    def delete_sex(self):
        """Löschen der Geschlechtsangabe."""
        self._sex = None

    def get_sex(self):
        """Auslesen des Geschlechts."""
        return self._sex

    def set_description(self, description):
        """Setzen der Freitextbeschreibung."""
        self._description = description

    def delete_description(self):
        """Löschen der Freitextbeschreibung."""
        self._description = None

    def get_description(self):
        """Auslesen der Freitextbeschreibung."""
        return self._description

    def set_searchingfor(self, pref):
        """Setzen der Beziehungspräferenz."""
        self._searchingFor = pref

    def delete_searchingfor(self):
        """Löschen der Beziehungspräferenz."""
        self._searchingFor = None

    def get_searchingfor(self):
        """Auslesen der Beziehungspräferenz."""
        return self._searchingFor


