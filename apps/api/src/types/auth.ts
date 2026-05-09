export interface AuthPayloadAmr {
    method: string,
    timestamp: number
};

export interface AuthPayloadMetaData {
    provider: string,
    providers: string[]
};

export interface AuthPayloadUserMetaData {
    email_validation: boolean
};

export interface AuthPayload {
    iss: string,
    sub: string,
    aud: string,
    exp: number,
    iat: number,
    email: string,
    phone: string,
    app_metadata: AuthPayloadMetaData,
    user_metadata: AuthPayloadUserMetaData,
    role: string,
    aal: string,
    amr: AuthPayloadAmr[],
    session_id: string,
    is_anonymous: boolean,
    accessToken: string
};