from relationship import relationship
from BusinessObject import BusinessObject as bo


class ProfileVisits(bo):
    def __init__(self):
        super().__init__()
        self.mainprofile_id = None
        self.visitedprofile_id = None

    def set_mainprofile_id(self, mainprofile_id):
        self.mainprofile_id = mainprofile_id

    def get_mainprofile_id(self):
        return self.mainprofile_id

    def set_visitedprofile_id(self, visited_id):
        self.visitedprofile_id = visited_id

    def get_visitedprofile_id(self):
        return self.visitedprofile_id

    def __str__(self):
        return "profilevisits ID: {}, mainprofile ID: {}, visitedprofile ID: {}".format(self.get_id(),
                                                                                        self.mainprofile_id,
                                                                                        self.visitedprofile_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        bn = ProfileVisits()
        bn.set_id(dictionary['id'])
        bn.set_mainprofile_id(dictionary['mainprofile_id'])
        bn.set_visitedprofile_id(dictionary['visitedprofile_'])
        return bn
