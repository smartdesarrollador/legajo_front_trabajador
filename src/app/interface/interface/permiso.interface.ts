export interface Estado {
  id: number;
  nombre: string;
  color: string;
}

export interface VerAcuerdo {
  tiene_documento: boolean;
  url: string;
}

export interface Trabajador {
  id: number;
  nombre_completo: string;
  area: string;
}

export interface Permiso {
  motivo: string;
  fecha_inicio: string;
  fecha_final: string;
  horas: number;
  estado: Estado;
  ver_acuerdo: VerAcuerdo;
  trabajador: Trabajador;
}
