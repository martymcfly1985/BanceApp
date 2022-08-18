using API.DataAccess.Models;
using API.Models.Tennis;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechTalk.SpecFlow;

namespace Tests.TestDataManagers
{
    public class CourtDataManager
    {
        public void AddCourtInformation(List<Court> courtInformation)
        {
            using (SqlConnection connection = new SqlConnection(Connection.TestConnectionString))
            {
                SqlCommand command = new SqlCommand("INSERT INTO Court (C_LRecnum,C_Lights,C_Surface,C_Condition,C_Name) VALUES(" +
                    courtInformation[0].LocationRecnum + ",'" +
                    courtInformation[0].Lights + "','" +
                    courtInformation[0].Surface + "','" +
                    courtInformation[0].Condition + "','" +
                    courtInformation[0].Name + "')", connection);
                command.Connection.Open();
                command.ExecuteNonQuery();
            }
        }
    }
}
