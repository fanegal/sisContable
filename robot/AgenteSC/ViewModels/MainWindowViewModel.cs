using AgenteSC.Services;
using AgenteSC.Utils;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace AgenteSC.ViewModels
{
    public class MainWindowViewModel : INotifyPropertyChanged
    {
        private ConfigManager _file;
        private readonly ApiService _apiService;
        private string _errorMessageDestino;
        private string _errorMessageOrigen;

        private string _nombreEnte;
        public string NombreEnte
        {
            get => _nombreEnte;
            set { _nombreEnte = value; OnPropertyChanged(); }
        }

        private string _usuarioBD;
        public string UsuarioBD
        {
            get => _usuarioBD;
            set { _usuarioBD = value; OnPropertyChanged(); }
        }

        private string _ubicacionBD;
        public string UbicacionBD
        {
            get => _ubicacionBD;
            set { _ubicacionBD = value; OnPropertyChanged(); }
        }
        public string ErrorMessageDestino
        {
            get => _errorMessageDestino;
            set { _errorMessageDestino = value; OnPropertyChanged(); }
        }
        public string ErrorMessageOrigen
        {
            get => _errorMessageOrigen;
            set { _errorMessageOrigen = value; OnPropertyChanged(); }
        }
        public ICommand GuardarCommand { get; }
        public ICommand BuscarBDCommand { get; }
        public ICommand RegistrarCommand { get; }
        public ICommand TestCommand { get; }

        private string _nombreServidor;
        public string NombreServidor
        {
            get => _nombreServidor;
            set { _nombreServidor = value; OnPropertyChanged(); }
        }

        private string _usuarioOrigen;
        public string UsuarioOrigen
        {
            get => _usuarioOrigen;
            set { _usuarioOrigen = value; OnPropertyChanged(); }
        }

        private string _passwordOrigen;
        public string PasswordOrigen
        {
            get => _passwordOrigen;
            set { _passwordOrigen = value; OnPropertyChanged(); }
        }

        private string _log;
        public string Log
        {
            get => _log;
            set { _log = value; OnPropertyChanged(); }
        }

        private readonly BackgroundService _backgroundService;
        private readonly Logger _logger;

        public MainWindowViewModel()
        {
            _file = new ConfigManager();
            _apiService = new ApiService();
            var config = _file.EnsureConfigExistsAndLoad();

            NombreEnte = config._destino.NombreEnte;
            UsuarioBD = config._destino.UsuarioBD;
            UbicacionBD = config._destino.UbicacionBD;

            NombreServidor = config._origen.NombreServidor;
            UsuarioOrigen = config._origen.Usuario;
            PasswordOrigen = config._origen.Password;
            Log = config._origen.Log;

            GuardarCommand = new RelayCommand(Guardar, CanGuardar);
            BuscarBDCommand = new RelayCommand(BuscarBD);
            RegistrarCommand = new RelayCommand(Registrar);
            TestCommand = new RelayCommand(TestConnection);

            _logger = new Logger();
            Log = _logger.ReadLog();
            _backgroundService = new BackgroundService(_file, _logger);
            _backgroundService.LogUpdated += (logContent) =>
            {
                Log = logContent;
            };
            _backgroundService.Start();
        }

        private async void TestConnection()
        {
            if (string.IsNullOrEmpty(NombreServidor) || string.IsNullOrEmpty(UsuarioOrigen) || string.IsNullOrEmpty(PasswordOrigen))
            {
                ErrorMessageOrigen = "Por favor, complete todos los campos.";
                return;
            }

            ErrorMessageOrigen = "Probando conexión...";
            bool success = await _apiService.TestConnection(NombreServidor, UsuarioOrigen, PasswordOrigen);
            ErrorMessageOrigen = success ? "Conexión exitosa." : "Error de conexión.";
        }

        private void BuscarBD()
        {
            var openFileDialog = new OpenFileDialog { Filter = "bases de datos de Firebird (*.fdb)|*.fdb" };
            if (openFileDialog.ShowDialog() == true)
                UbicacionBD = openFileDialog.FileName;
        }

        private bool CanGuardar()
        {
            return true;
        }

        private void Guardar()
        {
            ValidaPropiedadesDestino();
            if (!string.IsNullOrEmpty(ErrorMessageDestino))
            {
                return;
            }

            var config = _file.ReadConfig();
            config._destino.NombreEnte = NombreEnte;
            config._destino.UsuarioBD = UsuarioBD;
            config._destino.UbicacionBD = UbicacionBD;
            _file.WriteConfig(config);
        }

        private void ValidaPropiedadesDestino()
        {
            ErrorMessageDestino = string.Empty; // Clear previous errors

            if (string.IsNullOrEmpty(NombreEnte?.Trim()))
            {
                ErrorMessageDestino = "El campo 'Nombre del Ente' no puede estar vacío.";
                return;
            }
            if (string.IsNullOrEmpty(UsuarioBD?.Trim()))
            {
                ErrorMessageDestino = "El campo 'Usuario de la BD' no puede estar vacío.";
                return;
            }
            if (string.IsNullOrEmpty(UbicacionBD?.Trim()))
            {
                ErrorMessageDestino = "El campo 'Ubicación de la BD' no puede estar vacío.";
                return;
            }
        }

        private void Registrar()
        {
            var config = _file.ReadConfig();
            config._origen.NombreServidor = NombreServidor;
            config._origen.Usuario = UsuarioOrigen;
            config._origen.Password = PasswordOrigen;
            config._origen.Log = Log;
            _file.WriteConfig(config);

            ConsultarApi();
        }

        private void ConsultarApi()
        {
            _logger.Log($"Se utilizará la URL '{NombreServidor}' para futuras peticiones a la API.");
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected void OnPropertyChanged([CallerMemberName] string propertyName = null) =>
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
