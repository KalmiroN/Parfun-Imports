import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="font-display text-3xl text-brand-text">
        Detalhes do produto
      </h2>
      <p className="mt-2 text-brand-textMuted">ID: {id}</p>

      {/* Conteúdo real do produto, imagens, notas, composição, etc. */}
      <div className="mt-8 flex flex-col md:flex-row gap-8">
        {/* Imagem do produto */}
        <div className="flex-1">
          <img
            src={`/produtos/${id}.jpg`}
            alt={`Produto ${id}`}
            className="w-full h-80 object-cover rounded-lg shadow-soft"
          />
        </div>

        {/* Informações do produto */}
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-display text-brand-text">
            Nome do Produto {id}
          </h3>
          <p className="text-brand-textMuted">Preço: R$ ---</p>
          <p className="text-brand-text">
            Descrição breve do produto, notas olfativas e composição.
          </p>

          {/* Botões de ação */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button className="flex-1 px-6 py-3 rounded-full bg-brand-accent text-black font-semibold hover:opacity-90 transition-colors duration-500">
              Adicionar ao carrinho
            </button>
            <Link
              to="/products"
              className="flex-1 px-6 py-3 rounded-full bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface/60 transition-colors duration-500 text-center"
            >
              Voltar ao catálogo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
