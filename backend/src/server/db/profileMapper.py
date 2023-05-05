from profileNEU import profileNeu
from mapper import mapper

"""Überall wo die Klasse "profile" verwendet wird, müsste eigentlich profileNeu stehen"""


class ProfileNeuMapper (mapper):
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
        command = "SELECT id, firstname, surname, birthdate, hair_color, height, smoker, religion FROM profile WHERE " \
                  "id={}".format(key)
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

    def insert(self, profileNeu):
        # Verbindugn zur DB + cursor-objekt erstellt
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM profileNeu")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn eine ID vorhanden ist, zählen wir diese um 1 hoch"""
                profileNeu.set_id(maxid[0] + 1)

            else:
                """Wenn keine id vorhanden ist, beginnen wir mit der id 1"""
                profileNeu.set_id(1)

        command = "INSERT INTO profileNeu (id, firstname, surname, birthdate) VALUES (%s, %s, %s, %s)"
        data = (profileNeu.get_id(), profileNeu.get_firstname(), profileNeu.get_surname(), profileNeu.get_birthdate())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return profileNeu

    def update(self, profileNeu):
        # Verbindugn zur DB + cursor-objekt erstellt
        cursor = self._connection.cursor()

        # SQL-Befehl um Datensatz in DB zu aktualisieren (Datensatz mit ID, welche in profileNeu gespeichert ist)
        command = "UPDATE profileNeu" + "SET firstname=%s, surname=%s, birthdate=%s WHERE id=%s "

        # Speichern der gegebenen parameter als Tupel und Ausführung mit aktualisiertet Daten durch execute
        data = (profileNeu.get_firstname(), profileNeu.get_surname(), profileNeu.get_birthdate(), profileNeu.get_id())
        cursor.execute(command, data)

        # Speicherung der veränderten DB und Schließung des cursor
        self._connection.commit()
        cursor.close()

    def delete(self, profile):
        cursor = self._connection.cursor()

        command = "DELETE FROM profileNeu WHERE id={}".format(profileNeu.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if (__name__ == "__main__"):
    with ProfileNeuMapper() as mapper:
        result = mapper.find_all()
        for profileNeu in result:
            print(profileNeu)