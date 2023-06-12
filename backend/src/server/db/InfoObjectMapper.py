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

    def Searchinsert(self, info_obj):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(infoobject_id) AS maxid FROM main.InfoObject")
        tuples = cursor.fetchall()


        for (maxid) in tuples:
            if maxid[0] is not None:
                info_obj.set_id(maxid[0] + 1)

            else:
                info_obj.set_id(1)


        # Abrufen der searchprofile_id
        cursor.execute("SELECT MAX(searchprofile_id) AS maxid FROM main.Searchprofile")
        searchprofile_id = cursor.fetchone()[0]

        if searchprofile_id is not None:
            info_obj.set_searchprofile_fk(searchprofile_id)

        command = "INSERT INTO main.InfoObject (infoobject_id, char_id, char_value, profile_id, searchprofile_id) VALUES (%s, %s, %s, %s, %s)"
        data = (info_obj.get_id(),
                info_obj.get_char_fk(),
                info_obj.get_value(),
                info_obj.get_profile_fk(),
                info_obj.get_searchprofile_fk(),
                )

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return info_obj

    def update(self, info_obj):
        cursor = self._connection.cursor()

        command = 'UPDATE main.InfoObject SET char_id=%s, profile_id=%s, char_value=%s WHERE infoobject_id=%s'
        data = (info_obj.get_id(),
                info_obj.get_char_fk(),
                info_obj.get_profile_fk(),
                info_obj.get_value())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, google_id):
        print(type(google_id))
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.InfoObject WHERE profile_id=%s'
        data = [google_id.profile_fk]
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
