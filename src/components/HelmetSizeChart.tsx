import { HELMET_SIZE_CHART } from "@/config/seo";
import { cn } from "@/lib/utils";

type Props = {
  /** Размеры, которые сейчас в наличии */
  inStock?: string[];
  className?: string;
  compact?: boolean;
};

export function HelmetSizeChart({ inStock, className, compact }: Props) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[16rem] text-left text-xs text-zinc-400">
        <caption className="mb-2 text-left text-[11px] uppercase tracking-wider text-zinc-500">
          {compact ? "Обхват головы, см" : "Таблица размеров (обхват головы)"}
        </caption>
        <thead>
          <tr className="border-b border-white/10 text-zinc-500">
            <th scope="col" className="py-1.5 pr-3 font-medium">
              Размер
            </th>
            <th scope="col" className="py-1.5 font-medium">
              См
            </th>
            {inStock && (
              <th scope="col" className="py-1.5 pl-3 font-medium">
                Наличие
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {HELMET_SIZE_CHART.map((row) => {
            const available = inStock?.includes(row.size);
            return (
              <tr
                key={row.size}
                className={cn(
                  "border-b border-white/5",
                  available && "text-amber-100",
                  inStock && !available && "text-zinc-600",
                )}
              >
                <td className="py-1.5 pr-3 font-semibold">{row.size}</td>
                <td className="py-1.5">{row.cm}</td>
                {inStock && (
                  <td className="py-1.5 pl-3">
                    {available ? "есть" : "—"}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!compact && (
        <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
          Сетка ориентировочная. Точная посадка — только при примерке на встрече.
        </p>
      )}
    </div>
  );
}
