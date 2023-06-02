import{ts,privatekey,publickey} from './conectar.js'
function generateMD5(string) {
    const hash = CryptoJS.MD5(string);
    return hash.toString();
}

// Ejemplo de uso
const message = ts+privatekey+publickey;
const md5 = generateMD5(message);
export{md5}