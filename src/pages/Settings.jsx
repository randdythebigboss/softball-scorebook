import { useState } from 'react';
import { Palette, Users, Settings as SettingsIcon, Database, Upload } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './Settings.module.css';

export default function Settings() {
  const [, , clearCurrentGame] = useLocalStorage('currentGame', null);
  const [cleared, setCleared] = useState(false);

  const handleClearData = () => {
    if (window.confirm('¿Estás seguro? Esto borrará todos los datos guardados.')) {
      clearCurrentGame();
      localStorage.clear();
      setCleared(true);
    }
  };

  return (
    <div className={styles.page}>
      <SectionHeader title="Configuración" />

      {/* Branding */}
      <Card padding="lg">
        <h3 className={styles.sectionTitle}><Palette size={16} /> Identidad Visual</h3>

        <div className={styles.field}>
          <label className={styles.label}>Nombre de la App</label>
          <input className={styles.input} defaultValue="Dugout Scorebook" />
        </div>

        <div className={styles.colorRow}>
          <div className={styles.field}>
            <label className={styles.label}>Color Primario</label>
            <div className={styles.colorPick}>
              <input type="color" defaultValue="#1a2744" className={styles.colorInput} />
              <span className={styles.colorHex}>#1a2744</span>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Color Acento</label>
            <div className={styles.colorPick}>
              <input type="color" defaultValue="#f97316" className={styles.colorInput} />
              <span className={styles.colorHex}>#f97316</span>
            </div>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Logo del Equipo</label>
          <div className={styles.logoUpload}>
            <div className={styles.logoPreview}>LT</div>
            <div className={styles.uploadInfo}>
              <button className={styles.uploadBtn} disabled>
                <Upload size={14} /> Subir Logo (próximamente)
              </button>
              <span className={styles.uploadHint}>PNG, JPG · Máx 1MB</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Main team */}
      <Card padding="lg">
        <h3 className={styles.sectionTitle}><Users size={16} /> Equipo Principal</h3>

        <div className={styles.field}>
          <label className={styles.label}>Nombre del Equipo</label>
          <input className={styles.input} defaultValue="Los Titanes" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Ciudad / Municipio</label>
          <input className={styles.input} defaultValue="Santo Domingo" />
        </div>
      </Card>

      {/* Scoring preferences */}
      <Card padding="lg">
        <h3 className={styles.sectionTitle}><SettingsIcon size={16} /> Preferencias de Puntaje</h3>

        <div className={styles.field}>
          <label className={styles.label}>Entradas por defecto</label>
          <select className={styles.select} defaultValue="7">
            <option value="5">5 entradas</option>
            <option value="6">6 entradas</option>
            <option value="7">7 entradas</option>
            <option value="9">9 entradas</option>
          </select>
        </div>

        <div className={styles.prefRow}>
          <span className={styles.prefLabel}>Quick Scoring por defecto</span>
          <div className={styles.toggleOn}>
            <div className={styles.toggleThumb} />
          </div>
        </div>

        <div className={styles.prefRow}>
          <span className={styles.prefLabel}>Confirmar jugadas antes de guardar</span>
          <div className={styles.toggle}>
            <div className={styles.toggleThumb} />
          </div>
        </div>
      </Card>

      {/* Data */}
      <Card padding="lg">
        <h3 className={styles.sectionTitle}><Database size={16} /> Almacenamiento</h3>
        <p className={styles.storageNote}>
          Los datos se guardan en <strong>localStorage</strong> del navegador.
          En una versión futura se conectará a una base de datos real.
        </p>
        <div className={styles.storageStats}>
          <div className={styles.storageStat}>
            <span className={styles.storageVal}>4</span>
            <span className={styles.storageLbl}>Equipos</span>
          </div>
          <div className={styles.storageStat}>
            <span className={styles.storageVal}>18</span>
            <span className={styles.storageLbl}>Jugadores</span>
          </div>
          <div className={styles.storageStat}>
            <span className={styles.storageVal}>3</span>
            <span className={styles.storageLbl}>Juegos</span>
          </div>
        </div>
        {cleared && <p className={styles.cleared}>✓ Datos borrados correctamente</p>}
        <Button variant="danger" onClick={handleClearData}>
          Resetear Datos de localStorage
        </Button>
      </Card>

      <div className={styles.version}>
        Dugout Scorebook · v1.0 Prototipo · 2026
      </div>
    </div>
  );
}
