import { v4 } from 'uuid';

interface IProvider {
  upload(destination: string, file: Express.Multer.File): Promise<any>;
  readStream(filepath: string): Promise<any>;
  delete(filepath: string): Promise<any>;
  metaData(filepath: string): Promise<any>;
  buffer(filepath: string): Promise<any>;
  tempURL(filepath: string, expires?: number): Promise<any>;
}

export abstract class AbstractProvider implements IProvider {
  abstract upload(destination: string, file: Express.Multer.File): Promise<any>;
  abstract readStream(filepath: string): Promise<any>;
  abstract delete(filepath: string): Promise<any>;
  abstract metaData(filepath: string): Promise<any>;
  abstract buffer(filepath: string): Promise<any>;
  abstract tempURL(filepath: string, expires?: number): Promise<any>;

  getExtension(filename: string) {
    return filename.split('.').pop();
  }

  getFilename(filename: string) {
    const newFilename = v4();
    return `${newFilename}.${this.getExtension(filename)}`;
  }
}
