using System;
using System.IO;

namespace AgenteSC.Services
{
    public class Logger
    {
        private readonly string _logDirectory = @"C:\rbContable";
        private readonly string _logFileName = $"historia{DateTime.Now:ddMMyy}.log";
        private readonly string _logFilePath;

        public Logger()
        {
            if (!Directory.Exists(_logDirectory))
            {
                Directory.CreateDirectory(_logDirectory);
            }
            _logFilePath = Path.Combine(_logDirectory, _logFileName);
        }

        public void Log(string message)
        {
            try
            {
                File.AppendAllText(_logFilePath, $"{DateTime.Now:G}: {message}{Environment.NewLine}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error writing to log file: {ex.Message}");
            }
        }

        public string ReadLog()
        {
            try
            {
                return File.ReadAllText(_logFilePath);
            }
            catch (Exception ex)
            {
                return $"Error reading log file: {ex.Message}";
            }
        }
    }
}
