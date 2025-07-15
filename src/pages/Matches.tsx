import { useState, useEffect } from "react";
import { dashboardMocks } from "../api/mocks/dashboardMocks";
import TournamentSelector from "../components/TournamentSelector";
import SortableMatches from "../components/SortableMatches";
import type { Tournament, Match, Team } from "../types";
import Spinner from "../components/Spinner"
import CreateTeamsForm from "../components/CreateTeamsForm";
import Modal from "../components/Modal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaSave, FaPlus } from "react-icons/fa";
import { formatDateTime } from "../utils/dateUtils";

export default function Matches() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [createTeams, setCreateTeams] = useState(false);
  const [teamsState, setTeamsState] = useState<Team[]>(selectedTournament?.teams ?? []);
  const [editTeamId, setEditTeamId] = useState<number | null>(null);
  const [teamsEditMode, setTeamsEditMode] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);

  useEffect(() => {
    dashboardMocks.getTournaments().then(data => {
      setTournaments(data);
      setSelectedTournament(data[0] || null);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedTournament) {
      dashboardMocks.getMatchesByTournament(selectedTournament.id).then(setMatches);
    }
  }, [selectedTournament]);

  useEffect(() => {
    setTeamsState(selectedTournament?.teams ?? []);
    setEditTeamId(null);
    setTeamsEditMode(false);
    setNewTeamName("");
    setTeamToDelete(null);
  }, [selectedTournament]);

  const handleCreateTeams = async () => {
    setCreateTeams(true);
    console.log("Equipos creados para torneo", selectedTournament?.id);
    // Aquí agregarías la lógica real de creación de equipos o refrescar datos
  };

  const handleGenerateMatches = async () => {    
    console.log("Equipos creados para torneo", selectedTournament?.id);
    if (!selectedTournament?.teams || selectedTournament.teams.length < 2) {
      toast.error("Necesitas al menos 2 equipos para generar partidos");
      return;
    }

    setLoadingTeams(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const teams = selectedTournament.teams;

    const generated: Match[] = [];
    let idCounter = 1;

    for (let i = 0; i < selectedTournament.teams.length; i++) {
      for (let j = i + 1; j < selectedTournament.teams.length; j++) {
        const homeTeam = teams[i];
        const awayTeam = teams[j];
        
        if (!homeTeam || !awayTeam) continue;

        generated.push({
          id: idCounter++,
          tournamentId: selectedTournament.id,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          matchDate: new Date().toISOString(),
          venue: `Estadio ${homeTeam.name}`,
          status: "scheduled",
          yellowCards: 0,
          redCards: 0,
          goalsForHome: 0,
          goalsForAway: 0,
        });
      }
    }

    console.log("Partidos generados:", generated);
    setMatches(generated);

    setLoadingTeams(false);
  };

  const handleSaveMatches = () => {
    console.log("Guardar partidos para torneo", selectedTournament?.id, matches);
    setShowModal(true);
  };

  if (loading) return <div>Cargando torneos...</div>;

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Partidos</h1>

      <TournamentSelector 
        tournaments={tournaments} 
        selectedTournament={selectedTournament}
        onChange={setSelectedTournament}
      />

      {selectedTournament?.teams && selectedTournament.teams.length > 0 && (
      <div className="bg-white p-4 rounded shadow mt-4 space-y-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
            Equipos del torneo {selectedTournament.name}
          </h3>

          <button
              className="btn-primary flex items-center space-x-2"
              onClick={() => {
                if (editTeamId !== null) 
                  {
                    toast.error("No es posible agregar un equipo si estás editando otro");
                    return;
                  }
                setTeamsEditMode(true);
                setNewTeamName("");
              }}
            >
              <span>➕</span>
              <span>Agregar equipo</span>
            </button>
        </div>

        {/* Lista de equipos con edición y eliminación */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {teamsState.map((team, idx) => (
            <div
              key={team.id}
              className="p-3 bg-gray-50 rounded border flex items-center justify-between"
            >
              {editTeamId === team.id ? (
                <>
                  <input
                    type="text"
                    className="flex-1 p-1 border rounded"
                    value={team.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setTeamsState((prev) => {
                        const copy = [...prev];
                        copy[idx] = { ...copy[idx], name: newName };
                        return copy;
                      });
                    }}
                  />
                  <button
                    className="ml-2 text-green-600"
                    onClick={() => {
                      //toast.success(`Equipo "${team.name}" editado exitosamente`);
                      setEditTeamId(null);
                    }}
                    title="Guardar edición"
                  >
                    <span>💾</span>
                  </button>
                </>
              ) : (
                <>
                  <span>{team.name}</span>
                  <div className="space-x-2">
                    <button
                      className="text-blue-600"
                       onClick={() => {
                        if (teamsEditMode) 
                          {
                            toast.error("No es posible editar un equipo si estás agregando otro");
                            return; // no editar si está agregando nuevo equipo
                          }
                        setEditTeamId(team.id);
                      }}>
                      ✏️
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => setTeamToDelete(team)}
                      title="Eliminar"
                    >
                      ❌
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Agregar nuevo equipo - solo visible si en modo agregar */}
          {teamsEditMode && (
            <div className="p-3 bg-gray-100 rounded border flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 p-1 border rounded"
                placeholder="Nombre nuevo equipo"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              />
              <button
                className="btn-primary"
                disabled={!newTeamName.trim()}
                onClick={() => {
                  if (!newTeamName.trim()) return;
                  setTeamsState((prev) => [
                    ...prev,
                    { id: Date.now(), name: newTeamName.trim(), logoUrl: "" },
                  ]);
                  setNewTeamName("");
                  setTeamsEditMode(false);
                }}
              >
                Agregar
              </button>
              <button
                className="text-red-600 text-2xl font-bold select-none"
                onClick={() => {
                  setNewTeamName("");
                  setTeamsEditMode(false);
                }}
                title="Cancelar"
              >
                &times;
              </button>
            </div>
          )}
        </div>

        {/* Botón para guardar los equipos editados */}
        <div className="flex justify-end mt-4">
          <button
            className="btn-primary flex items-center space-x-2"
            onClick={() => {
              // Actualizamos el torneo con los equipos editados
              if (!selectedTournament) return;
              if (teamsState.length === 0) {
                toast.error("Debe haber al menos un equipo");
                return;
              }
              const updatedTournament = { ...selectedTournament, teams: teamsState };
              const updatedTournaments = tournaments.map((t) =>
                t.id === selectedTournament.id ? updatedTournament : t
              );
              setTournaments(updatedTournaments);
              setSelectedTournament(updatedTournament);
              toast.success("Equipos guardados correctamente");
            }}
          >
            <span>💾</span>
            <span>Guardar equipos</span>
          </button>
        </div>
      </div>
    )}

      {selectedTournament?.teams?.length === 0 && (
        <div className="bg-blue-50 p-4 rounded shadow flex justify-between items-center">
          <span>Este torneo no tiene equipos todavía.</span>
          <button className="btn-primary flex items-center space-x-2" onClick={handleCreateTeams}>
            <span>➕</span>
            <span>Crear equipos</span>
          </button>
        </div>
      )}

      {selectedTournament?.teams?.length === 0 && createTeams && (
        <CreateTeamsForm
          tournament={selectedTournament}
          onSave={(teams) => {
            const updatedTournament = { ...selectedTournament, teams };
            const updatedTournaments = tournaments.map(t =>
              t.id === selectedTournament.id ? updatedTournament : t
            );
            setTournaments(updatedTournaments);
            setSelectedTournament(updatedTournament);
          }}
        />
      )}

      {(selectedTournament?.teams?.length ?? 0) > 0 && matches.length === 0 && (
        <div
          className={`bg-blue-50 p-4 rounded shadow flex items-center ${
            loadingTeams ? "justify-center" : "justify-between"
          }`}
          style={{ minHeight: "80px" }}
        >
          {loadingTeams ? (
            <div className="flex items-center space-x-2">
              <Spinner size={32} colorClass="text-green-500" />
              <span>Generando partidos...</span>
            </div>
          ) : (
            <>
              <span>No hay partidos generados aún.</span>
              <button className="btn-primary flex items-center space-x-2" onClick={handleGenerateMatches}>
                <span>🚀</span>
                <span>Generar partidos</span>
              </button>
            </>
          )}
        </div>
      )}

      {matches.length > 0 && (
      <>
        <SortableMatches matches={matches} onChange={setMatches} />
        <div className="flex justify-end">
          <button className="btn-primary mt-4 flex items-center space-x-2"
              onClick={handleSaveMatches}>
              <span>💾</span>
              <span>Guardar partidos</span>
          </button>
        </div>
      </>
      )}

      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <h2 className="text-xl font-bold mb-4">Confirmar guardado</h2>
          <p>¿Estás seguro que querés guardar los cambios en los partidos?</p>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setShowModal(false)}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                console.log("Guardado confirmado para partidos del torneo", selectedTournament?.id, matches);
                // Aquí podés llamar a la lógica real que persiste datos
              }}
              className="btn-primary"
            >
              Confirmar
            </button>
          </div>
        </Modal>
      )}

      {teamToDelete && (
        <Modal open={true} onClose={() => setTeamToDelete(null)}>
          <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
          <p>¿Seguro que querés eliminar el equipo "{teamToDelete.name}"?</p>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setTeamToDelete(null)}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                setTeamsState((prev) =>
                  prev.filter((t) => t.id !== teamToDelete.id)
                );
                setTeamToDelete(null);
                //toast.success(`Equipo "${teamToDelete.name}" eliminado exitosamente`);
                // Si estás editando ese equipo, resetear edición
                if (editTeamId === teamToDelete.id) setEditTeamId(null);
              }}
              className="btn-primary"
            >
              Eliminar
            </button>
          </div>
        </Modal>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
}
