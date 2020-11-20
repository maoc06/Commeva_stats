export class Asociado {
    constructor(
        public documento: string,
        public nombre: string,
        public apellido: string,
        public nickname: string,
        public telefono: string,
        public contrasena: string,
        public imagen: string,
        public puntos_mensuales: number,
        public puntos_anuales: number,
        public idtipo_TipoDocumento: number,
    ) { }
}
