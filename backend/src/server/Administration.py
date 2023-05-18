from server.bo.Account import Account
from server.db.AccountMapper import AccountMapper
from server.bo.Message import Message
from server.db.MessageMapper import MessageMapper


class Administration(object):
    def __init__(self):
        pass

    """ Account-spezifische Methoden """
    def create_account(self, google_id, profile_id, name, email):
        account = Account()
        account.set_google_id(google_id)
        account.set_profile_id(profile_id)
        account.set_user_name(name)
        account.set_email(email)
        account.set_id(1)

        with AccountMapper() as mapper:
            return mapper.insert(account)

    def get_account_by_name(self, name):
        with AccountMapper() as mapper:
            return mapper.find_by_name(name)

    def get_account_by_id(self, number):
        with AccountMapper() as mapper:
            return mapper.find_by_key(number)

    def get_account_by_email(self, email):
        with AccountMapper() as mapper:
            return mapper.find_by_email(email)

    def get_account_by_google_id(self, id):
        with AccountMapper() as mapper:
            return mapper.find_by_google_id(id)

    def get_all_accounts(self):
        with AccountMapper() as mapper:
            return mapper.find_all()

    def save_account(self, account):
        with AccountMapper() as mapper:
            mapper.update(account)

    def delete_account(self, account):
        with AccountMapper() as mapper:
            mapper.delete(account)

    """Spezifische Methoden für message"""

    def addMessage(self, sender, recipient, content):
        """Objekt der Klasse Massage wird erstellt"""
        m = Message()

        """Objekt wird eine id zugewiesen. Zugriff auf BusinessObjekt"""
        m.set_id(1)

        """Objekt wird ein Sender, Empfänger und Kontent
         zugewiesen. Zugriff auf Message"""
        m.set_sender(sender)
        m.set_recipient(recipient)
        m.set_content(content)

        """Objekt wird mit insert-methode in DB eingebunden"""
        with MessageMapper() as mapper:
            return mapper.insert(m)

    def get_messages(self, message_id):
        with MessageMapper() as mapper:
            return mapper.find_by_key(message_id)

    def save_message(self, msg):
        with MessageMapper() as mapper:
            mapper.update(msg)

    def delete_message(self, message):
        """Hier wird "message" mit mapper aus DB gelöscht"""
        with MessageMapper() as mapper:
            mapper.delete(message)


    def get_all_messages(self):
        """Alle messages auslesen"""
        with MessageMapper() as mapper:
            return mapper.find_all()

    def get_message_by_sender_id(self, senderid):
        """messages anhand sender auslesen"""
        with MessageMapper() as mapper:
            return mapper.find_by_sender_id(senderid)

    def get_message_by_recipient_id(self, recipientid):
        """messages anhand recipient auslesen"""
        with MessageMapper() as mapper:
            return mapper.find_by_recipient(recipientid)

    def get_message_by_id(self, key):
        with MessageMapper() as mapper:
            return mapper.find_by_key(key)
