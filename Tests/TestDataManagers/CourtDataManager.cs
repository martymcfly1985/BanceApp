using API.DataAccess.Models;
using API.Models.Tennis;
using API.Services.Tennis;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using Tests.DependencyInjection;

namespace Tests.TestDataManagers
{
    public class CourtDataManager : BaseDataManager
    {
        public ICourtService CourtService => ContainerFactory.Resolve<ICourtService>();

        public void AddCourtInformation(List<Court> courtInformation)
        {
            StringBuilder insertStatement = new StringBuilder();
            foreach (var court in courtInformation)
            {
                insertStatement.Append("INSERT INTO Court (C_LRecnum,C_Lights,C_Surface,C_Condition,C_Name) VALUES(" +
                    court.LocationRecnum + ",'" +
                    court.Lights + "','" +
                    court.Surface + "','" +
                    court.Condition + "','" +
                    court.Name + "'); ");
            }
            using (SqlConnection connection = new SqlConnection(Connection.TestConnectionString))
            {
                SqlCommand command = new SqlCommand(insertStatement.ToString(), connection);
                command.Connection.Open();
                command.ExecuteNonQuery();
            }
        }
    }
}
