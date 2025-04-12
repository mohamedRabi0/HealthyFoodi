# scripts/send_email.py

import smtplib
import sys
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os


print("🐍 Python script is running ✅")
load_dotenv()
print("📁 Current Working Directory:", os.getcwd())
print("🧪 EMAIL_SENDER from .env:", os.getenv("EMAIL_SENDER"))
print("🧪 EMAIL_PASSWORD present?", bool(os.getenv("EMAIL_PASSWORD")))


def send_welcome_email(recipient_email, username):
    sender ="rabiwork7@gmail.com"
    password = "fznv eybn nuei wnyo"

    print(f"📨 Sending email to: {recipient_email}")
    print(f"👤 Username: {username}")
    print(f"📤 From: {sender}")
    print(f"🔐 Password found: {'Yes' if password else 'No'}")



    message = MIMEText(f"Hey {username}, welcome to HealthyFoodi! 🥗 You're all set.")
    message['Subject'] = 'Welcome to HealthyFoodi!'
    message['From'] = sender
    message['To'] = recipient_email

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(sender, password)
            smtp.sendmail(sender, recipient_email, message.as_string())
        print("✅ Email sent successfully!")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python send_email.py user@example.com username")
    else:
        send_welcome_email(sys.argv[1], sys.argv[2])

