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
        """ Auslesen der Info-Objekte nach Key """
        result = []
        cursor = self._connection.cursor()
        command = f"SELECT * FROM main.InfoObject WHERE (profile_id='{key}') AND (searchprofile_id IS NULL)"
        cursor.execute(command)
        tuples = cursor.fetchall()
        #print('InfoObject Tuples aus DB:', tuples)

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

        #print("Erzeugte Objekte aus Tuples: ", result)
        return result

    def insert(self, info_obj):
        """ Hinzufügen eines Info-Objekts. """
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

    def insert_named_info(self, named_info_obj):
        """ Hinzufügen eines Named_info_obj. """
        cursor = self._connection.cursor()
        query = "SELECT COUNT(*) FROM main.InfoObject WHERE profile_id = %s AND char_value = %s"
        cursor.execute(query, (named_info_obj.get_named_profile_fk(), named_info_obj.get_named_info_name()))
        result = cursor.fetchone()
        count = result[0]

        if count > 0:
            cursor.close()
            return named_info_obj

        cursor.execute("SELECT MAX(infoobject_id) AS maxid FROM main.InfoObject")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                named_info_obj.set_id(maxid[0] + 1)

            else:
                named_info_obj.set_id(1)



        command = "INSERT INTO main.InfoObject (infoobject_id, char_id, char_value, profile_id, searchprofile_id) VALUES (%s, %s, %s, %s, %s)"
        data = (named_info_obj.get_id(),
                named_info_obj.get_named_char_id(),
                named_info_obj.get_named_info_name(),
                named_info_obj.get_named_profile_fk(),
                named_info_obj.get_searchprofile_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return named_info_obj

    def delete_by_char_value(self, char_value):
        cursor = self._connection.cursor()

        command = f"DELETE FROM main.InfoObject WHERE char_value='{char_value}'"
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def Searchinsert(self, info_obj):
        """ Hinzufügen der Werte in ein Info-Objekte für ein Suchprofil. """
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
        """ Update eines Profils mit Info-Objekten. """
        command = 'UPDATE main.InfoObject SET char_value=%s WHERE profile_id=%s AND char_id=%s'
        data = (info_obj.get_value(), info_obj.get_profile_fk(), info_obj.get_char_fk())

        with self._connection.cursor() as cursor:
            #print('Info Mapper command und data:', command, data)
            cursor.execute(command, data)

        self._connection.commit()

    def named_update(self, info_obj):
        """ Update eines Profils mit Info-Objekten. """
        command = 'UPDATE main.InfoObject SET char_value=%s WHERE profile_id=%s AND char_id=%s'
        data = (info_obj.get_named_info_name(), info_obj.get_named_profile_fk(), info_obj.get_named_char_id())

        with self._connection.cursor() as cursor:
            #print('Info Mapper command und data:', command, data)
            cursor.execute(command, data)

        self._connection.commit()

    def update_search(self, info_obj):
        """ Update eines Suchprofils mit Info-Objekten. """
        command = 'UPDATE main.InfoObject SET char_value=%s WHERE searchprofile_id=%s AND char_id=%s'
        data = (info_obj.get_value(), info_obj.get_searchprofile_id(), info_obj.get_char_fk())

        with self._connection.cursor() as cursor:
            cursor.execute(command, data)

        self._connection.commit()

    def find_by_id(self, key):
        """ Auslesen von Info-Objekten anhand einer Profil_id. """
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

    def find_all_info_objects_by_char_id(self, key):

        result = []
        cursor = self._connection.cursor()
        command = f"SELECT infoobject_id, char_id, char_value FROM main.InfoObject WHERE char_id='{key}'"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (infoobject_id, char_id, char_value) in tuples:
            infoobj = InfoObject()
            infoobj.set_id(infoobject_id)
            infoobj.set_char_fk(char_id)
            infoobj.set_value(char_value)
            result.append(infoobj)

        self._connection.commit()
        cursor.close()

        print("Liste aus Mapper mit InfoObjects: ", result)
        return result

    def find_by_searchid(self, key):
        """ Auslesen von Info-Objekten anhand einer Suchprofil_id. """
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

    def find_all_by_searchid(self, searchid):
        """ Auslesen aller Info-Objekte anhand der Suchprofil-ID. """
        result = []
        cursor = self._connection.cursor()
        cursor.execute(f"SELECT * FROM main.InfoObject WHERE searchprofile_id='{searchid}'")
        tuples = cursor.fetchall()

        for (info_object_id, char_id, char_value, profile_id, searchprofile_id) in tuples:
            info_obj = InfoObject()
            info_obj.set_id(info_object_id)
            info_obj.set_char_fk(char_id)
            info_obj.set_value(char_value)
            info_obj.set_profile_fk(profile_id)
            info_obj.set_searchprofile_id(searchprofile_id)

            result.append(info_obj)

        self._connection.commit()
        cursor.close()

        return result

    def find_info_obj_by_value_and_search_id(self, value, searchid):
        """ Löschen von einem Info-Obj-Tag aus dem Suchprofil """
        cursor = self._connection.cursor()

        command = f"DELETE FROM main.InfoObject WHERE char_value='{value}' AND searchprofile_id='{searchid}'"
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def delete(self, info_obj):
        """ Löschen von Info-Objekten anhand einer Profil_id. """
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.InfoObject WHERE profile_id=%s'
        data = [info_obj.get_profile_fk()]
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete_searchprofile(self, searchprofile_id):
        """ Löschen von Info-Objekten anhand einer Suchprofil_id. """
        cursor = self._connection.cursor()

        command = f"DELETE FROM main.InfoObject WHERE searchprofile_id='{searchprofile_id}'"
        cursor.execute(command)

        self._connection.commit()
        cursor.close()