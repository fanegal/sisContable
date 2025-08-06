using Microsoft.Extensions.Configuration;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace AgenteSC.Services
{
    public class ApiService
    {
        private IConfiguration configuration;
        public ApiService()
        {
            configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory) // Ensure the required namespace is included  
                .AddJsonFile("appsettings.json")
                .Build();
        }

        private async Task<string> PeticionPost(string url, object requestBody, string token = "")
        {
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    //httpClient.Timeout = TimeSpan.FromSeconds(10); 

                    if (!string.IsNullOrEmpty(token))
                        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    var jsonContent = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
                    var response = await httpClient.PostAsync(url, jsonContent).ConfigureAwait(false);
                    // 🚨 Captura códigos de estado específicos
                    if (response.StatusCode == HttpStatusCode.BadRequest)
                    {
                        string errorMessage = await response.Content.ReadAsStringAsync();
                        Console.WriteLine($"Error 400: {errorMessage}");
                        return string.Empty; // Retorna el mensaje de error que envía el servidor
                    }

                    return response.IsSuccessStatusCode ? await response.Content.ReadAsStringAsync() : string.Empty;

                }
            }
            catch (Exception ex)
            {
                //aqui el log a bitacora local
                return string.Empty;
            }
        }

        public async Task<bool> TestConnection(string serverUrl, string username, string password)
        {
            var loginUrl = $"{serverUrl}/login";
            var credentials = new { username, password };
            var response = await PeticionPost(loginUrl, credentials);
            return !string.IsNullOrEmpty(response);
        }
    }
}
