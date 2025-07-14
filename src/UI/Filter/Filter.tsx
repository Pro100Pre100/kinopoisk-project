import type { FilterProps } from "../../interfaces/main";

export default function Filter({title, range, updateRange}: FilterProps) {

  return (
    
        <div className="bg-neutral-800 p-3 rounded">
          <p className="mb-2 font-semibold">{title}</p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-full bg-neutral-700 p-2 rounded"
              value={range[0]}
              min={0}
              max={range[1]}
              step={0.1}
              onChange={(e) => updateRange(0, +e.target.value)}
            />
            <span>—</span>
            <input
              type="number"
              className="w-full bg-neutral-700 p-2 rounded"
              value={range[1]}
              min={range[0]}
              max={10}
              step={0.1}
              onChange={(e) => updateRange(1, +e.target.value)}
            />
          </div>
        </div>
  )
}