export default function Faq() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h1>

      <div>
        <h2 className="text-xl font-semibold">¿Cómo creo una cuenta?</h2>
        <p>
          Puedes registrarte fácilmente desde la sección "Registrar" en el menú. Solo necesitas un correo electrónico y una contraseña segura.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">¿Puedo participar en más de un torneo?</h2>
        <p>
          Sí, puedes unirte a varios torneos y gestionar todos desde tu perfil.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">¿Cómo puedo contactar al soporte?</h2>
        <p>
          Escríbenos a <a href="mailto:soporte@mifutbolapp.com" className="text-blue-600 underline">soporte@mifutbolapp.com</a> y te ayudaremos lo antes posible.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">¿Mis datos están seguros?</h2>
        <p>
          Sí, protegemos tu información con medidas de seguridad avanzadas y nunca compartiremos tus datos sin tu consentimiento.
        </p>
      </div>
    </div>
  );
}
