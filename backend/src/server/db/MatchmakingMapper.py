from server.bo.InfoObject import InfoObject
from server.db.mapper import mapper


class MatchmakingMapper(mapper):
    """ Mapper-Klasse, die das Ähnlichkeitsmaß auf eine relationale Datenbank abbildet."""

    def __init__(self):
        super().__init__()

    def find_info_by_profile(self, profile_id):
        """ Auslesen der Info-Objekte zweier Profile. """
        result = []
        cursor = self._connection.cursor()
        command = f"SELECT infoobject_id, char_id, char_value, profile_id FROM main.infoobject WHERE profile_id='{profile_id}'"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (infoobject_id, char_id, char_value, profile_id) in tuples:
            inf = InfoObject()
            inf.set_id(infoobject_id)
            inf.set_char_fk(char_id)
            inf.set_value(char_value)
            inf.set_profile_fk(profile_id)
            result.append(inf)

        self._connection.commit()
        cursor.close()

        return result


    def compare_info_objects(self, profile_id1, profile_id2):
        info_objects1 = self.find_info_by_profile(profile_id1)
        info_objects2 = self.find_info_by_profile(profile_id2)

        matches = []
        for info1 in info_objects1:
            for info2 in info_objects2:
                if info1.get_char_fk() == info2.get_char_fk():
                    match = {
                        "Profile ID 1": profile_id1,
                        "Profile ID 2": profile_id2,
                        "InfoObject ID P1": info1.get_id(),
                        "InfoObject ID P2": info2.get_id(),
                        "Char ID": info1.get_char_fk(),
                        "Char Value 1": info1.get_value(),
                        "Char Value 2": info2.get_value()
                    }
                    matches.append(match)

        return matches

    def find_matching_info_objects(self, profile_id1, profile_id2):
        info_objects1 = self.find_info_by_profile(profile_id1)
        info_objects2 = self.find_info_by_profile(profile_id2)

        matching_info_objects = []
        for info1 in info_objects1:
            for info2 in info_objects2:
                if info1.get_char_fk() == info2.get_char_fk() and info1.get_value() == info2.get_value():
                    matching_info_objects.append(info1)

        return matching_info_objects

    def insert(self, object):
        pass

    def delete(self, object):
        pass

    def update(self, object):
        pass

    def find_all(self):
        pass

    def find_by_key(self, key):
        pass