import React from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-[var(--color-primary)]">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">
          Parfum Imports
        </h1>
        <ThemeSwitcher />
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        {/* Seção de destaque */}
        <section className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[var(--color-accent)]">
            Elegância em cada fragrância
          </h2>
          <p className="max-w-xl mx-auto text-lg text-[var(--color-text)]">
            Descubra perfumes exclusivos que unem sofisticação e modernidade.
          </p>
        </section>

        {/* Produtos em destaque */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Produto 1 */}
          <div className="p-6 rounded-lg shadow-md bg-[var(--color-bg)]">
            <img
              src="/images/Ameeri-Al-Wataniah-00.jpg"
              alt="Ameeri"
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold text-[var(--color-primary)]">
              Ameeri Al Wataniah
            </h3>
            <p className="text-[var(--color-text)]">R$ 199,90</p>
            <Link
              to="/products/1"
              className="mt-2 block px-4 py-2 rounded-lg font-semibold bg-[var(--color-accent)] text-white hover:opacity-90 transition"
            >
              Ver Detalhes
            </Link>
          </div>

          {/* Produto 2 */}
          <div className="p-6 rounded-lg shadow-md bg-[var(--color-bg)]">
            <img
              src="/images/Angel-Isabelle-La-Belle-00.jpg"
              alt="Angel"
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold text-[var(--color-primary)]">
              Angel Isabelle La Belle
            </h3>
            <p className="text-[var(--color-text)]">R$ 249,90</p>
            <Link
              to="/products/2"
              className="mt-2 block px-4 py-2 rounded-lg font-semibold bg-[var(--color-accent)] text-white hover:opacity-90 transition"
            >
              Ver Detalhes
            </Link>
          </div>

          {/* Produto 3 */}
          <div className="p-6 rounded-lg shadow-md bg-[var(--color-bg)]">
            <img
              src="/images/Club-De-Nuit-Intense-Man-00.jpg"
              alt="Club De Nuit"
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold text-[var(--color-primary)]">
              Club De Nuit Intense Man
            </h3>
            <p className="text-[var(--color-text)]">R$ 299,90</p>
            <Link
              to="/products/3"
              className="mt-2 block px-4 py-2 rounded-lg font-semibold bg-[var(--color-accent)] text-white hover:opacity-90 transition"
            >
              Ver Detalhes
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
