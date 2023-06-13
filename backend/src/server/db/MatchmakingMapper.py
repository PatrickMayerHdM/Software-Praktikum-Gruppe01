from server.db.mapper import mapper
from server.bo.Profile import Profile
def find_info_object_by_profile_id(self, key):
    result = []

    """ Auslesen der Profil Id nach Key """

    cursor = self._connection.cursor()
    command = f"SELECT char_value FROM main.InfoObject WHERE (profile_id='{key}')"
    cursor.execute(command)
    tuples = cursor.fetchall()
    print(tuples)

    for (infoobject_id, char_value) in tuples:
        info_obj = InfoObject()
        info_obj.set_id(infoobject_id)
        info_obj.set_value(char_value)
        result.append(info_obj)

    self._connection.commit()
    cursor.close()

    print("result: ", result)
    return result

    def find_profile_id_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT profile_id FROM main.profile WHERE google_fk=%s'
        data = (key,)
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (profile_id) = tuples[0]
            profile = Profile()
            profile.set_id(profile_id)
            print("Profil von der Datenbank im Mapper:", profile)

            result = profile
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result



    "Methoden für das Matchmaking"
    def find_profile_id_by_key(self, key):
        with ProfileMapper() as mapper:
            return mapper.find_profile_id_by_key(key)