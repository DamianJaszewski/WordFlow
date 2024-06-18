
using Microsoft.AspNetCore.Identity.UI.Services;
using System.Net;
using System.Net.Mail;

namespace GotIt_back.Services
{
    public class EmailSender : IEmailSender
    {
        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
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
            mail.To.Add(email);
            mail.Subject = subject;
            mail.Body = htmlMessage;

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
