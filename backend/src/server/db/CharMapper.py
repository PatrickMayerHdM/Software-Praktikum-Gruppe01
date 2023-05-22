from Characteristic import Characteristics
from mapper import mapper

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
        result = None

        """ Auslesen der Characteristics nach Key """

        cursor = self._connection.cursor()
        command = f'SELECT char_id, char_name FROM main.Characteristic WHERE char_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (char_id, char_name) = tuples[0]
            char = Characteristics()
            char.set_id(char_id)
            char.set_characteristic(char_name)

            result = char
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result


