from profileNEU import profileNeu
from mapper import mapper


class profileMapper(mapper):
    def __init__(self):
        super().__init__()

    """List alle "profile" aus und gibt sie als Objekt zurück"""

    def find_all(self):
        result = []
        cursor = self._connection.cursor()
        cursor.execute("Select * from profile")
        tuples = cursor.fetchall()

        for (id, firstname, surname, birthdate, hair_color, height, smoker, religion) in tuples:
            profile = profileNeu()
            profile.set_id(id)
            profile.set_firstname(firstname)
            profile.set_surname(surname)
            profile.set_birthdate(birthdate)
            profile.set_hair_color(hair_color)
            profile.set_height(height)
            profile.set_smoker(smoker)
            profile.set_religion(religion)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_surname(self, surname):
        result = []
        cursor = self._connection.cursor()
        command = "SELECT firstname, surname, birthdate, hair_color, height, smoker, religion " \
                  "FROM profile WHERE firstname LIKE '{}' ORDER BY name".format(surname)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, firstname, surname, birthdate, hair_color, height, smoker, religion) in tuples:
            profile = profileNeu()
            profile.set_id(id)
            profile.set_firstname(firstname)
            profile.set_surname(surname)
            profile.set_birthdate(birthdate)
            profile.set_hair_color(hair_color)
            profile.set_height(height)
            profile.set_smoker(smoker)
            profile.set_religion(religion)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = "firstname, surname, birthdate, hair_color, height, smoker, religion " \
                  "FROM users WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, firstname, surname, birthdate, hair_color, height, smoker, religion) = tuples[0]
            profile = profileNeu()
            profile.set_id(id)
            profile.set_firstname(firstname)
            profile.set_surname(surname)
            profile.set_birthdate(birthdate)
            profile.set_hair_color(hair_color)
            profile.set_height(height)
            profile.set_smoker(smoker)
            profile.set_religion(religion)
            result = profile
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result


    def insert(self, profile):
        pass


    def update(self, profile):
        pass

    def delete(self, profile):
        pass