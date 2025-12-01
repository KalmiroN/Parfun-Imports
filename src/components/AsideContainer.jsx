export default function AsideContainer({ showCheckout, showSaveLater }) {
  const bothActive = showCheckout && showSaveLater;

  return (
    <aside className="flex flex-col h-full w-80 p-4 bg-brand-surface border-l border-brand-border">
      {/* Caso apenas um esteja ativo */}
      {!bothActive && (
        <div className="flex items-center justify-center h-[90%] w-full">
          {showCheckout && (
            <div className="w-full h-full bg-green-200 rounded-lg p-4">
              Finalizar compra
            </div>
          )}
          {showSaveLater && (
            <div className="w-full h-full bg-yellow-200 rounded-lg p-4">
              Salvar para depois
            </div>
          )}
        </div>
      )}

      {/* Caso os dois estejam ativos */}
      {bothActive && (
        <div className="flex flex-col justify-between h-full w-full">
          <div className="w-full h-[44%] bg-green-200 rounded-lg p-4">
            Finalizar compra
          </div>

          <div className="w-full h-[44%] bg-yellow-200 rounded-lg p-4 mt-4">
            Salvar para depois
          </div>
        </div>
      )}
    </aside>
  );
}
