export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-surface/80 backdrop-blur transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna 1 - Sobre a empresa */}
        <div>
          <h3 className="font-display text-lg text-brand-text mb-3">
            Parfun Imports
          </h3>
          <p className="text-brand-textMuted text-sm">
            Loja online de perfumes importados e exclusivos. Elegância e
            sofisticação em cada fragrância.
          </p>
        </div>

        {/* Coluna 2 - Contato */}
        <div>
          <h3 className="font-display text-lg text-brand-text mb-3">Contato</h3>
          <ul className="space-y-2 text-sm text-brand-textMuted">
            <li>
              WhatsApp:{" "}
              <span className="text-brand-text">(**COLOCAR NÚMERO REAL**)</span>
            </li>
            <li>
              Email:{" "}
              <span className="text-brand-text">
                contato@parfunimports.com.br (**ALTERAR**)
              </span>
            </li>
            <li>
              Telefone:{" "}
              <span className="text-brand-text">
                (11) 99999-9999 (**ALTERAR**)
              </span>
            </li>
          </ul>
        </div>

        {/* Coluna 3 - Dados da empresa */}
        <div>
          <h3 className="font-display text-lg text-brand-text mb-3">Empresa</h3>
          <ul className="space-y-2 text-sm text-brand-textMuted">
            <li>
              CNPJ:{" "}
              <span className="text-brand-text">
                00.000.000/0001-00 (**ALTERAR**)
              </span>
            </li>
            <li>
              Endereço:{" "}
              <span className="text-brand-text">
                Rua Exemplo, 123 - São Paulo/SP (**ALTERAR**)
              </span>
            </li>
            <li>
              Horário de atendimento:{" "}
              <span className="text-brand-text">
                Seg a Sex, 9h às 18h (**ALTERAR**)
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="border-t border-brand-border mt-8 py-4 text-center text-sm text-brand-textMuted">
        © {new Date().getFullYear()} Parfun Imports. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
