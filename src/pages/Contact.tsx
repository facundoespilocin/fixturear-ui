export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Contacto</h1>

      <p>
        ¿Tienes alguna pregunta o sugerencia? Nos encantaría saber de ti. 
        Escríbenos a <a href="mailto:soporte@mifutbolapp.com" className="text-blue-600 underline">soporte@mifutbolapp.com</a> 
        o completa el siguiente formulario:
      </p>

      <form className="space-y-4">
        <div>
          <label className="block font-semibold">Nombre</label>
          <input type="text" className="w-full border px-3 py-2 rounded" placeholder="Tu nombre" />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input type="email" className="w-full border px-3 py-2 rounded" placeholder="tu@email.com" />
        </div>

        <div>
          <label className="block font-semibold">Mensaje</label>
          <textarea className="w-full border px-3 py-2 rounded" rows={4} placeholder="Escribe tu mensaje..." />
        </div>

        <button type="submit" className="bg-primary text-white px-6 py-2 rounded shadow hover:bg-primary-dark transition">
          Enviar
        </button>
      </form>
    </div>
  );
}
