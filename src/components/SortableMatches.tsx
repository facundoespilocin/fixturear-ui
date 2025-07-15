import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { motion, AnimatePresence } from "framer-motion";
import type { Match } from "../types";
import { toast } from "react-toastify";
import { formatDateTime } from "../utils/dateUtils";

interface Props {
  matches: Match[];
  onChange: (matches: Match[]) => void;
}

export default function SortableMatches({ matches, onChange }: Props) {
  const [selectedMatches, setSelectedMatches] = useState<number[]>([]);

  const matchesByDay = matches.reduce((acc, match) => {
    const date = new Date(match.matchDate).toISOString().split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  const days = Object.keys(matchesByDay).sort();

  const toggleSelected = (id: number) => {
    setSelectedMatches(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const bulkSetDay = (day: string) => {
    const updated = matches.map(m => 
      selectedMatches.includes(m.id) 
        ? { ...m, matchDate: `${day}T${new Date(m.matchDate).toISOString().split("T")[1]}` }
        : m
    );
    onChange(updated);
    setSelectedMatches([]);
    toast.success(`Partidos movidos al ${day}`);
  };

  const bulkSetTime = (time: string) => {
    const updated = matches.map(m =>
      selectedMatches.includes(m.id)
        ? { ...m, matchDate: `${new Date(m.matchDate).toISOString().split("T")[0]}T${time}:00.000Z` }
        : m
    );
    onChange(updated);
    setSelectedMatches([]);
    toast.success(`Hora actualizada a ${time}`);
  };

  const bulkAdjustDays = (daysToAdd: number) => {
    const updated = matches.map(m => 
      selectedMatches.includes(m.id)
        ? { ...m, matchDate: new Date(new Date(m.matchDate).setDate(new Date(m.matchDate).getDate() + daysToAdd)).toISOString() }
        : m
    );
    onChange(updated);
    toast.success(`Partidos movidos ${daysToAdd > 0 ? "+" : ""}${daysToAdd} día(s)`);
  };

  return (
    <div className="bg-green-50 p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-3">Organizar partidos</h3>
      <div className="bg-yellow-50 p-3 rounded shadow text-yellow-800 mb-3">
        ⚠️ Los partidos se guardarán en el torneo solo después de presionar <strong>“Guardar partidos”</strong>.
      </div>

      {selectedMatches.length > 0 && (
        <div className="mb-4 bg-blue-50 p-3 rounded flex flex-wrap gap-3 items-center">
          <span>{selectedMatches.length} partidos seleccionados</span>
          <input
            type="date"
            onChange={(e) => e.target.value && bulkSetDay(e.target.value)}
            className="p-1 border rounded"
            title="Cambiar día"
          />
          <input
            type="time"
            onChange={(e) => e.target.value && bulkSetTime(e.target.value)}
            className="p-1 border rounded"
            title="Cambiar hora"
          />
          <button
            className="btn-primary"
            onClick={() => bulkAdjustDays(1)}
            title="Mover +1 día"
          >
            ➕1 día
          </button>
          <button
            className="btn-primary"
            onClick={() => bulkAdjustDays(-1)}
            title="Mover -1 día"
          >
            ➖1 día
          </button>
          <button
            className="btn-secondary"
            onClick={() => setSelectedMatches([])}
          >
            Limpiar selección
          </button>
        </div>
      )}

      <ReactSortable
        list={matches}
        setList={onChange}
        animation={200}
        className="space-y-4"
      >
        <AnimatePresence>
          {days.map(day => (
            <motion.div
              key={day}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="p-3 bg-white rounded shadow"
            >
              <h4 className="font-bold mb-2">Partidos del {day}</h4>
              <div className="space-y-2">
                {matchesByDay[day]
                  .sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime())
                  .map(match => (
                    <motion.div
                      key={match.id}
                      layout
                      className={`p-3 border rounded flex justify-between items-center ${
                        selectedMatches.includes(match.id) ? 'bg-blue-100' : 'bg-gray-50'
                      } hover:bg-gray-100`}
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedMatches.includes(match.id)}
                          onChange={() => toggleSelected(match.id)}
                        />
                        <div>
                          <div><strong>{match.homeTeam.name}</strong> vs <strong>{match.awayTeam.name}</strong></div>
                          <div className="text-sm text-gray-600">
                            {formatDateTime(match.matchDate)} - {match.venue}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="datetime-local"
                          className="p-1 border rounded"
                          value={new Date(match.matchDate).toISOString().slice(0, 16)}
                          onChange={(e) => {
                            const newDate = e.target.value;
                            const updated = matches.map(m =>
                              m.id === match.id
                                ? { ...m, matchDate: new Date(newDate).toISOString() }
                                : m
                            );
                            onChange(updated);
                            toast.info(`Actualizado ${match.homeTeam.name} vs ${match.awayTeam.name}`);
                          }}
                        />
                        <button
                          className="text-green-600 text-xl"
                          onClick={() => {
                            const newDate = new Date(match.matchDate);
                            newDate.setDate(newDate.getDate() + 1);
                            const updated = matches.map(m =>
                              m.id === match.id
                                ? { ...m, matchDate: newDate.toISOString() }
                                : m
                            );
                            onChange(updated);
                            toast.success(`Movido a ${formatDateTime(newDate)}`);
                          }}
                          title="Mover +1 día"
                        >
                          ➕1🗓️
                        </button>
                        <button
                          className="text-blue-600 text-xl"
                          onClick={() => {
                            const newDate = new Date(match.matchDate);
                            newDate.setHours(newDate.getHours() + 1);
                            const updated = matches.map(m =>
                              m.id === match.id
                                ? { ...m, matchDate: newDate.toISOString() }
                                : m
                            );
                            onChange(updated);
                            toast.success(`+1h a ${match.homeTeam.name} vs ${match.awayTeam.name}`);
                          }}
                          title="Mover +1 hora"
                        >
                          ➕1🕒
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ReactSortable>
    </div>
  );
}
