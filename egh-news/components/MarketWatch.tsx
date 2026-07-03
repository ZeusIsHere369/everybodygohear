const markets = [
  { name: "USD/GHS", value: "11.42", change: "▲ +0.12" },
  { name: "Gold", value: "$3,340", change: "▲ +1.5%" },
  { name: "Cocoa", value: "$8,210", change: "▼ -0.8%" },
  { name: "Crude Oil", value: "$71.20", change: "▲ +0.6%" },
];

export default function MarketWatch() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <h2 className="mb-6 text-3xl font-bold">📊 Market Watch</h2>

      <div className="grid gap-4 md:grid-cols-4">
        {markets.map((item) => (
          <div
            key={item.name}
            className="rounded-xl bg-white p-5 shadow"
          >
            <h3 className="text-lg font-bold">{item.name}</h3>

            <p className="mt-3 text-2xl font-bold text-yellow-600">
              {item.value}
            </p>

            <p className="mt-2 text-sm text-green-600">
              {item.change}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}