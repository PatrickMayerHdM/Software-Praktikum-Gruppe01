from InfoObject import InfoObject
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

        for (charx_id, value) in tuples:
            info_obj = InfoObject()
            info_obj.set_id(charx_id)
            info_obj.set_value(value)
            result.append(info_obj)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        """ Auslesen der Info-Objekte nach Key """

        cursor = self._connection.cursor()
        command = f'SELECT char_id, value FROM main.InfoObject WHERE char_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (char_id, value) = tuples[0]
            info_obj = InfoObject()
            info_obj.set_id(id)
            info_obj.set_char_reference(char_id)
            info_obj.set_value(value)

            result = info_obj
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, info_obj):
        cursor = self._connection.cursor()
        cursor.execute('SELECT MAX(infoobject_id) AS maxid FROM main.InfoObject')
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            info_obj.set_id(maxid[0] + 1)

        command = 'INSERT INTO main.InfoObject (infoobject_id, char_id, value) VALUES (%s, %s, %s)'

        data = (info_obj.get_id(),
                info_obj.get_char_reference(),
                info_obj.get_value())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return info_obj

    def update(self, info_obj):
        cursor = self._connection.cursor()

        command = 'UPDATE main.InfoObject SET char_id=%s, value=%s WHERE infoobject_id=%s'
        data = (info_obj.get_sender(),
                info_obj.get_recipient(),
                info_obj.get_content())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, info_obj):
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.InfoObject WHERE infoobject_id={info_obj.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()