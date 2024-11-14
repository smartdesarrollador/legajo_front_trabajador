export interface Trabajador {
  resumen: Resumen;
  documentos: Documentos;
}

export interface Resumen {
  foto: string;
  nombres: Nombres;
  cargo: string;
  area: string;
}

export interface Nombres {
  primer: string;
  segundo: string;
  paterno: string;
  materno: string;
  nombreCompleto: string;
}

export interface Documentos {
  cargo: DatosCargo;
  contrato: DatosContrato;
  seguros: DatosSeguros;
  fechas: DatosFechas;
  datos_personales: DatosPersonales;
  vacaciones: DatosVacaciones;
}

export interface DatosCargo {
  nombre: string;
  area: string;
  division: string;
  empresa: string;
  supervisor: string;
  sueldoBase: string;
}

export interface DatosContrato {
  tipo: string;
  jornadaLaboral: string;
  regimenLaboral: string;
}

export interface DatosSeguros {
  regimenSalud: string;
  regimenPensiones: string;
  afp: string;
}

export interface DatosFechas {
  incorporacion: string;
  cese: string | null;
}

export interface DatosPersonales {
  tipoDocumento: string;
  numeroDocumento: string;
  telefonoFijo: string;
  celular: string;
  email: string;
  fechaNacimiento: string;
  direccion: string;
  nivelEducativo: string;
  esDiscapacitado: string;
  esSindicalizado: string;
}

export interface DatosVacaciones {
  saldoVacaciones: string;
  diasTomados: string;
}
