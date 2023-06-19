from BusinessObject import BusinessObject as bo


class NamedInfoObject(bo):
    def __init__(self):
        super().__init__()
        self.named_char_desc = ""   # Info
        self.named_char_name = ""   # Eigenschaft
        self.profile_fk = None
        self.char_id = None
        self.searchprofile_id = None

    def get_named_info_id(self):
        return self._id

    def get_named_info_name(self):
        return self.named_char_desc

    def set_named_info(self, value):
        self.named_char_desc = value

    def get_named_char_name(self):
        return self.named_char_name

    def set_named_char(self, value):
        self.named_char_name = value

    def get_named_char_id(self):
        return self.char_id

    def set_named_char_id(self, value):
        self.char_id = value

    def set_named_profile_fk(self, profile):
        self.profile_fk = profile

    def get_named_profile_fk(self):
        return self.profile_fk

    def set_searchprofile_id(self, id):
        self.searchprofile_id = id

    def get_searchprofile_id(self):
        return self.searchprofile_id

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = NamedInfoObject()
        obj.set_named_profile_fk(dictionary['profile_fk'])
        obj.set_named_char_id(dictionary['char_id'])
        obj.set_named_char(dictionary['char_name'])
        obj.set_named_info(dictionary['char_desc'])
        return obj
