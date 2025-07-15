import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10">
      <div className="container mx-auto flex navbar-footer-style">
        <p>&copy; 2025 FixtureAR</p>
        <div className="flex gap-4">
          <Link to="/faq" className="hover:underline">Preguntas frecuentes</Link>
          <Link to="/privacy" className="hover:underline">Política de privacidad</Link>
          <Link to="/contact" className="hover:underline">Contacto</Link>
        </div>
      </div>
    </footer>
  );
}
