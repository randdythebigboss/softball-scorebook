import { useState } from 'react';
import { PlusCircle, Pencil } from 'lucide-react';
import TeamStatsCard from '../components/dashboards/TeamStatsCard';
import SectionHeader from '../components/ui/SectionHeader';
import { useTeams } from '../hooks/useTeams';
import styles from './Teams.module.css';

const DEFAULT_COLOR = '#166534';
const DEFAULT_ACCENT = '#fbbf24';

function emptyForm() {
  return { name: '', shortName: '', city: '', color: DEFAULT_COLOR, accentColor: DEFAULT_ACCENT, isMainTeam: false };
}

function TeamForm({ initial, onSave, onCancel, allTeams, editingId }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const setField = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    const name = form.name.trim();
    const short = form.shortName.trim().toUpperCase();

    if (!name) {
      e.name = 'El nombre del equipo es requerido.';
    } else {
      const dupName = allTeams.find(
        t => t.id !== editingId && t.name.toLowerCase() === name.toLowerCase()
      );
      if (dupName) e.name = `Ya existe un equipo llamado "${name}".`;
    }

    if (!short) {
      e.shortName = 'La abreviatura es requerida.';
    } else {
      const dupShort = allTeams.find(
        t => t.id !== editingId && t.shortName.toUpperCase() === short
      );
      if (dupShort) e.shortName = `La abreviatura "${short}" ya existe.`;
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      ...form,
      name: form.name.trim(),
      shortName: form.shortName.trim().toUpperCase().slice(0, 3),
      city: form.city.trim(),
    });
  };

  return (
    <div className={styles.formBody}>
      <div className={styles.formField}>
        <label className={styles.fieldLabel}>Nombre del equipo *</label>
        <input
          className={`${styles.fieldInput} ${errors.name ? styles.fieldError : ''}`}
          value={form.name}
          onChange={e => setField('name', e.target.value)}
          placeholder="Los Titanes"
        />
        {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>Abreviatura * (máx. 3)</label>
          <input
            className={`${styles.fieldInput} ${errors.shortName ? styles.fieldError : ''}`}
            value={form.shortName}
            onChange={e => setField('shortName', e.target.value.toUpperCase().slice(0, 3))}
            placeholder="TIT"
            maxLength={3}
            style={{ textTransform: 'uppercase', fontFamily: 'monospace' }}
          />
          {errors.shortName && <span className={styles.errorMsg}>{errors.shortName}</span>}
        </div>
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>Ciudad / Lugar</label>
          <input
            className={styles.fieldInput}
            value={form.city}
            onChange={e => setField('city', e.target.value)}
            placeholder="Santo Domingo"
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>Color principal</label>
          <div className={styles.colorRow}>
            <input
              type="color"
              className={styles.colorPicker}
              value={form.color}
              onChange={e => setField('color', e.target.value)}
            />
            <span className={styles.colorHex}>{form.color}</span>
          </div>
        </div>
        <div className={styles.formField}>
          <label className={styles.fieldLabel}>Color de acento</label>
          <div className={styles.colorRow}>
            <input
              type="color"
              className={styles.colorPicker}
              value={form.accentColor}
              onChange={e => setField('accentColor', e.target.value)}
            />
            <span className={styles.colorHex}>{form.accentColor}</span>
          </div>
        </div>
      </div>

      <label className={styles.checkRow}>
        <input
          type="checkbox"
          checked={form.isMainTeam}
          onChange={e => setField('isMainTeam', e.target.checked)}
        />
        <span>Equipo principal (mi equipo)</span>
      </label>

      <div className={styles.formActions}>
        <button className={styles.cancelBtn} onClick={onCancel} type="button">
          Cancelar
        </button>
        <button className={styles.saveBtn} onClick={handleSave} type="button">
          Guardar
        </button>
      </div>
    </div>
  );
}

export default function Teams({ onNavigate }) {
  const { teams, addTeam, updateTeam } = useTeams();
  const [modal, setModal] = useState(null);

  const openAdd  = () => setModal({ mode: 'add' });
  const openEdit = (team) => setModal({ mode: 'edit', team });
  const close    = () => setModal(null);

  const handleSave = (formData) => {
    if (modal.mode === 'add') {
      addTeam(formData);
    } else {
      updateTeam(modal.team.id, formData);
    }
    close();
  };

  return (
    <div className={styles.page}>
      <SectionHeader
        title="Equipos"
        action={
          <button className={styles.addBtn} onClick={openAdd} type="button">
            <PlusCircle size={16} /> Agregar
          </button>
        }
      />

      <div className={styles.grid}>
        {teams.map(team => (
          <div key={team.id} className={styles.teamCard}>
            <TeamStatsCard team={team} onViewRoster={() => onNavigate('players')} />
            <button
              className={styles.editBtn}
              onClick={() => openEdit(team)}
              type="button"
            >
              <Pencil size={13} /> Editar equipo
            </button>
          </div>
        ))}
      </div>

      {modal && (
        <div className={styles.overlay} onClick={close}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>
              {modal.mode === 'add' ? 'Nuevo equipo' : `Editar: ${modal.team.name}`}
            </h2>
            <TeamForm
              initial={modal.mode === 'add' ? emptyForm() : { ...modal.team }}
              onSave={handleSave}
              onCancel={close}
              allTeams={teams}
              editingId={modal.mode === 'edit' ? modal.team.id : null}
            />
          </div>
        </div>
      )}
    </div>
  );
}
