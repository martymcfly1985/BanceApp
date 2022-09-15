using API.DataAccess;
using API.DataAccess.Models;
using API.Models.Tennis;
using API.Services.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace API.Repositories.Tennis
{
    public class CourtRepository : ICourtRepository
    {
        private string connectionString;

        public CourtRepository(IApplicationConfiguration config)
        {
            connectionString = config.ConnectionString;
        }

        public List<Location> GetLocations()
        {
            List<Location> locations = new List<Location>();
            
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("GetCourts", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    var currentLocationRecnum = 0;
                    Location location = new Location();
                    while (reader.Read())
                    {
                        var locationRecnumInDb = reader.GetInt32("L_Recnum");

                        if (LocationHasChanged(currentLocationRecnum, locationRecnumInDb))
                        {
                            if (NotInitialLoop(currentLocationRecnum))
                            {
                                locations.Add(location);
                            }    
                            location = new Location();
                            location.Courts = new List<Court>();
                            location.Address = reader.GetStringValueOrEmptyString("L_Address");
                            location.Hours = reader.GetStringValueOrEmptyString("L_Hours");
                            location.Name = reader.GetStringValueOrEmptyString("L_Name");
                            location.Recnum = locationRecnumInDb;
                            
                            currentLocationRecnum = locationRecnumInDb;
                        }

                        var court = new Court();
                        court.Recnum = reader.GetInt32("C_Recnum");
                        court.LocationRecnum = locationRecnumInDb;
                        court.Surface = reader.GetStringValueOrEmptyString("C_Surface");
                        court.Condition = reader.GetStringValueOrEmptyString("C_Condition");
                        court.Lights = reader.IsDBNull("C_Lights") ? false : reader.GetBoolean("C_Lights");
                        court.Name = reader.GetStringValueOrEmptyString("C_Name");

                        location.Courts.Add(court);
                    }
                    locations.Add(location);
                }
            }
            return locations;
        }

        private bool LocationHasChanged(int currentLocationRecnum, int locationRecnumInDb)
        {
            return currentLocationRecnum != locationRecnumInDb;
        }

        private bool NotInitialLoop(int currentLocationRecnum)
        {
            return currentLocationRecnum != 0;
        }
    }
}
