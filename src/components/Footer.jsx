export default function Footer() {
  return (
    <footer className="bg-brand-surface text-brand-text py-6 mt-10 shadow-inner">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Texto de direitos autorais */}
        <p className="text-sm font-sans">
          © {new Date().getFullYear()} Parfun Imports. Todos os direitos
          reservados.
        </p>

        {/* Links rápidos */}
        <nav className="flex gap-6 text-sm font-sans">
          <a
            href="/about"
            className="hover:text-brand-primary transition-colors"
          >
            Sobre
          </a>
          <a
            href="/contact"
            className="hover:text-brand-primary transition-colors"
          >
            Contato
          </a>
          <a
            href="/privacy"
            className="hover:text-brand-primary transition-colors"
          >
            Privacidade
          </a>
        </nav>
      </div>
    </footer>
  );
}
