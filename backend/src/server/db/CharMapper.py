from Characteristic import Characteristic
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
            char = Characteristic()
            char.set_id(char_id)
            char.set_birthdate()


    def find_by_key(self, key):
        pass

    def insert(self, object):
        pass

    def update(self, object):
        pass

    def delete(self, object):
        pass

