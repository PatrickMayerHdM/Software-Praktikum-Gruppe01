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

        for (char_id, char_name, char_typ) in tuples:
            char = Characteristics()
            char.set_id(char_id)
            char.set_characteristic(char_name)
            char.set_characteristic_typ(char_typ)
            result.append(char)

        self._connection.commit()
        cursor.close()

        print("CharMapper: ", result)
        return result

    def find_by_key(self, key):
        """ Auslesen einer Eigenschaft anhand eines Keys."""
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

        print("Char Name Mapper: ", result)
        return result

    def find_key_by_char_name(self, key):
        """ Auslesen eines Keys anhand Eigenschaftsnamen."""
        cursor = self._connection.cursor()
        command = f"SELECT char_id, char_name, char_typ FROM main.Characteristic WHERE char_name='{key}'"
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (char_id) = tuples[0]
            char = NamedInfoObject()
            char.set_named_char_id(char_id[0])
            char.set_char_typ(char_id[0]) # hier evtl 1 statt 0
            result = char
        else:
            raise ValueError(f"Schlüssel {key} nicht gefunden.")

        self._connection.commit()
        cursor.close()

        return result.get_named_char_id()

    def find_char_by_key(self, key):
        """ Auslesen einer Eigenschaft anhand einer Char_id."""
        cursor = self._connection.cursor()
        command = f"SELECT char_name FROM main.Characteristic WHERE char_id='{key}'"
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (char_name, ) = tuples[0]
            result = char_name
        else:
            raise ValueError(f"Schlüssel {key} nicht gefunden.")

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, char):
        """ Hinzufügen einer Eigenschaft."""
        cursor = self._connection.cursor()
        cursor.execute('SELECT MAX(char_id) AS maxid FROM main.Characteristic')
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                char.set_id(maxid[0] + 10)
            else:
                char.set_id(10)

        command = 'INSERT INTO main.Characteristic (char_id, char_name) VALUES (%s, %s)'

        data = (char.get_id(),
                char.get_characteristic_name())
        cursor.execute(command, data)
        self._connection.commit()
        cursor.close()

        return char

    def insert_named_char(self, key):
        """ Hinzufügen eines named_char."""
        cursor = self._connection.cursor()

        select_query = 'SELECT char_id, char_typ FROM main.Characteristic WHERE char_name = %s'
        cursor.execute(select_query, (key.get_named_char_name(),))
        result = cursor.fetchone()

        if result:
            cursor.close()
            return key

        cursor.execute('SELECT MAX(char_id) AS maxid FROM main.Characteristic')
        tuples = cursor.fetchall()

        for (maxid,) in tuples:
            key.set_id(maxid + 1)

        command = 'INSERT INTO main.Characteristic (char_id, char_name, char_typ) VALUES (%s, %s, %s)'

        data = (key.get_id(),
                key.get_named_char_name(),
                key.get_char_typ())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return key

    def update(self, char):
        """ Updaten einer Eigenschaft."""
        cursor = self._connection.cursor()

        command = 'UPDATE main.Characteristic SET char_name=%s WHERE char_id=%s'
        data = (char.get_named_char_name(),
                char.get_named_char_id())
        print("CharMapper: ", data)

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, char):
        """ Löschen einer Eigenschaft."""
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.Characteristic WHERE char_id={char.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

