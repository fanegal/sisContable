using System.Windows.Input;

namespace AgenteSC.Utils
{
    public class RelayCommand : ICommand
    {
        private readonly Action<object> _execute;
        private readonly Func<object, bool> _canExecute;

        public event EventHandler CanExecuteChanged;

        // 🔹 Constructor para métodos con parámetros
        public RelayCommand(Action<object> execute, Func<object, bool> canExecute = null)
        {
            _execute = execute ?? throw new ArgumentNullException(nameof(execute));
            _canExecute = canExecute;
        }

        // 🔹 Constructor para métodos sin parámetros
        public RelayCommand(Action execute, Func<bool> canExecute = null)
        {
            _execute = _ => execute(); // 🔹 Adaptar acción sin parámetros
            _canExecute = _ => canExecute == null || canExecute();
        }

        public bool CanExecute(object parameter) => _canExecute?.Invoke(parameter) ?? true;
        public void Execute(object parameter) => _execute(parameter);
        public void RaiseCanExecuteChanged() => CanExecuteChanged?.Invoke(this, EventArgs.Empty);
    }

}
