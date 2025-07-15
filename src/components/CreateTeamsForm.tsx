import { useState } from "react";
import type { Team, Tournament } from "../types";
import Modal from "./Modal";
import { toast } from "react-toastify";

interface Props {
  tournament: Tournament;
  onSave: (teams: Team[]) => void;
  onCancel?: () => void; // por si querés pasarlo desde Matches.tsx
}

export default function CreateTeamsForm({ tournament, onSave, onCancel }: Props) {
  const [newTeamName, setNewTeamName] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);

  const handleAddTeam = () => {
    const trimmedName = newTeamName.trim();
    if (!trimmedName) return;

    if (editingTeamId !== null) {
      setTeams(teams.map(team =>
        team.id === editingTeamId ? { ...team, name: trimmedName } : team
      ));
      setEditingTeamId(null);
    } else {
      setTeams([...teams, { id: Date.now(), name: trimmedName, logoUrl: "" }]);
    }
    setNewTeamName("");
  };

  const handleEditTeam = (teamId: number) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return;
    setNewTeamName(team.name);
    setEditingTeamId(teamId);
  };

  const handleDeleteTeam = (teamId: number) => {
    setTeams(teams.filter(team => team.id !== teamId));
    if (editingTeamId === teamId) {
      setEditingTeamId(null);
      setNewTeamName("");
    }
  };

  const openConfirmModal = () => {
    if (teams.length === 0) return;
    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    onSave(teams);
    setTeams([]);
    setShowConfirmModal(false);
  };

  const handleCancelForm = () => {
    // Podrías abrir otro modal si querés doble confirmación
    toast.info("Se canceló la creación de equipos. Los cambios se han perdido.");
    setTeams([]);
    setNewTeamName("");
    setEditingTeamId(null);
    if (onCancel) onCancel();
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow mt-4 space-y-4">
        <h3 className="text-xl font-bold mb-2">Crear equipos para {tournament.name}</h3>

        <div className="bg-yellow-50 p-3 rounded shadow text-yellow-800 mb-3">
          ⚠️ Los equipos se guardarán en el torneo solo después de presionar <strong>“Guardar equipos”</strong>.
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            placeholder="Nombre del equipo"
            className="flex-1 p-2 border rounded"
          />
          <button className="btn-primary" onClick={handleAddTeam}>
            {editingTeamId !== null ? "Guardar cambios" : "Agregar"}
          </button>
        </div>

        {teams.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {teams.map(team => (
                <div
                  key={team.id}
                  className="p-3 bg-gray-50 rounded border flex justify-between items-center"
                >
                  <span>{team.name}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditTeam(team.id)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Editar equipo"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(team.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Eliminar equipo"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button className="btn-secondary" onClick={handleCancelForm}>
                Cancelar
              </button>
              <button className="btn-primary flex items-center space-x-2" onClick={openConfirmModal}>
                <span>💾</span>
                <span>Guardar equipos</span>
              </button>
            </div>
          </>
        )}
      </div>

      {showConfirmModal && (
        <Modal open={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
          <h2 className="text-xl font-bold mb-4">Confirmar creación</h2>
          <p>¿Estás seguro que querés guardar los equipos creados?</p>
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={() => setShowConfirmModal(false)} className="btn-secondary">
              Cancelar
            </button>
            <button onClick={handleConfirmSave} className="btn-primary">
              Confirmar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
