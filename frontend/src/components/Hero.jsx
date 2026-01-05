export default function Hero({
  backgroundImage,
  title,
  subtitle,
  actions = [],
}) {
  return (
    <section
      className="relative h-[60vh] flex items-center justify-center text-center bg-brand-bg text-brand-text transition-colors duration-500"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay para suavizar a imagem de fundo */}
      <div className="absolute inset-0 bg-brand-overlay"></div>

      {/* Conteúdo central */}
      <div className="relative z-10 max-w-2xl px-6 animate-slideUp">
        <h1 className="text-4xl md:text-5xl font-display mb-4">{title}</h1>
        <p className="text-lg md:text-xl text-brand-muted mb-6">{subtitle}</p>

        {/* Botões de ação */}
        <div className="flex justify-center gap-4">
          {actions.map((action, idx) => (
            <a
              key={idx}
              href={action.href}
              className={action.primary ? "btn-accent" : "btn-secondary"}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
