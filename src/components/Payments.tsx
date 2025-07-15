export default function Payments() {
  const payments = [
    { id: 1, date: "2025-07-01", amount: "$1000", method: "MercadoPago", status: "Pagado" },
    { id: 2, date: "2025-06-01", amount: "$1000", method: "MercadoPago", status: "Pagado" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Historial de pagos</h2>
      <div className="">
        <table className="min-w-full table-standard">
          <thead className="bg-green-100">
            <tr>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Monto</th>
              <th className="px-4 py-2 text-left">Método</th>
              <th className="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{p.date}</td>
                <td className="px-4 py-2">{p.amount}</td>
                <td className="px-4 py-2">{p.method}</td>
                <td className="px-4 py-2">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
