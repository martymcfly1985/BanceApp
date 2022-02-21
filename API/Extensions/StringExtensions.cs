using System;

namespace API.Extensions
{
    public static class StringExtensions
    {
        public static DateTime? ToNullableDateTime(this string input)
        {
            if(input == "")
            {
                return null;
            }
            return DateTime.Parse(input);
        }
    }
}
