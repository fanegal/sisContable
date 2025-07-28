using System;
using System.Threading;
using System.Threading.Tasks;

namespace AgenteSC.Services
{
    public class BackgroundService
    {
        private readonly Logger _logger;
        private readonly ConfigManager _configManager;
        private Timer _timer;

        public event Action<string> LogUpdated;

        public BackgroundService(ConfigManager configManager, Logger logger)
        {
            _configManager = configManager;
            _logger = logger;
        }

        public void Start()
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(10));
        }

        private void DoWork(object state)
        {
            var config = _configManager.ReadConfig();
            if (config._origen != null &&
                !string.IsNullOrWhiteSpace(config._origen.NombreServidor) &&
                !string.IsNullOrWhiteSpace(config._origen.Usuario) &&
                !string.IsNullOrWhiteSpace(config._origen.Password))
            {
                _logger.Log("Iniciando descarga de información desde la API.");
                // Simulate API call
                Task.Delay(2000).Wait();
                _logger.Log("Información descargada correctamente.");
                LogUpdated?.Invoke(_logger.ReadLog());
            }
        }

        public void Stop()
        {
            _timer?.Change(Timeout.Infinite, 0);
        }
    }
}
