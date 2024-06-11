using System.Net;
using System.Net.Mail;

namespace GotIt_back.Helpers
{
    public class MailSender
    {
        public static void SendMail(string emailTo, string subject, string message)
        {
            var MyConfig = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();

            // Konfiguracja adresu e-mail i hasła
            string smtpServer = MyConfig.GetValue<string>("MailSender:SmtpServer");
            int smtpPort = MyConfig.GetValue<int>("MailSender:SmtpPort");
            string emailFrom = MyConfig.GetValue<string>("MailSender:BasedEmail");
            string emailPassword = MyConfig.GetValue<string>("MailSender:BasedEmailPassword");

            // Utworzenie wiadomości e-mail
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(emailFrom);
            mail.To.Add(emailTo);
            mail.Subject = subject;
            mail.Body = message;

            // Konfiguracja klienta SMTP
            SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort);
            smtpClient.Credentials = new NetworkCredential(emailFrom, emailPassword);
            smtpClient.EnableSsl = true; // Użycie SSL/TLS dla bezpieczeństwa

            try
            {
                // Wysyłanie wiadomości e-mail
                smtpClient.Send(mail);
                Console.WriteLine("Email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending email: " + ex.Message);
            }
        }
    }
}
