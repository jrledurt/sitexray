export default function AssetTable({ assets }: { assets: any[] }) {
  return (
    <table className="w-full text-sm border mt-2">
      <thead>
        <tr>
          <th className="border px-2 py-1">Name</th>
          <th className="border px-2 py-1">Type</th>
          <th className="border px-2 py-1">Size (KB)</th>
          <th className="border px-2 py-1">Why it matters</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((a, i) => (
          <tr key={i}>
            <td className="border px-2 py-1">{a.name}</td>
            <td className="border px-2 py-1">{a.type}</td>
            <td className="border px-2 py-1">{a.sizeKb}</td>
            <td className="border px-2 py-1">{a.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
