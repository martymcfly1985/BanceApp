using API.DataAccess;
using API.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tests.DependencyInjection;

namespace Tests.TestDataManagers
{
    public class BaseDataManager
    {
        protected readonly ContainerFactory ContainerFactory = new ContainerFactory();
        public BaseDataManager()
        {
            ContainerFactory.RegisterComponents();
        }

        public void ResetDatabase()
        {
            foreach (var table in BuildTruncateTablesList())
            {
                using (SqlConnection connection = new SqlConnection(Connection.TestConnectionString))
                {

                    SqlCommand command = new SqlCommand($"EXEC('TRUNCATE TABLE[{table}]')", connection);
                    command.Connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        private List<string> BuildTruncateTablesList()
        {
            var listOfTablesToTruncate = new List<string>();

            using (SqlConnection connection = new SqlConnection(Connection.TestConnectionString))
            {
                SqlCommand command = new SqlCommand("SELECT DISTINCT t.name AS TableName FROM sys.tables t"
                                                    + " INNER JOIN sys.indexes i ON t.OBJECT_ID = i.object_id"
                                                    + " INNER JOIN sys.partitions p ON i.object_id = p.OBJECT_ID AND i.index_id = p.index_id"
                                                    + " WHERE p.rows > 0 AND t.name NOT IN ('tableThatShouldntBeTruncated')", connection);
                command.Connection.Open();

                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    while (reader.Read())
                    {
                        // This is ugly and should be cleaned up but I did various styles of retrieving data to show you the different ways you could do it.
                        var tableName = reader.GetStringValueOrEmptyString("TableName");
                        listOfTablesToTruncate.Add(tableName);
                    }
                }
            }

            return listOfTablesToTruncate;
        }
    }
}
