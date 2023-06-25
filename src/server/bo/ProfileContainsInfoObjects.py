from BusinessObject import BusinessObject as bo

class ProfileContainsInfoObj(bo):
    def __init__(self, profile_id, infoobj_id):
        super().__init__()
        self.profile_id = profile_id
        self.infoobj_id = infoobj_id

    def set_profile(self, profile):
        """ Zuweisung eines Profils in die Verbindungstabelle. """
        self.profile_id = profile

    def get_profile(self):
        """ Auslesen des Profils. """
        return self.profile_id

    def set_infoobj(self, infoobj):
        """ Setzen einer InfoObjekt ID zu einem Profil """
        self.infoobj_id = infoobj

    def get_infoobj(self):
        """ Auslesen der Infoobjekte zu einem Profil """
        return self.infoobj_id

