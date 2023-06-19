from server.bo.Characteristic import Characteristics
from server.db.mapper import mapper
from server.bo.namedInfoObject import NamedInfoObject

""" Eigenschafts-Klasse die Merkmale eines Profils widerspiegeln. """


class CharMapper(mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Auslesen aller Eigenschaften."""
        result = []
        cursor = self._connection.cursor()
        cursor.execute('SELECT * FROM main.Characteristic')
        tuples = cursor.fetchall()

        for (char_id, char_name) in tuples:
            char = Characteristics()
            char.set_id(char_id)
            char.set_characteristic(char_name)
            result.append(char)

        self._connection.commit()
        cursor.close()



        return result

    def find_by_key(self, key):
        cursor = self._connection.cursor()
        command = f'SELECT char_id, char_name FROM main.Characteristic WHERE char_id=%s'
        data = (key, )
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (char_id, char_name) = tuples[0]
            char = Characteristics()
            char.set_id(char_id)
            char.set_characteristic(char_name)
            result = char
        else:
            raise ValueError(f"Schlüssel {key} nicht gefunden.")

        self._connection.commit()
        cursor.close()

        return result

    def find_key_by_char_name(self, key):
        print("Key aus CharMapper: ", key)
        cursor = self._connection.cursor()
        command = f"SELECT char_id, char_name FROM main.Characteristic WHERE char_name='{key}'"
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            print("Tuples aus CharMapper: ", tuples[0])
            (char_id) = tuples[0]
            print("Char ID im Mapper: ", char_id[0])
            char = NamedInfoObject()
            char.set_named_char_id(char_id[0])
            result = char
        else:
            raise ValueError(f"Schlüssel {key} nicht gefunden.")

        self._connection.commit()
        cursor.close()

        print("Char ID by Name: ", result.get_named_char_id())
        return result.get_named_char_id()

    def insert(self, char):
        cursor = self._connection.cursor()
        cursor.execute('SELECT MAX(char_id) AS maxid FROM main.Characteristic')
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            char.set_id(maxid[0] + 1)

        command = 'INSERT INTO main.Characteristic (char_id, char_name) VALUES (%s, %s)'

        data = (char.get_id(),
                char.get_characteristic_name())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        print("CharMapper: ", char)
        return char

    def insert_named_char(self, char):
        cursor = self._connection.cursor()
        cursor.execute('SELECT MAX(char_id) AS maxid FROM main.Characteristic')
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            char.set_id(maxid[0] + 1)

        command = 'INSERT INTO main.Characteristic (char_id, char_name) VALUES (%s, %s)'

        data = (char.get_id(),
                char.get_named_char_name())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        print("CharMapper: ", char)
        return char

    def update(self, char):
        cursor = self._connection.cursor()

        command = 'UPDATE main.Characteristic SET char_name=%s WHERE char_id=%s'
        data = (char.get_id(),
                char.get_characteristic_name())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, char):
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.Characteristic WHERE char_id={char.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

