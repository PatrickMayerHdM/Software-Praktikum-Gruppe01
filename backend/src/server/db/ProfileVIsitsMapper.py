from server.bo.profilvisits import ProfileVisits
from server.db.mapper import mapper

"""Notiz: in DB wird der Name blockNote verwendet"""


class ProfileVisitsMapper(mapper):
    """ Mapper-Klasse, der die Blocklist auf eine relationale Datenbank abbildet."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._connection.cursor()

        cursor.execute('SELECT profilevisits_id, mainprofile_id, visitedprofile_id FROM main.ProfileVisits')
        tuples = cursor.fetchall()

        for (profilevisits_id, mainprofile_id, visitedprofile_id) in tuples:
            visited = ProfileVisits()
            visited.set_id(profilevisits_id)
            visited.set_mainprofile_id(mainprofile_id)
            visited.set_visitedprofile_id(visitedprofile_id)
            result.append(visited)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_mainprofile(self, mainprofile_id):
        result = []
        cursor = self._connection.cursor()
        command = f'SELECT profilevisits_id, mainprofile_id, visitedprofile_id FROM main.ProfileVisits WHERE mainprofile_id={mainprofile_id}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (profilevisits_id, mainprofile_id, visitedprofile_id) in tuples:
            visited = ProfileVisits()
            visited.set_id(profilevisits_id)
            visited.set_mainprofile_id(mainprofile_id)
            visited.set_visitedprofile_id(visitedprofile_id)
            result.append(visited)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT profilevisits_id, mainprofile_id, visitedprofile_id FROM main.ProfileVisits WHERE profilevisits_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (profilevisits_id, mainprofile_id, visitedprofile_id) = tuples[0]
            visited = ProfileVisits()
            visited.set_id(profilevisits_id)
            visited.set_mainprofile_id(mainprofile_id)
            visited.set_visitedprofile_id(visitedprofile_id)
            result = visited
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, profilevisits):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(profilevisits_id) AS maxid FROM main.ProfileVisits")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                profilevisits.set_id(maxid[0] + 1)

        command = "Insert INTO main.ProfileVisits (profilevisits_id, mainprofile_id, visitedprofile_id) Values (%s, %s, %s)"
        data = (profilevisits.get_id(),
                profilevisits.get_mainprofile_id(),
                profilevisits.get_visitedprofile_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def update(self, profilevisits):
        cursor = self._connection.cursor()

        command = 'UPDATE main.ProfileVisits SET mainprofile_id=%s, visitedprofile_id=%s WHERE profilevisits_id=%s'

        data = (profilevisits.get_mainprofile_id(),
                profilevisits.get_visitedprofile_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, profilevisits):
        cursor = self._connection.cursor()
        command = f'DELETE FROM main.ProfileVisits WHERE profilevisits_id ={profilevisits.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if (__name__ == "__main__"):
    with ProfileVisitsMapper() as mapper:
        result = mapper.find_all()
        for b in result:
            print(b)
