export const publickey="b37c943f1a1852384cfc67e4c73685ae";
export const privatekey = "692a2c9b630e218caa9af41a9251db7a6cea0b80";
export const ts = 1;

function generateMD5(string) {
    const hash = CryptoJS.MD5(string);
    return hash.toString();
}


const datos = ts+privatekey+publickey;  //Hash = Timestamp + Llave privada + Llave pública
const md5 = generateMD5(datos);
export{md5}