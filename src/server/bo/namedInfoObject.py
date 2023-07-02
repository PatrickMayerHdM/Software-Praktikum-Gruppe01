from server.bo.BusinessObject import BusinessObject as bo


class NamedInfoObject(bo):
    def __init__(self):
        super().__init__()
        self.named_char_desc = ""   # Info
        self.named_char_name = ""   # Eigenschaft
        self.named_char_typ = ""    # Typ der Eigenschaft
        self.profile_fk = None
        self.char_id = None
        self.searchprofile_id = None

    def get_named_info_id(self):
        """Auslesen der named_info_id."""
        return self._id

    def get_named_info_name(self):
        """Auslesen des named_info Namens."""
        return self.named_char_desc

    def set_named_info(self, value):
        """Setzen des named_info"""
        self.named_char_desc = value

    def get_named_char_name(self):
        """Auslesen des named_char Namens."""
        return self.named_char_name

    def set_named_char(self, value):
        """Setzen des named_chars."""
        self.named_char_name = value

    def get_named_char_id(self):
        """Auslesen der named_char_id."""
        return self.char_id

    def set_named_char_id(self, value):
        """Setzen der named_char_id."""
        self.char_id = value

    def set_named_profile_fk(self, profile):
        """Setzen des named_profile_fk."""
        self.profile_fk = profile

    def get_named_profile_fk(self):
        """Auslesen des named_profile_fk."""
        return self.profile_fk

    def set_searchprofile_id(self, id):
        """Setzen der Suchprofil_id."""
        self.searchprofile_id = id

    def get_searchprofile_id(self):
        """Auslesen der Suchprofil_id."""
        return self.searchprofile_id

    def set_char_typ(self, value):
        """Setzen des Char_Typs."""
        self.named_char_typ = value

    def get_char_typ(self):
        """Auslesen des Char_Typs."""
        return self.named_char_typ

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = NamedInfoObject()
        obj.set_named_profile_fk(dictionary['profile_fk'])
        obj.set_named_char_id(dictionary['char_id'])
        obj.set_named_char(dictionary['char_name'])
        obj.set_named_info(dictionary['char_desc'])
        obj.set_char_typ(dictionary['char_typ'])
        obj.set_searchprofile_id(dictionary['searchprofile_id'])
        return obj
