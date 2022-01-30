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
            using (SqlConnection connection = new SqlConnection("Data Source=localhost; Initial Catalog=Bance; User ID=BanceAppUser; Password=banceappuser123"))
            {
                SqlCommand command = new SqlCommand("GetCampgrounds", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Connection.Open();
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var campground = new Models.Campground.Campground();
                        campground.DateVisited = reader.IsDBNull(reader.GetOrdinal("CG_DateVisited")) ? (System.DateTime?)null : reader.GetDateTime(reader.GetOrdinal("CG_DateVisited"));
                        campground.Name = reader["CG_Name"].ToString();
                        campground.Recnum = (int)reader["CG_Recnum"];
                        campground.Name = reader.IsDBNull(reader.GetOrdinal("CG_Coordinates")) ? "" : reader["CG_Coordinates"].ToString();
                        campgrounds.Add(campground);
                    }
                }
            }

            return campgrounds;
        }
    }
}
