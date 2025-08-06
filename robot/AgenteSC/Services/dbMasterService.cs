using FirebirdSql.Data.FirebirdClient;
using Dapper;
using System.Data;

namespace AgenteSC.Services
{
    public class dbMasterService : IDisposable
    {
        private readonly string _connectionString;
        private const string piso = "SELECT * FROM ";
        private bool disposed = false;

        public dbMasterService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IEnumerable<T> GetAll<T>() where T : class
        {
            using (var connection = new FbConnection(_connectionString))
            {
                return connection.Query<T>($"{piso} {typeof(T).Name}").ToList();
            }
        }

        public T GetById<T>(string keyColumn, object keyValue) where T : class
        {
            using (var connection = new FbConnection(_connectionString))
            {
                var query = $"{piso}  {typeof(T).Name} WHERE {keyColumn} = @KeyValue";
                return connection.QueryFirstOrDefault<T>(query, new { KeyValue = keyValue });
            }
        }

        public int GetNextId(string tableName, string keyColumn)
        {
            using (var connection = new FbConnection(_connectionString))
            {
                var query = $"SELECT COALESCE(MAX({keyColumn}), 0) + 1 FROM {tableName}";
                return connection.QuerySingle<int>(query);
            }
        }

        public int GetNextIdFromVarchar(string tableName, string keyColumn)
        {
            using (var connection = new FbConnection(_connectionString))
            {
                var query = $"SELECT COALESCE(MAX(CAST({keyColumn} AS INTEGER)), 0) + 1 FROM {tableName}";
                return connection.QuerySingle<int>(query);
            }
        }

        public IEnumerable<dynamic> ExecuteQuery(string query, Dictionary<string, object> parameters)
        {
            using (var connection = new FbConnection(_connectionString))
            {
                return connection.Query(query, parameters);
            }
        }

        public IEnumerable<T> GetByFilters<T>(Dictionary<string, object> filters) where T : class
        {
            using (var connection = new FbConnection(_connectionString))
            {
                string query = $"{piso}  {typeof(T).Name}";

                if (filters != null && filters.Any())
                {
                    var filterConditions = string.Join(" AND ", filters.Select(f => $"{f.Key} = @{f.Key}"));

                    query += $" WHERE {filterConditions}";
                }


                return connection.Query<T>(query, filters);
            }
        }

        public IEnumerable<dynamic> GetByFiltersDynamic<T>(Dictionary<string, object> filters) where T : class
        {
            using (var connection = new FbConnection(_connectionString))
            {
                string query = $"{piso}  {typeof(T).Name}";

                if (filters != null && filters.Any())
                {
                    var filterConditions = string.Join(" AND ", filters.Select(f => $"{f.Key} = @{f.Key}"));

                    query += $" WHERE {filterConditions}";
                }


                return connection.Query(query, filters);
            }
        }

        public IEnumerable<T> GetByFilters<T>(string baseQuery, Dictionary<string, object> filters, string orderBy = null)
        {
            using (var connection = new FbConnection(_connectionString))
            {
                // Construir la cláusula WHERE dinámica
                var whereClause = "";
                if (filters.Any())
                    whereClause = " WHERE " + string.Join(" AND ", filters.Keys.Select(k => $"{k} = @{k}"));


                // Construir la consulta completa con la cláusula WHERE y ORDER BY (si es proporcionado)
                var finalQuery = baseQuery + whereClause;

                if (!string.IsNullOrEmpty(orderBy))
                    finalQuery += " ORDER BY " + orderBy;

                // Ejecutar la consulta
                return connection.Query<T>(finalQuery, filters);
            }
        }

        public void Submit<T>(T entity, string tableName, Dictionary<string, object> primaryKeys) where T : class
        {
            try
            {
                using (var connection = new FbConnection(_connectionString))
                {

                    var keyConditions = string.Join(" AND ", primaryKeys.Select(pk => $"{pk.Key} = {pk.Value}"));
                    var existingEntity = connection.QueryFirstOrDefault<dynamic>($"{piso}  {tableName} WHERE {keyConditions}", primaryKeys);

                    if (existingEntity == null)
                    {
                        var insertQuery = GenerateInsertQuery(entity, tableName);
                        connection.Execute(insertQuery, entity, commandType: CommandType.Text);
                    }
                    else
                    {
                        var updateQuery = GenerateUpdateQuery(entity, tableName, primaryKeys);
                        connection.Execute(updateQuery, entity, commandType: CommandType.Text);
                    }
                }
            }
            catch (Exception ex)
            {
                //var errorMessage = $"Error: {ex.Message}\n"
                //+ $"StackTrace: {ex.StackTrace}\n"
                //+ $"Fecha: {DateTime.Now}\n"
                //+ $"Ubicación: {nameof(NOM.Services.dbMasterService.Submit)}---tabla:{tableName}\n"
                //+ $"------------------------------------------------------------------------------------------------------------------------";
                //Global.AppendTextToLog(errorMessage);
            }
        }

        private string GenerateInsertQuery<T>(T entity, string tableName)
        {
            var props = entity.GetType().GetProperties().Where(p => p.CanRead && !p.GetMethod.IsVirtual).ToList();
            var columns = string.Join(", ", props.Select(p => p.Name));
            var values = string.Join(", ", props.Select(p => "@" + p.Name));

            return $"INSERT INTO {tableName} ({columns}) VALUES ({values})";
        }

        private string GenerateUpdateQuery<T>(T entity, string tableName, Dictionary<string, object> primaryKeys)
        {
            var props = entity.GetType().GetProperties().Where(p => p.CanRead && !p.GetMethod.IsVirtual && !primaryKeys.ContainsKey(p.Name)).ToList();
            var setClause = string.Join(", ", props.Select(p => $"{p.Name} = @{p.Name}"));
            var whereClause = string.Join(" AND ", primaryKeys.Select(pk => $"{pk.Key} = @{pk.Key}"));

            return $"UPDATE {tableName} SET {setClause} WHERE {whereClause}";
        }

        public void Delete(string table, string keyColumn, object keyValue)
        {
            if (string.IsNullOrWhiteSpace(table) || string.IsNullOrWhiteSpace(keyColumn) || keyValue == null)
            {
                throw new ArgumentException("Table, keyColumn, and keyValue must be provided.");
            }

            using (var connection = new FbConnection(_connectionString))
            {
                try
                {
                    connection.Open();
                    var sql = $"DELETE FROM {table} WHERE {keyColumn} = @Id";
                    connection.Execute(sql, new { Id = keyValue });
                }
                catch (Exception ex)
                {
                    // Manejo de excepciones, por ejemplo, loguear el error
                    throw new InvalidOperationException("Error executing delete operation", ex);
                }
            }
        }

        public void Delete(string table, string cadena)
        {
            if (string.IsNullOrWhiteSpace(table))
            {
                throw new ArgumentException("Table, keyColumn, and keyValue must be provided.");
            }

            using (var connection = new FbConnection(cadena))
            {
                try
                {
                    connection.Open();
                    var sql = $"DELETE FROM {table}";
                    connection.Execute(sql);
                }
                catch (Exception ex)
                {
                    // Obtener información del error y su ubicación

                    throw new InvalidOperationException("Error executing delete operation", ex);
                }
            }
        }
        // Método para liberar recursos
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    // Libera recursos administrados si es necesario
                }

                // Libera recursos no administrados si es necesario
                disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // Destructor finalizador
        ~dbMasterService()
        {
            Dispose(false);
        }
    }
}
