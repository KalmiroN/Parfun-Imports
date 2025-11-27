export default function Hero({
  backgroundImage,
  title,
  subtitle,
  actions = [],
}) {
  return (
    <section className="relative transition-colors duration-500">
      {/* Imagem de fundo com fade-in */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-0 animate-fadeIn"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{ background: "var(--color-overlay)" }}
      />

      {/* Conteúdo */}
      <div className="relative mx-auto max-w-6xl px-4 py-24">
        <h1 className="font-display text-4xl md:text-5xl text-brand-text transition-colors duration-500">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 font-sans text-brand-textMuted max-w-2xl transition-colors duration-500">
            {subtitle}
          </p>
        )}
        {actions.length > 0 && (
          <div className="mt-8 flex gap-4">
            {actions.map((action, idx) => (
              <a
                key={idx}
                href={action.href}
                className={`px-5 py-3 rounded-full transition-colors duration-500 ${
                  action.primary
                    ? "bg-brand-accent text-black hover:opacity-90"
                    : "border border-brand-border text-brand-text hover:bg-brand-surface/60"
                }`}
              >
                {action.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
