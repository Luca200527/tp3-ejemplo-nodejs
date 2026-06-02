import { PersonaModel } from './persona.model.ts'

export class AlumnoModel extends PersonaModel {
  private legajo: number
  private fechaAlta: string = new Date().toISOString().split('T')[0]
  private modificacion: string = new Date().toISOString().split('T')[0]
  private isActive: boolean = true
  constructor(legajo: number, nombre: string, apellido: string, email: string) {
    super(nombre, apellido, email)
    this.legajo = legajo
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
