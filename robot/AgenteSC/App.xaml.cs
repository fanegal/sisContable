using Hardcodet.Wpf.TaskbarNotification;
using System.Windows;
using ControlzEx.Theming;
using AgenteSC.Views;

namespace AgenteSC
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private TaskbarIcon trayIcon;

        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            // Set the application theme to Dark.Green
            ThemeManager.Current.ChangeTheme(this, "Light.Red");
       
            var mainWindow = new MainWindow();
            mainWindow.Show();
        }
    }
}
