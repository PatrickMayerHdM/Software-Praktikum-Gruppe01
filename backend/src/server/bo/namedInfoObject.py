from BusinessObject import BusinessObject as bo


class NamedInfoObject(bo):
    def __init__(self):
        super().__init__()
        self.named_char_desc = ""
        self.profile_fk = None
        self.searchprofile_id = None

    def get_named_info_id(self):
        return self._id

    def get_named_info_name(self):
        return self.named_char_desc

    def set_named_info(self, value):
        self.named_char_desc = value

    def set_profile_fk(self, profile):
        self.profile_fk = profile

    def get_profile_fk(self):
        return self.profile_fk

    def set_searchprofile_id(self, id):
        self.searchprofile_id = id

    def get_searchprofile_id(self):
        return self.searchprofile_id

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = NamedInfoObject()
        obj.set_id(dictionary['id'])
        obj.set_profile_fk(['profile_fk'])
        obj.set_searchprofile_id(['searchprofile_id'])
        obj.set_named_info(dictionary['char_desc'])
        return obj
