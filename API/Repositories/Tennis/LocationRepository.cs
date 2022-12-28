using API.DataAccess;
using API.Models.Tennis;
using API.Services.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace API.Repositories.Tennis
{
    public class LocationRepository : ILocationRepository
    {
        private string connectionString;

        public LocationRepository(IApplicationConfiguration config)
        {
            connectionString = config.ConnectionString;
        }

        public Location GetLocationByName(string locationName)
        {
            Location location = new Location();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("GetLocationByName", connection);
                command.Parameters.Add("@Name", SqlDbType.VarChar).Value = locationName;
                command.CommandType = CommandType.StoredProcedure;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    
                    var initialLoop = true;
                    while (reader.Read())
                    {
                        var locationRecnumInDb = reader.GetInt32("L_Recnum");

                        if(initialLoop)
                        {
                            GetLocationDataFromDb(location, reader);
                            initialLoop = false;
                        }

                        AddCourtFromDbToLocation(location, reader);
                    }
                }
            }
            return location;
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
                    var locationTableEmpty = true;
                    while (reader.Read())
                    {
                        locationTableEmpty = false;
                        var locationRecnumInDb = reader.GetInt32("L_Recnum");

                        if (LocationHasChanged(currentLocationRecnum, locationRecnumInDb))
                        {
                            if (NotInitialLoop(currentLocationRecnum))
                            {
                                locations.Add(location);
                            }
                            location = new Location();
                            GetLocationDataFromDb(location, reader);

                            currentLocationRecnum = locationRecnumInDb;
                        }

                        AddCourtFromDbToLocation(location, reader); 
                    }
                    if (!locationTableEmpty)
                    {
                        locations.Add(location);
                    }
                }
            }
            return locations;
        }

        public int SaveLocation(Location location)
        {
            var locationRecnumInDb = 0;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SaveLocation", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@Name", SqlDbType.VarChar).Value = location.Name;
                command.Parameters.Add("@Address", SqlDbType.VarChar).Value = location.Address;
                command.Parameters.Add("@Hours", SqlDbType.VarChar).Value = location.Hours;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    while (reader.Read())
                    {
                        locationRecnumInDb = reader.GetInt32("recnum");
                    }
                }
            }
            return locationRecnumInDb;
        }

        private bool LocationHasChanged(int currentLocationRecnum, int locationRecnumInDb)
        {
            return currentLocationRecnum != locationRecnumInDb;
        }

        private bool NotInitialLoop(int currentLocationRecnum)
        {
            return currentLocationRecnum != 0;
        }

        private int? GetIntOrNull(EnhancedSqlDataReader reader)
        {
            if (reader.IsDBNull("C_Condition"))
            {
                return null;
            }

            return reader.GetInt32("C_Condition");
        }

        private void GetLocationDataFromDb(Location location, EnhancedSqlDataReader reader)
        {
            location.Courts = new List<Court>();
            location.Address = reader.GetStringValueOrEmptyString("L_Address");
            location.Hours = reader.GetStringValueOrEmptyString("L_Hours");
            location.Name = reader.GetStringValueOrEmptyString("L_Name");
            location.Recnum = reader.GetInt32("L_Recnum");
        }

        private void AddCourtFromDbToLocation(Location location, EnhancedSqlDataReader reader)
        {
            var court = new Court();
            court.Recnum = reader.GetInt32("C_Recnum");
            court.LocationRecnum = reader.GetInt32("L_Recnum");
            court.Surface = reader.GetStringValueOrEmptyString("C_Surface");
            court.Condition = GetIntOrNull(reader);
            court.Lights = reader.IsDBNull("C_Lights") ? false : reader.GetBoolean("C_Lights");
            court.Name = reader.GetStringValueOrEmptyString("C_Name");

            location.Courts.Add(court);
        }
    }
}
