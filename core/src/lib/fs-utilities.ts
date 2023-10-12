import * as fs from 'fs';
import * as os from 'os';
import path from 'path';
import { once, Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

/**
 * Saves a file to the tmp directory of the OS with specified prefixes for identification
 * @param readable The readable input to be writen to disk
 * @param fileName The name of the file including extension
 * @returns {string} The location of the file on the filesystem
 */
export async function saveFileToTmpAsync(readable: Readable, fileName: string): Promise<string> {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'open-api-base-fs-utilities'));

  const fileFullPath = path.join(tmpDir, 'open-api-base-' + uuidv4() + '-' + fileName);

  const stream = readable.pipe(fs.createWriteStream(fileFullPath, { mode: 0o777 }));

  await once(stream, 'finish');

  return fileFullPath;
}

/**
 * @param array The Uint8Array to be transformed into a buffer
 * @returns {Buffer} the transformed buffer
 */
export function toBuffer(array: Uint8Array): Buffer {
  const buf = Buffer.alloc(array.byteLength);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = array[i];
  }
  return buf;
}
