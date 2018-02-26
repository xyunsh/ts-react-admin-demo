export enum RespCode {
    OK              = 200,

    BAD_REQUEST     = 400,
}

export class Result {
    code: RespCode;
    data: object;
    message: string;
}

export const result = ( code: RespCode, data: object, message: string = '') => {
    return new Result();
};

export const resultOK = ( data: object ) => {
    return result( RespCode.OK, data );
};

export const isResultOK = ( {__code} ) => __code === RespCode.OK; 