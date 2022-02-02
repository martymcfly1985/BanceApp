using API.DataAccess;
using API.DataAccess.Models;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace API.Repositories.Campground
{
    public class CampgroundRepository : ICampgroundRepository
    {
        public CampgroundRepository()
        {

        }

        public List<Models.Campground.Campground> GetCampgrounds()
        {
            List<Models.Campground.Campground> campgrounds = new List<Models.Campground.Campground>();
            using (SqlConnection connection = new SqlConnection(Connection.ConnectionString))
            {
                SqlCommand command = new SqlCommand("GetCampgrounds", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    while (reader.Read())
                    {
                        var campground = new Models.Campground.Campground();
                        campground.DateVisited = reader.GetNullableDateTime("CG_DateVisited");
                        campground.Name = reader.GetString("CG_Name");
                        campground.Recnum = reader.GetInt32("CG_Recnum");
                        campground.Coordinates = reader.GetStringValueOrEmptyString("CG_Coordinates");
                        campgrounds.Add(campground);
                    }
                }
            }

            return campgrounds;
        }
    }
}
