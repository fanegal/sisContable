import './home.scss'

export function Home() {
  return (
    <section className="as-home">
      <div className="home-header">
        <img src="/arsa-dark.png" alt="ARSA Logo" className="arsa-logo" />
        <h1>Bienvenido a ARSA Software</h1>
        <p className="subtitle">Panel de administración centralizado para gestión y análisis</p>
      </div>

      <div className="home-content">
        <div className="card">
          <h3>Administración Total</h3>
          <p>Accede a todos los módulos: usuarios, reportes, productos y más.</p>
        </div>
        <div className="card">
          <h3>Estadísticas en Tiempo Real</h3>
          <p>Visualiza métricas clave para una toma de decisiones inteligente.</p>
        </div>
        <div className="card">
          <h3>Infraestructura Segura</h3>
          <p>Construido con las mejores prácticas de software moderno.</p>
        </div>
      </div>
    </section>
  )
}
