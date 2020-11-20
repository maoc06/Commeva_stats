export class Beneficio {
    constructor(
        public idbeneficio: number,
        public beneficio: string,
        public estado: string,
        public etiqueta: string,
        public qr: string,
        public idCategoriaBeneficio: number,
        public idprovd: number,
        public proveedorNombre: string,
        public proveedorImagen: string,
    ) { }
}
