export default function ProductCard({ name, price, imageUrl }) {
  return (
    <article className="rounded-xl border border-brand-border bg-brand-surface shadow-2xl hover:shadow-2xl overflow-hidden transition duration-500">
      {/* Imagem com fade-in e transição suave */}
      <div className="aspect-[3/4] bg-brand-surface overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover opacity-0 animate-fadeIn transition-opacity duration-700"
          loading="lazy"
          onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
        />
      </div>

      {/* Conteúdo */}
      <div className="p-6 transition-colors duration-500">
        <h3 className="font-sans text-brand-text text-lg transition-colors duration-500">
          {name}
        </h3>
        <p className="mt-1 text-sm text-brand-muted transition-colors duration-500">
          Eau de parfum
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-medium text-brand-text transition-colors duration-500">
            {price}
          </span>
          <button className="px-4 py-2 rounded-full border border-brand-border text-brand-text hover:bg-brand-accent hover:text-black transition-colors duration-500">
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
