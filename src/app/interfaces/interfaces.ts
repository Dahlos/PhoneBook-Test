export interface Comuna {
  id: number;
  nombre: string;
}

export interface Region {
  id: number;
  nombre: string;
  comunas?: Comuna[];
}

export interface Direccion {
  calle: string;
  numero: number;
  comuna: Comuna;
}

export interface Persona {
  activo: number;
  apellido: string;
  direccion: Direccion;
  id: number;
  nombre: string;
  rut: string;
  telefono: number;
}
