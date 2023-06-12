from server.db.mapper import mapper
from server.bo.SearchProfile import SearchProfile

class SearchProfileMapper(mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Auslesen aller Suchprofile """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT searchprofile_id, google_id FROM main.Searchprofile")
        tuples = cursor.fetchall()

        for (searchprofile_id, google_id) in tuples:
            searchprofile = SearchProfile()
            searchprofile.set_id(searchprofile_id)
            searchprofile.set_google_fk(google_id)
            result.append(searchprofile)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT searchprofile_id, google_id FROM main.Searchprofile WHERE google_id=%s'
        data = (key, )
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (searchprofile_id, google_id) = tuples[0]
            searchprofile = SearchProfile()
            searchprofile.set_id(searchprofile_id)
            searchprofile.set_google_fk(google_id)
            print("Suchprofil von der Datenbank im Mapper:", searchprofile)

            result = searchprofile
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, searchprofile):
        # Verbindugn zur DB + cursor-objekt erstellt
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(searchprofile_id) AS maxid FROM main.Searchprofile")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn eine ID vorhanden ist, zählen wir diese um 1 hoch"""
                searchprofile.set_id(maxid[0] + 1)

            else:
                """Wenn keine id vorhanden ist, beginnen wir mit der id 1"""
                searchprofile.set_id(1)

        command = "INSERT INTO main.Searchprofile (searchprofile_id, google_id) VALUES (%s, %s)"
        data = (searchprofile.get_id(), searchprofile.get_google_fk())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return searchprofile

    def update(self, searchprofile):
        """ Aktualisierung einer Suchprofil-Instanz"""
        cursor = self._connection.cursor()

        command = "UPDATE main.Searchprofile SET searchprofile_id=%s, google_id=%s"
        data = (searchprofile.get_id(), searchprofile.get_google_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, google_id):
        """ Löschen eines Datensatzes """
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.Searchprofile WHERE google_id=%s'
        data = [google_id.google_id]
        print(google_id)
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
