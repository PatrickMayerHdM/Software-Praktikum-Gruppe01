from profileNEU import profileNeu
from mapper import mapper

"""Überall wo die Klasse "profile" verwendet wird, müsste eigentlich profileNeu stehen"""


class ProfileNeuMapper(mapper):
    def __init__(self):
        super().__init__()

    """List alle "profile" aus und gibt sie als Objekt zurück"""

    def find_all(self):
        result = []
        cursor = self._connection.cursor()
        cursor.execute("Select * from profiles")
        tuples = cursor.fetchall()

        for (profile_id, firstname, surname, birthdate, hair_color, height, smoker, religion) in tuples:
            profile = profileNeu()
            profile.set_id(profile_id)
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
        command = f'SELECT profile_id, firstname, surname, birthdate FROM profiles WHERE firstname LIKE {surname} ORDER BY name'
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (profile_id, firstname, surname, birthdate) in tuples:
            profile = profileNeu()
            profile.set_id(profile_id)
            profile.set_firstname(firstname)
            profile.set_surname(surname)
            profile.set_birthdate(birthdate)
            result.append(profile)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT profile_id, firstname, surname, birthdate FROM profiles WHERE profile_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (profile_id, firstname, surname, birthdate) = tuples[0]
            profile = profileNeu()
            profile.set_id(profile_id)
            profile.set_firstname(firstname)
            profile.set_surname(surname)
            profile.set_birthdate(birthdate)
            result = profile

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, profile):
        # Verbindugn zur DB + cursor-objekt erstellt
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM profiles")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn eine ID vorhanden ist, zählen wir diese um 1 hoch"""
                profile.set_id(maxid[0] + 1)

            else:
                """Wenn keine id vorhanden ist, beginnen wir mit der id 1"""
                profile.set_id(1)

        command = "INSERT INTO profiles (profile_id, firstname, surname, birthdate) VALUES (%s, %s, %s, %s)"
        data = (profile.get_id(), profile.get_firstname(), profile.get_surname(), profile.get_birthdate())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return profileNeu

    def update(self, profile):
        # Verbindugn zur DB + cursor-objekt erstellt
        cursor = self._connection.cursor()

        # SQL-Befehl um Datensatz in DB zu aktualisieren (Datensatz mit ID, welche in profileNeu gespeichert ist)
        command = "UPDATE profiles" + "SET firstname=%s, surname=%s, birthdate=%s WHERE id=%s "

        # Speichern der gegebenen parameter als Tupel und Ausführung mit aktualisiertet Daten durch execute
        data = (profile.get_firstname(), profile.get_surname(), profile.get_birthdate(), profile.get_id())
        cursor.execute(command, data)

        # Speicherung der veränderten DB und Schließung des cursor
        self._connection.commit()
        cursor.close()

    def delete(self, profile):
        cursor = self._connection.cursor()

        command = "DELETE FROM profiles WHERE id={}".format(profile.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if (__name__ == "__main__"):
    with ProfileNeuMapper() as mapper:
        result = mapper.find_all()
        for profile in result:
            print(profile)
