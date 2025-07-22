using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgenteSC.Models
{
    public class ConfigJson
    {
        public Destino _destino { get; set; }
        public Origen _origen { get; set; }
    }


    public class Destino
    {
        public string NombreEnte { get; set; }
        public string Ejercicio { get; set; }
        public string UsuarioBD { get; set; }
        public string PasswordBD { get; set; }
        public string UbicacionBD { get; set; }

    }

    public class Origen
    {
        public string NombreServidor { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
        public string Log { get; set; }
    }
}
