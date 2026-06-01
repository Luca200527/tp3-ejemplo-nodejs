import { PersonaModel } from './persona.model'

export class AlumnoModel extends PersonaModel {
  constructor(
    private legajo: number,
    nombre: string,
    apellido: string,
    email: string,
    private fechaAlta: string,
    private modificacion: string,
    private isActive: boolean
  ) {
    super(nombre, apellido, email)
  }

  // legajo
  public getLegajo(): number {
    return this.legajo
  }
  public setLegajo(legajo: number): void {
    this.legajo = legajo
  }

  // fechaAlta
  public getFechaAlta(): string {
    return this.fechaAlta
  }
  public setFechaAlta(fechaAlta: string): void {
    this.fechaAlta = fechaAlta
  }

  // modificacion
  public getModificacion(): string {
    return this.modificacion
  }
  public setModificacion(modificacion: string): void {
    this.modificacion = modificacion
  }

  // isActive
  public getIsActive(): boolean {
    return this.isActive
  }
  public setIsActive(isActive: boolean): void {
    this.isActive = isActive
  }

  // devolver todos los atributos
  public getAllAttributes(): object {
    return {
      legajo: this.legajo,
      nombre: this.getNombre(),
      apellido: this.getApellido(),
      email: this.getEmail(),
      fechaAlta: this.fechaAlta,
      modificacion: this.modificacion,
      isActive: this.isActive
    }
  }
}