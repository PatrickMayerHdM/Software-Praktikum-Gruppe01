from server.db.mapper import mapper

class ProfilevisitsMapper(mapper):
    def __init__(self):
        super().__init__()

    def find_by_key(self, key):
        """ Auslesen aller besuchten Profile anhand eines mainprofiles. """
        results = []

        cursor = self._connection.cursor()
        command = f"SELECT profilevisits_id, mainprofile_id, visitedprofile_id FROM main.Profilevisits WHERE mainprofile_id='{key}'"
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None:
            for i in tuples:
                results.append(i[2])


        self._connection.commit()
        cursor.close()
        #print('Profilevisitsmapper: return:', results)
        return results

    def insert(self, visitedprofile):
        """ Hinzufügen eines Profils, welches vom mainprofile besucht wurde. """
        cursor = self._connection.cursor()
        command = "SELECT profilevisits_id FROM main.Profilevisits WHERE mainprofile_id = %s AND visitedprofile_id = %s"
        data = (visitedprofile.get_mainprofile_id(), visitedprofile.get_visitedprofile_id())
        cursor.execute(command, data)
        """ Abfrage, ob bereits ein Eintrag für genau diese mainprofile_id und visitedprofile_id existiert. """
        existing_id = cursor.fetchone()

        if existing_id is not None:
            """ Falls ein Profil zuvor noch nicht angesehen wurde, wird es Profilevisits mit einem neuen Eintrag hinzugefügt. """
            visitedprofile.set_id(existing_id[0])
        else:
            cursor.execute("SELECT MAX(profilevisits_id) AS maxid FROM main.Profilevisits")
            maxid = cursor.fetchone()[0]
            if maxid is not None:
                visitedprofile.set_id(maxid + 1)
            else:
                visitedprofile.set_id(1)

            insert_command = "INSERT INTO main.Profilevisits (profilevisits_id, mainprofile_id, visitedprofile_id) VALUES (%s, %s, %s)"
            insert_data = (
            visitedprofile.get_id(), visitedprofile.get_mainprofile_id(), visitedprofile.get_visitedprofile_id())
            cursor.execute(insert_command, insert_data)

        self._connection.commit()
        cursor.close()

        return visitedprofile

    def update(self, object):
        pass

    def find_all(self):
        pass

    def delete(self, object):
        pass