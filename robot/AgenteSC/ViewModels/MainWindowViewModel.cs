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
        private string _errorMessageDestino;

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
        public ICommand GuardarCommand { get; }
        public ICommand BuscarBDCommand { get; }
        public MainWindowViewModel()
        {
            _file = new ConfigManager();
            _file.EnsureConfigExistsAndLoad();

            GuardarCommand = new RelayCommand(Guardar, CanGuardar);
            BuscarBDCommand = new RelayCommand(BuscarBD);
        }

        private void BuscarBD()
        {
            var openFileDialog = new OpenFileDialog { Filter = "bases de datos de Firebird (*.fdb)|*.fdb" };
            if (openFileDialog.ShowDialog() == true)
                UbicacionBD = openFileDialog.FileName;
        }

        private bool CanGuardar()
        {
            ValidaPropiedadesDestino();
            return string.IsNullOrEmpty(ErrorMessageDestino);
        }

        private void Guardar()
        {
            

        }

        private void ValidaPropiedadesDestino()
        {
            ErrorMessageDestino = string.Empty; // Clear previous errors

            if (string.IsNullOrEmpty(UsuarioBD?.Trim()))
            {
                ErrorMessageDestino = "El campo 'Usuario' no puede estar vacío.";
                return;
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected void OnPropertyChanged([CallerMemberName] string propertyName = null) =>
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
