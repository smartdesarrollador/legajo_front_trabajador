export interface Permiso {
  permiso: string;
  fecha_inicio: string;
  fecha_fin: string;
  horas: number;
  id_area: number;
  id_trabajador: number;
  jefe_inmediato: string;
  motivo: string;
  adjunto?: File;
}
