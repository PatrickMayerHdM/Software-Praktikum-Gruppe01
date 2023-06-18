from server.bo.InfoObject import InfoObject
from server.db.mapper import mapper

""" Mapper-Klasse des BOs Info-Objekt."""


class InfoObjectMapper(mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Auslesen aller Info-Objekte. """
        result = []
        cursor = self._connection.cursor()
        cursor.execute('SELECT * FROM main.InfoObject')
        tuples = cursor.fetchall()

        for (info_object_id, char_fk, profile_fk, value) in tuples:
            info_obj = InfoObject()
            info_obj.set_id(info_object_id)
            info_obj.set_char_fk(char_fk)
            info_obj.set_profile_fk(profile_fk)
            info_obj.set_value(value)
            result.append(info_obj)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = []

        """ Auslesen der Info-Objekte nach Key """

        cursor = self._connection.cursor()
        command = f"SELECT * FROM main.InfoObject WHERE (profile_id='{key}') AND (searchprofile_id IS NULL)"
        cursor.execute(command)
        tuples = cursor.fetchall()
        print('InfoObject Tuples aus DB:', tuples)

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

        print("Erzeugte Objekte aus Tuples: ", result)
        return result

    def insert(self, info_obj):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(infoobject_id) AS maxid FROM main.InfoObject")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                info_obj.set_id(maxid[0] + 1)

            else:
                info_obj.set_id(1)



        command = "INSERT INTO main.InfoObject (infoobject_id, char_id, char_value, profile_id) VALUES (%s, %s, %s, %s)"
        data = (info_obj.get_id(),
                info_obj.get_char_fk(),
                info_obj.get_value(),
                info_obj.get_profile_fk())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return info_obj

    def Searchinsert(self, info_obj):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(infoobject_id) AS maxid FROM main.InfoObject")
        tuples = cursor.fetchall()


        for (maxid) in tuples:
            if maxid[0] is not None:
                info_obj.set_id(maxid[0] + 1)

            else:
                info_obj.set_id(1)



        command = "INSERT INTO main.InfoObject (infoobject_id, char_id, char_value, profile_id, searchprofile_id) VALUES (%s, %s, %s, %s, %s)"
        data = (info_obj.get_id(),
                info_obj.get_char_fk(),
                info_obj.get_value(),
                info_obj.get_profile_fk(),
                info_obj.get_searchprofile_fk(),
                )

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return info_obj

    def update(self, info_obj):
        #print(type(info_obj))
        #print('Info Mapper value: ', info_obj.get_value())
        #print('Info Mapper profile_id:', info_obj.get_profile_fk())
        command = 'UPDATE main.InfoObject SET char_value=%s WHERE profile_id=%s AND char_id=%s'
        data = (info_obj.get_value(), info_obj.get_profile_fk(), info_obj.get_char_fk())

        with self._connection.cursor() as cursor:
            #print('Info Mapper command und data:', command, data)
            cursor.execute(command, data)

        self._connection.commit()

    def update_search(self, info_obj):
        print(type(info_obj))
        print('Info Mapper value: ', info_obj.get_value())
        print('Info Mapper searchprofile_id:', info_obj.get_searchprofile_id())

        command = 'UPDATE main.InfoObject SET char_value=%s WHERE searchprofile_id=%s AND char_id=%s'
        data = (info_obj.get_value(), info_obj.get_searchprofile_id(), info_obj.get_char_fk())

        with self._connection.cursor() as cursor:
            cursor.execute(command, data)

        self._connection.commit()

    def find_by_id(self, key):
        command = 'SELECT infoobject_id, char_id, char_value, profile_id FROM main.InfoObject WHERE profile_id = %s'
        data = (key,)

        with self._connection.cursor() as cursor:
            cursor.execute(command, data)
            tuples = cursor.fetchall()

        if tuples and tuples[0]:
            (infoobject_id, char_id, char_value, profile_id) = tuples[0]
            info_obj = InfoObject()
            info_obj.set_id(infoobject_id)
            info_obj.set_char_fk(char_id)
            info_obj.set_value(char_value)
            info_obj.set_profile_fk(profile_id)

            print("InfoObject Mapper: ", info_obj.get_profile_fk())
            return info_obj

        return None

    def find_by_searchid(self, key):
        command = 'SELECT * FROM main.InfoObject WHERE searchprofile_id = %s'
        data = (key,)

        with self._connection.cursor() as cursor:
            cursor.execute(command, data)
            tuples = cursor.fetchall()

        if tuples and tuples[0]:
            (infoobject_id, char_id, char_value, profile_id, searchprofile_id) = tuples[0]
            info_obj = InfoObject()
            info_obj.set_id(infoobject_id)
            info_obj.set_char_fk(char_id)
            info_obj.set_value(char_value)
            info_obj.set_profile_fk(profile_id)
            info_obj.set_searchprofile_id(searchprofile_id)
            return info_obj

        return None


    def delete(self, info_obj):
        print('InfoObjectMapper "google_id":', info_obj)
        print(type(info_obj))
        #print("Delete Info: ", google_id.profile_id)
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.InfoObject WHERE profile_id=%s'
        data = [info_obj.get_profile_fk()]
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete_searchprofile(self, searchprofile_id):

        cursor = self._connection.cursor()

        command = f"DELETE FROM main.InfoObject WHERE searchprofile_id='{searchprofile_id.searchprofile_id}'"
        cursor.execute(command)

        self._connection.commit()
        cursor.close()