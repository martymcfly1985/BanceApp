﻿
using API.Models.Account;

namespace API.Repositories.Account
{
    public interface IUserRepository
    {
        User GetUserByUsername(string username);
        User GetUserByEmail(string email);
        void SaveNewUser(User newUser);
        void UpdateUser(User userInformation);
        void SaveVerificationCode(string email, int verificationCode);
        bool VerifyAccount(VerificationInformation verificationInformation);
        string CreateSessionRecnum(int recnum);
        User GetUserBySessionRecnum(string sessionRecnum);
    }
}