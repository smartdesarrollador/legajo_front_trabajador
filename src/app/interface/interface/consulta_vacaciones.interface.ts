export interface ConsultaVacaciones {
  id_vacaciones: number;
  fecha_solicitud: string;
  fecha_inicio: string;
  fecha_fin: string;
  dias: number;
  tipo_vacaciones: string;
  trabajador: {
    nombre_completo: string;
    numero_documento: string;
  };
  estado: {
    estado: string;
    fecha_aprobacion: string;
    aprobado_por: string;
    comentario: string | null;
  } | null;
  saldo_vacaciones: {
    dias_acumulados: number;
    dias_usados: number;
    saldo_actual: number;
  } | null;
}

export interface ControlVacaciones {
  acumuladas: number;
  tomadas: number;
  restantes: number;
}

export interface FiltroVacaciones {
  fecha_desde?: string;
  fecha_hasta?: string;
  id_tipo_vacaciones?: number;
  id_user: number;
}
