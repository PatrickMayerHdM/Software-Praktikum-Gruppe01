from server.bo.BusinessObject import BusinessObject as bo


class Characteristics(bo):
    def __init__(self):
        super().__init__()
        self._char_id = None
        self._char_name = ""
        self._char_typ = ""


    def set_char_id(self, value):
        """Setzen der Char_id."""
        self._char_id = value

    def get_char_id(self):
        """Auslesen der Char_id."""
        return self._char_id

    def get_characteristic_name(self):
        """Auslesen des Eigenschaftsnamen."""
        return self._char_name

    def set_characteristic(self, value):
        """Setzen des Eigenschaftsnamen."""
        self._char_name = value

    def get_characteristic_typ(self):
        """Auslesen des Eigenschaftstyp."""
        return self._char_typ

    def set_characteristic_typ(self, value):
        """Setzen des Eigenscahftstyp."""
        self._char_typ = value

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Characteristics()
        obj.set_id(dictionary['char_id'])
        obj.set_characteristic(dictionary['char_name'])
        obj.set_characteristic_typ(dictionary['char_typ'])
        return obj

