export function decodeBase64(base64: string): string {
  // Decodifica a string Base64
  const decodedString = atob(base64);

  // Cria um buffer a partir da string decodificada
  const buffer = new Uint8Array(decodedString.length);
  for (let i = 0; i < decodedString.length; i++) {
    buffer[i] = decodedString.charCodeAt(i);
  }

  // Converte o buffer em uma string UTF-8
  const utf8String = new TextDecoder('utf-8').decode(buffer);

  return utf8String;
}