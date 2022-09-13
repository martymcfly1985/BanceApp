using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Services.Configuration
{
    public class ApplicationConfiguration : IApplicationConfiguration
    {
        public string ConnectionString { get; set; }

        public ApplicationConfiguration(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
    }
}
