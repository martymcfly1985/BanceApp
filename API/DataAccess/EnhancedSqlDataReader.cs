using System;
using System.Data;

namespace API.DataAccess
{
    public sealed class EnhancedSqlDataReader : IDataReader
    {
        private readonly IDataReader dataReader;

        public EnhancedSqlDataReader(IDataReader dataReader)
        {
            this.dataReader = dataReader;
        }

        public object this[int i] => dataReader[i];

        public object this[string name] => dataReader[name];

        public int Depth => dataReader.Depth;

        public bool IsClosed => dataReader.IsClosed;

        public int RecordsAffected => dataReader.RecordsAffected;

        public int FieldCount => dataReader.FieldCount;

        public void Close()
        {
            dataReader.Close();
        }

        public void Dispose()
        {
            dataReader.Dispose();
        }

        public bool GetBoolean(int i)
        {
            return dataReader.GetBoolean(i);
        }

        public byte GetByte(int i)
        {
            return dataReader.GetByte(i);
        }

        public long GetBytes(int i, long fieldOffset, byte[] buffer, int bufferoffset, int length)
        {
            return dataReader.GetBytes(i, fieldOffset, buffer, bufferoffset, length);
        }

        public char GetChar(int i)
        {
            return dataReader.GetChar(i);
        }

        public long GetChars(int i, long fieldoffset, char[] buffer, int bufferoffset, int length)
        {
            return dataReader.GetChars(i, fieldoffset, buffer, bufferoffset, length);
        }

        public IDataReader GetData(int i)
        {
            return dataReader.GetData(i);
        }

        public string GetDataTypeName(int i)
        {
            return dataReader.GetDataTypeName(i);
        }

        public DateTime GetDateTime(int i)
        {
            return dataReader.GetDateTime(i);
        }

        public decimal GetDecimal(int i)
        {
            return dataReader.GetDecimal(i);
        }

        public double GetDouble(int i)
        {
            return dataReader.GetDouble(i);
        }

        public Type GetFieldType(int i)
        {
            return dataReader.GetFieldType(i);
        }

        public float GetFloat(int i)
        {
            return dataReader.GetFloat(i);
        }

        public Guid GetGuid(int i)
        {
            return dataReader.GetGuid(i);
        }

        public short GetInt16(int i)
        {
            return dataReader.GetInt16(i);
        }

        public int GetInt32(int i)
        {
            return dataReader.GetInt32(i);
        }

        public long GetInt64(int i)
        {
            return dataReader.GetInt64(i);
        }

        public string GetName(int i)
        {
            return dataReader.GetName(i);
        }

        public int GetOrdinal(string name)
        {
            return dataReader.GetOrdinal(name);
        }

        public DataTable GetSchemaTable()
        {
            return dataReader.GetSchemaTable();
        }

        public string GetString(int i)
        {
            return dataReader.GetString(i);
        }

        public object GetValue(int i)
        {
            return dataReader.GetValue(i);
        }

        public int GetValues(object[] values)
        {
            return dataReader.GetValues(values);
        }

        public bool IsDBNull(int i)
        {
            return dataReader.IsDBNull(i);
        }

        public bool GetBoolean(string name)
        {
            return dataReader.GetBoolean(dataReader.GetOrdinal(name));
        }

        public byte GetByte(string name)
        {
            return dataReader.GetByte(dataReader.GetOrdinal(name));
        }

        public DateTime GetDateTime(string name)
        {
            return dataReader.GetDateTime(dataReader.GetOrdinal(name));
        }

        public DateTime? GetNullableDateTime(string name)
        {
            return dataReader.IsDBNull(dataReader.GetOrdinal(name)) ? (DateTime?)null : dataReader.GetDateTime(dataReader.GetOrdinal(name));
        }

        public decimal GetDecimal(string name)
        {
            return dataReader.GetDecimal(dataReader.GetOrdinal(name));
        }

        public double GetDouble(string name)
        {
            return dataReader.GetDouble(dataReader.GetOrdinal(name));
        }

        public float GetFloat(string name)
        {
            return dataReader.GetFloat(dataReader.GetOrdinal(name));
        }

        public Guid GetGuid(string name)
        {
            return GetGuid(dataReader.GetOrdinal(name));
        }

        public short GetInt16(string name)
        {
            return dataReader.GetInt16(dataReader.GetOrdinal(name));
        }

        public int GetInt32(string name)
        {
            return dataReader.GetInt32(dataReader.GetOrdinal(name));
        }

        public long GetInt64(string name)
        {
            return dataReader.GetInt64(dataReader.GetOrdinal(name));
        }

        public string GetString(string name)
        {
            return dataReader.GetString(dataReader.GetOrdinal(name));
        }

        public string GetStringValueOrEmptyString(string name)
        {
            return !IsDBNull(name) ? GetString(name) : string.Empty;
        }

        public bool IsDBNull(string name)
        {
            return dataReader.IsDBNull(GetOrdinal(name));
        }

        public bool NextResult()
        {
            return dataReader.NextResult();
        }

        public bool Read()
        {
            return dataReader.Read();
        }
    }
}
