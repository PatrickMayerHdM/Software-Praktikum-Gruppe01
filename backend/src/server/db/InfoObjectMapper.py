from server.bo.InfoObject import InfoObject
from mapper import mapper

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
        command = f'SELECT info_object_id, char_fk, profile_fk, value FROM main.InfoObject WHERE info_object_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (info_object_id, char_fk, profile_fk, value) = tuples[0]
            info_obj = InfoObject()
            info_obj.set_id(info_object_id)
            info_obj.set_char_fk(char_fk)
            info_obj.set_profile_fk(profile_fk)
            info_obj.set_value(value)

            result = info_obj
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, info_obj):
        cursor = self._connection.cursor()
        cursor.execute('SELECT MAX(info_object_id) AS maxid FROM main.InfoObject')
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            info_obj.set_id(maxid[0] + 1)

        command = 'INSERT INTO main.InfoObject (info_object_id, char_fk, profile_fk, value) VALUES (%s, %s, %s, %s)'

        data = (info_obj.get_id(),
                info_obj.get_char_fk(),
                info_obj.get_profile_fk(),
                info_obj.get_value())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return info_obj

    def update(self, info_obj):
        cursor = self._connection.cursor()

        command = 'UPDATE main.InfoObject SET char_fk=%s, profile_fk=%s, value=%s WHERE info_object_id=%s'
        data = (info_obj.get_id(),
                info_obj.get_char_fk(),
                info_obj.get_profile_fk(),
                info_obj.get_value())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, info_obj):
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.InfoObject WHERE info_object_id={info_obj.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
