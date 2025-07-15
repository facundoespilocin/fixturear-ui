export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>
      <p>
        En FixtureAR, valoramos tu privacidad y nos comprometemos a proteger tu información personal. 
        Esta política describe cómo recopilamos, usamos y protegemos tus datos.
      </p>

      <h2 className="text-xl font-semibold mt-4">1. Información que recopilamos</h2>
      <ul className="list-disc ml-6">
        <li>Datos personales como nombre, correo electrónico y equipo favorito.</li>
        <li>Datos de uso, como páginas visitadas y tiempo en la aplicación.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">2. Cómo usamos tu información</h2>
      <ul className="list-disc ml-6">
        <li>Para proveer y mantener el servicio.</li>
        <li>Para personalizar tu experiencia en la app.</li>
        <li>Para enviarte notificaciones importantes relacionadas con tu cuenta o torneos.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">3. Seguridad de tus datos</h2>
      <p>
        Implementamos medidas técnicas y organizativas para proteger tus datos. 
        Sin embargo, ningún sistema es 100% seguro.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Cambios a esta política</h2>
      <p>
        Podemos actualizar esta política periódicamente. Te notificaremos cualquier cambio importante.
      </p>

      <h2 className="text-xl font-semibold mt-4">5. Contacto</h2>
      <p>
        Si tienes preguntas sobre nuestra política de privacidad, escríbenos a 
        <a href="mailto:soporte@mifutbolapp.com" className="text-blue-600 underline ml-1">
          soporte@mifutbolapp.com
        </a>.
      </p>
    </div>
  );
}
