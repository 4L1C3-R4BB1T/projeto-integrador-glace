export class DefaultResponse<T> {
    code: number;
    description: string;
    title: string;
    data: T;
    payload: any;

    constructor() {
        this.title = "";
    }

    /**
     * Método que lança erro no objeto
     * @param {object} _data Objeto de erro
     * @param {number} _code Campo do erro ocorrido
     * @param {string} _message  Erro ocorrido
     */
    error(_payload: any, _code: number = 400, _message: string = "Error") {
        this.payload = _payload;

        try {
            this.title = this.payload.title;
            this.description = this.payload.detail;
            this.data = this.payload.objects;
        } catch{
            this.code = _code;
            this.title = _message;
        }
    }

    /**
     * Método que lança objeto de sucesso
     * @param {any} _data Objeto de retorno
     * @param {number} _code Campo do erro ocorrido
     * @param {string} _title  Erro ocorrido
     */
    success(_type: string, _data: T, _code: number = 200, _title: string = "Success") {
        this.payload = _data;
        this.code = _code;
        this.title = _title;

        switch (_type.toUpperCase()) {
            case "GET":
            case "DELETE":
            case "PATCH":
            case "POST":
            case "PUT":
                this.data = _data;
                return;
        }
    }
}
