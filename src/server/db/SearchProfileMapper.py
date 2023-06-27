from server.db.mapper import mapper
from server.bo.SearchProfile import SearchProfile
from server.bo.InfoObject import InfoObject

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

    def find_new(self):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(searchprofile_id) AS maxid FROM main.Searchprofile")
        searchprofile_id = cursor.fetchone()[0]

        return searchprofile_id

    def find_by_key(self, key):
        results = []

        cursor = self._connection.cursor()
        command = f'SELECT searchprofile_id, google_id FROM main.Searchprofile WHERE google_id=%s'
        data = (key, )
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        if tuples is not None:
            for row in tuples:
                searchprofile_id = row[0] # gibt nur die ID des SuchProfils zurück und nicht die gesamten Daten, aus der Datenbank
                results.append(searchprofile_id)

        self._connection.commit()
        cursor.close()

        return results

    def find_by_searchprofile(self, searchprofile):
        """ Auslesen eines Suchprofils anhand einer Suchprofil_id """
        result = []

        cursor = self._connection.cursor()
        command = f'SELECT * FROM main.InfoObject WHERE searchprofile_id=%s'
        data = (searchprofile, )
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        for (infoobject_id, char_id, char_value, profile_id, searchprofile_id) in tuples:
            info_obj = InfoObject()
            info_obj.set_id(infoobject_id)
            info_obj.set_char_fk(char_id)
            info_obj.set_value(char_value)
            info_obj.set_profile_fk(profile_id)
            info_obj.set_searchprofile_id(searchprofile_id)
            result.append(info_obj)

        self._connection.commit()
        cursor.close()

        return result

    def find_gid_by_searchid(self, searchid):
        """ Diese Methode gibt eine Google ID anhand der Suchprofil ID zurück. """
        cursor = self._connection.cursor()
        command = f"SELECT google_id FROM main.Searchprofile WHERE searchprofile_id='{searchid}'"
        cursor.execute(command)

        tuples = cursor.fetchone()

        if tuples[0] is not None:
            return tuples[0]


    def insert(self, searchprofile):
        """ Hinzufügen eines Suchprofils """

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

    def delete(self, searchprofile_id):
        """ Löschen eines Suchprofils """
        cursor = self._connection.cursor()

        command = f"DELETE FROM main.Searchprofile WHERE searchprofile_id='{searchprofile_id}'"
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
