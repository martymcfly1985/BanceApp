using API.Repositories.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Services.User
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
    }
}
