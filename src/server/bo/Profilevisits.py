from server.bo.BusinessObject import BusinessObject as bo

class Profilevisits(bo):
    def __init__(self):
        """
        mainprofile_id = das eigene Profil
        visitedprofile_id = das besuchte Profil
        """
        super().__init__()
        self.mainprofile_id = None
        self.visitedprofile_id = None

    def get_mainprofile_id(self):
        """Auslesen des eigenen Profils."""
        return self.mainprofile_id

    def set_mainprofile_id(self, mainprofile_id):
        """Setzen des eigenen Profils."""
        self.mainprofile_id = mainprofile_id

    def get_visitedprofile_id(self):
        """Auslesen des besuchten Profils."""
        return self.visitedprofile_id

    def set_visitedprofile_id(self, visitedprofile_id):
        """Setzen des besuchten Profils."""
        self.visitedprofile_id = visitedprofile_id

    def __str__(self):
        return "Profilevisits: {}, {}, {},".format(self.get_id(), self.mainprofile_id, self.visitedprofile_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Profilevisits()
        obj.set_id(dictionary.get('id'))
        obj.set_mainprofile_id(dictionary.get('mainprofile_id'))
        obj.set_visitedprofile_id(dictionary.get('visitedprofile_id'))
        return obj