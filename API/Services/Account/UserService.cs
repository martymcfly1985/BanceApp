using API.Models.Account;
using API.Repositories.Account;
using System;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;

namespace API.Services.Account
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public bool IsUsernameUnique(string username)
        {
            if (userRepository.GetUserByUsername(username) != null)
            {
                return false;
            }
            return true;
        }

        public bool IsEmailUnique(string email)
        {
            if (userRepository.GetUserByEmail(email) != null)
            {
                return false;
            }
            return true;
        }

        public void SaveNewUser(User user)
        {
            string hashedPassword = HashPassword(user.Password);
            user.Password = hashedPassword;
            userRepository.SaveNewUser(user);
        }

        public void SendVerificationEmail(string email)
        {
            Random random = new Random();
            int verificationCode = random.Next(100000, 1000000);

            using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587)) 
            { 
                smtpClient.Credentials = new System.Net.NetworkCredential("banceapp@gmail.com", "papvbkrapxwmwoyk");
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.EnableSsl = true;
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress("banceapp@gmail.com", "BanceApp");
                    mail.To.Add(new MailAddress(email));
                    mail.Subject = "BanceApp Verification Code";
                    mail.IsBodyHtml = true;
                    mail.Body =
                        @"<html>
                            <body style='max-width: 700px;display: table;margin: auto;border-style: solid;'>
                                <h1 style='text-align:center'>Welcome to BanceApp!</h1>
                                <h3 style='text-align:center'>Thank you so much for signing up!</h3>
                                <p style='text-align:center'><strong>Please use the following verification code to confirm your email account:&nbsp;</strong></p>
                                <p>&nbsp;</p><h2 style='text-align:center'>" + verificationCode + @"</h2><p>&nbsp;</p><hr />
                                <p style='padding-left:10px;padding-right:10px'><span style='font-size:11px'>Verifying your email address helps us communicate with you if something were to happen to your account, and make it easier to recover your account if you cannot access it.&nbsp;</span></p>
                                <p style='padding-left:10px;padding-right:10px'><span style='font-size:11px'>For more information, you can contact us at <a href='mailto:fakeemail@banceapp.com'>fakeemail@banceapp.com</a></span></p>
                                <p>&nbsp;</p>
                                <p style='padding-left:10px;padding-right:10px'>Thank you again for signing up,</p>
                                <p style='padding-left:10px;padding-right:10px'>The BanceApp Team&nbsp;🎾</p>
                            </body>
                        </html>";
                    smtpClient.Send(mail);
                } 
            }
            userRepository.SaveVerificationCode(email, verificationCode);
        }

        public User GetUserInformation(SignInInfo signInInfo)
        {
            User userData = userRepository.GetUserByUsername(signInInfo.Username);
            if (userData == null || userData.Password != HashPassword(signInInfo.Password))
            {
                return null;
            } 
            else 
            {
                userData.Password = "";
                return userData;
            }
        }

        private string HashPassword(string password)
        {
            // Create a SHA256
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                // Convert byte array to a string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i<bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
