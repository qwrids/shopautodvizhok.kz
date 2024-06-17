from email.message import EmailMessage
import ssl
import smtplib

EMAIL_SENDER = 'ansarkuanysh1221@gmail.com'

EMAIL_PASS = 'fziicuqlmuxcfwou'


def EmailSend(email_receiver,subject, body):
    em = EmailMessage()
    em['From'] = EMAIL_SENDER
    em['To'] = email_receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(EMAIL_SENDER, EMAIL_PASS)
        smtp.sendmail(EMAIL_SENDER, email_receiver, em.as_string())