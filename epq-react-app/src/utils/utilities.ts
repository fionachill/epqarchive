import { Base64 } from 'js-base64';


export const encodeUri = (uri: string) => {
    return Base64.encode(uri);
};