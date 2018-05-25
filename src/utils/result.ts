export enum RespCode {
    OK              = 200,

    BAD_REQUEST     = 400,
}


export class Result {
    constructor(
        readonly code: RespCode, 
        readonly message?: string, 
        readonly data?: any    ){

    }
}

export const result = ( code: RespCode, message?: string, data?: any ) => {
    return new Result( code, message, data );
}

export const resultOK = ( data: any ) => {
    return result( RespCode.OK, "OK", data );
}

export const isResultOK = ( result: Result ) => {
    return result.code === RespCode.OK;
}

export const resultData = ( result: Result ) => {
    return result.data;
}