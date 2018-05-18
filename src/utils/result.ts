export class Result {
    constructor(
        private readonly code: number, 
        private readonly message: string | null, 
        private readonly data: any    ){

    }
}

export const result = ( code: number, message: string | null, data: any ) => {
    return new Result(code, message, data);
}

export const resultOK = ( data: any ) => {
    return result( 200, "OK", data);
}