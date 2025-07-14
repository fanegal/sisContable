using MahApps.Metro.Controls;
using Hardcodet.Wpf.TaskbarNotification;
using System.Windows;
using System.Windows.Controls;

namespace Agente
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : MetroWindow

    {
        public MainWindow()
        {
            InitializeComponent();
            this.Closing += MainWindow_Closing; // Handle window closing
            MyTaskbarIcon.Visibility = Visibility.Visible; // Make the icon visible

            int currentYear = DateTime.Now.Year; // Obtiene el año actual
            for (int i = 0; i < 4; i++) // Genera los últimos 4 años
            {
                int year = currentYear - i; 
                cboEjercicio.Items.Add(new ComboBoxItem { Content = year.ToString(), Tag = year});
            }

            cboEjercicio.SelectedIndex = 0;
        }
        private void MainWindow_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (MessageBox.Show("Deseas cerrar la aplicación?", "Confirmar Salir", MessageBoxButton.YesNo) == MessageBoxResult.No)
            {
                e.Cancel = true; // Prevent window from closing
                MyTaskbarIcon.Visibility = Visibility.Visible; //Ensure icon is visible if not closing
            }
            else
            {
                MyTaskbarIcon.Dispose(); //Dispose of the icon when the window is closing
            }
        }

        private void Show_Click(object sender, RoutedEventArgs e)
        {
            this.Show();
            this.WindowState = WindowState.Normal;
        }

        private void Hide_Click(object sender, RoutedEventArgs e)
        {
            this.WindowState = WindowState.Minimized;
            this.Hide();
        }

        private void Exit_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }

        private void TaskbarIcon_TrayLeftMouseDown(object sender, RoutedEventArgs e)
        {
            this.Show();
            this.WindowState = WindowState.Normal;
        }

        private void TaskbarIcon_TrayRightMouseDown(object sender, RoutedEventArgs e)
        {

        }

        private void MetroWindow_StateChanged(object sender, EventArgs e)
        {
            if (this.WindowState == WindowState.Minimized)
            {
                this.Hide(); // Oculta la ventana
            }

        }
    }
}