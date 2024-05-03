export type SpreadJWT = {
    address: string;
    privateKey: string;
    associatedAddress: string;
};

export type AuthDto = {
    signature: string;
    address: string;
};
