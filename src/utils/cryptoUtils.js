export async function generateKeyPair() {
    return await window.crypto.subtle.generateKey(
        {
            name: 'RSA-OAEP',
            modulusLength: 2048,
            publicExponent: new Uint8Array([1,0,1]),
            hash: 'SHA-256'
        },
        true,
        ['encrypt', 'decrypt']
    );
}

export async function exportPublicKey(publicKey) {
    return await window.crypto.subtle.exportKey('jwk', publicKey);
}

export async function importPublicKey(jwk) {
    return await window.crypto.subtle.importKey(
        'jwk',
        jwk,
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256'
        },
        true,
        ['encrypt']
    );
}

export async function importPrivateKey(jwk) {
    return await window.crypto.subtle.importKey(
        'jwk',
        jwk,
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256'
        },
        true,
        ['decrypt']
    );
}

export async function generateSymmetricKey() {
    return await window.crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
}

export async function encryptMessage(symKey, message) {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        symKey,
        encoder.encode(message)
    );
    return { ciphertext, iv };
}

export async function decryptMessage(symKey, ciphertext, iv) {
    const decoder = new TextDecoder();
    const plaintext = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        symKey,
        ciphertext
    );
    return decoder.decode(plaintext);
}

export async function encryptSymKey(pubKey, symKey) {
    const rawSymKey = await window.crypto.subtle.exportKey('raw', symKey);
    return window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, pubKey, rawSymKey);
}

export async function decryptSymKey(privKey, encSymKey) {
    const rawSymKey = await window.crypto.subtle.decrypt(
        { name: 'RSA-OAEP' },
        privKey,
        encSymKey
    );
    return window.crypto.subtle.importKey(
        'raw',
        rawSymKey,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
}