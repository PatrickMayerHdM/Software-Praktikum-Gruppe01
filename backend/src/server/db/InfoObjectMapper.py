from server.bo.InfoObject import InfoObject
from server.db.mapper import mapper

""" Mapper-Klasse des BOs Info-Objekt."""


class InfoObjectMapper(mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Auslesen aller Info-Objekte. """
        result = []
        cursor = self._connection.cursor()
        cursor.execute('SELECT * FROM main.InfoObject')
        tuples = cursor.fetchall()

        for (info_object_id, char_fk, profile_fk, value) in tuples:
            info_obj = InfoObject()
            info_obj.set_id(info_object_id)
            info_obj.set_char_fk(char_fk)
            info_obj.set_profile_fk(profile_fk)
            info_obj.set_value(value)
            result.append(info_obj)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        """ Auslesen der Info-Objekte nach Key """

        cursor = self._connection.cursor()
        command = f'SELECT infoobject_id, char_id, char_value, profile_id FROM main.InfoObject WHERE profile_id=%s'
        data = (key, )
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (infoobject_id, char_id, char_value, profile_id) = tuples[0]
            info_obj = InfoObject()
            info_obj.set_id(infoobject_id)
            info_obj.set_char_fk(char_id)
            info_obj.set_value(char_value)
            info_obj.set_profile_fk(profile_id)

            result = info_obj
        else:
            result = None

        self._connection.commit()
        cursor.close()
        print(result.get_value())

        return result

    def insert(self, info_obj):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(infoobject_id) AS maxid FROM main.InfoObject")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                info_obj.set_id(maxid[0] + 1)

            else:
                info_obj.set_id(1)



        command = "INSERT INTO main.InfoObject (infoobject_id, char_id, char_value, profile_id) VALUES (%s, %s, %s, %s)"
        data = (info_obj.get_id(),
                info_obj.get_char_fk(),
                info_obj.get_value(),
                info_obj.get_profile_fk())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return info_obj

    def update(self, info_obj):
        command = 'UPDATE main.InfoObject SET char_value=%s WHERE infoobject_id=%s AND profile_id=%s'
        data = (info_obj.get_value(), info_obj.get_id(), info_obj.get_profile_fk())

        with self._connection.cursor() as cursor:
            cursor.execute(command, data)

        self._connection.commit()

    def find_by_id(self, key):
        command = 'SELECT infoobject_id, char_id, char_value, profile_id FROM main.InfoObject WHERE profile_id = %s'
        data = (key,)

        with self._connection.cursor() as cursor:
            cursor.execute(command, data)
            tuples = cursor.fetchall()

        if tuples and tuples[0]:
            (infoobject_id, char_id, char_value, profile_id) = tuples[0]
            info_obj = InfoObject()
            info_obj.set_id(infoobject_id)
            info_obj.set_char_fk(char_id)
            info_obj.set_value(char_value)
            info_obj.set_profile_fk(profile_id)

            # Setze die Werte für die gewünschten Getter-Methoden
            char_mapping = {
                30: info_obj.set_age,
                10: info_obj.set_first_name,
                40: info_obj.set_gender,
                70: info_obj.set_hair,
                50: info_obj.set_height,
                20: info_obj.set_last_name,
                60: info_obj.set_religion,
                80: info_obj.set_smoking_status
            }

            for tuple in tuples:
                char_id = tuple[1]
                setter = char_mapping.get(char_id)
                if setter:
                    char_value = tuple[2]
                    setter(char_value)

            print(info_obj.get_value())
            print(info_obj.get_first_name())
            return info_obj

        return None

    def delete(self, google_id):
        print(type(google_id))
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.InfoObject WHERE profile_id=%s'
        data = [google_id.profile_fk]
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
