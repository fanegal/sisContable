using AgenteSC.Models;
using System;
using System.IO;
using System.Text.Json;

namespace AgenteSC.Services
{

    public class ConfigManager
    {
        private const string ConfigFileName = "config.json";
        private readonly string _configFilePath;

        public ConfigManager()
        {
            _configFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, ConfigFileName);
        }

        /// <summary>
        /// Asegura que el archivo de configuración exista. Si no existe, lo crea con la configuración por defecto.
        /// </summary>
        /// <returns>La configuración actual (leída del archivo o la recién creada).</returns>
        public ConfigJson EnsureConfigExistsAndLoad()
        {
            if (!File.Exists(_configFilePath))
            {
                CreateDefaultConfig();
            }
            return ReadConfig();
        }

        /// <summary>
        /// Crea un archivo config.json con la configuración por defecto.
        /// </summary>
        private void CreateDefaultConfig()
        {
            ConfigJson defaultConfig = new ConfigJson();
            WriteConfig(defaultConfig);
            Console.WriteLine($"[ConfigManager] Archivo '{ConfigFileName}' creado con configuración por defecto.");
            // Podrías usar un Logger o un MessageBox si estás en un contexto UI
        }

        /// <summary>
        /// Lee el archivo config.json y lo deserializa a un objeto AppConfig.
        /// </summary>
        /// <returns>El objeto AppConfig con la configuración leída, o una nueva instancia si hay un error.</returns>
        public ConfigJson ReadConfig()
        {
            try
            {
                string jsonString = File.ReadAllText(_configFilePath);
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    ReadCommentHandling = JsonCommentHandling.Skip
                };
                return JsonSerializer.Deserialize<ConfigJson>(jsonString, options) ?? new ConfigJson();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ConfigManager] Error al leer el archivo de configuración: {ex.Message}");
                // En una app WPF, podrías lanzar una excepción o mostrar un MessageBox
                // throw new InvalidOperationException("No se pudo leer la configuración.", ex);
                return new ConfigJson(); // Retorna una configuración por defecto en caso de error
            }
        }

        /// <summary>
        /// Escribe un objeto AppConfig en el archivo config.json.
        /// </summary>
        /// <param name="config">El objeto AppConfig a serializar y guardar.</param>
        public void WriteConfig(ConfigJson config)
        {
            try
            {
                var options = new JsonSerializerOptions { WriteIndented = true };
                string jsonString = JsonSerializer.Serialize(config, options);
                File.WriteAllText(_configFilePath, jsonString);
                Console.WriteLine($"[ConfigManager] Configuración guardada en '{ConfigFileName}'.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ConfigManager] Error al escribir el archivo de configuración: {ex.Message}");
                // En una app WPF, podrías lanzar una excepción o mostrar un MessageBox
                // throw new InvalidOperationException("No se pudo guardar la configuración.", ex);
            }
        }
    }
}
