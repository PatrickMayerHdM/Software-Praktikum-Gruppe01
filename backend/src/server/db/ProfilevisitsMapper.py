from server.db.mapper import mapper
from server.bo.Profilevisits import Profilevisits

class ProfilevisitsMapper(mapper):
    def __init__(self):
        super().__init__()

    def find_by_key(self, key):
        results = []

        cursor = self._connection.cursor()
        command = f'SELECT profilevisits_id, mainprofile_id, visitedprofile_id FROM main.Profilevisits WHERE mainprofile_id=%s'
        data = (key, )
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        if tuples is not None:
            for row in tuples:
                (profilevisits_id, _) = row
                results.append(profilevisits_id)

        self._connection.commit()
        cursor.close()

        return results

    def insert(self, visitedprofile):
        print("insert in ProfilevisitsMapper",visitedprofile.get_visitedprofile_id)
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(profilevisits_id) AS maxid FROM main.Profilevisits")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn eine ID vorhanden ist, zählen wir diese um 1 hoch"""
                visitedprofile.set_id(maxid[0] + 1)
            else:
                """Wenn keine id vorhanden ist, beginnen wir mit der id 1"""
                visitedprofile.set_id(1)

        command = "INSERT INTO main.Profilevisits (profilevisits_id, mainprofile_id, visitedprofile_id) VALUES (%s, %s, %s)"
        data = (visitedprofile.get_id(), visitedprofile.get_mainprofile_id(), visitedprofile.get_visitedprofile_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return visitedprofile

    def update(self, object):
        pass

    def find_all(self):
        pass

    def delete(self, object):
        pass