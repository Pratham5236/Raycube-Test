import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.sqlite');

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
}

export interface PhotoUpload {
  id: string;
  filename: string;
  originalName: string;
  uploadPath: string;
  downloadUrl: string;
  uploadedAt: string;
}

class Database {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(dbPath);
    this.init();
  }

  private init() {
    // Create users table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        registeredAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating users table:', err);
      } else {
        console.log('Users table created successfully');
      }
    });

    // Create photo_uploads table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS photo_uploads (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL,
        originalName TEXT NOT NULL,
        uploadPath TEXT NOT NULL,
        downloadUrl TEXT NOT NULL,
        uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating photo_uploads table:', err);
      } else {
        console.log('Photo_uploads table created successfully');
      }
    });
  }

  private async ensureTablesExist() {
    return new Promise<void>((resolve, reject) => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT NOT NULL,
          registeredAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          reject(err);
          return;
        }
        
        this.db.run(`
          CREATE TABLE IF NOT EXISTS photo_uploads (
            id TEXT PRIMARY KEY,
            filename TEXT NOT NULL,
            originalName TEXT NOT NULL,
            uploadPath TEXT NOT NULL,
            downloadUrl TEXT NOT NULL,
            uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }

  async createUser(user: Omit<User, 'registeredAt'>): Promise<User> {
    await this.ensureTablesExist();
    
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO users (id, name, email, phone) VALUES (?, ?, ?, ?)',
        [user.id, user.name, user.email, user.phone],
        (err: any) => {
          if (err) {
            reject(err);
            return;
          }
          
          this.db.get(
            'SELECT * FROM users WHERE id = ?',
            [user.id],
            (err: any, row: any) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(row as User);
            }
          );
        }
      );
    });
  }

  async getAllUsers(): Promise<User[]> {
    await this.ensureTablesExist();
    
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM users ORDER BY registeredAt DESC',
        (err: any, rows: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(rows as User[]);
        }
      );
    });
  }

  async createPhotoUpload(photo: Omit<PhotoUpload, 'uploadedAt'>): Promise<PhotoUpload> {
    await this.ensureTablesExist();
    
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO photo_uploads (id, filename, originalName, uploadPath, downloadUrl) VALUES (?, ?, ?, ?, ?)',
        [photo.id, photo.filename, photo.originalName, photo.uploadPath, photo.downloadUrl],
        (err: any) => {
          if (err) {
            reject(err);
            return;
          }
          
          this.db.get(
            'SELECT * FROM photo_uploads WHERE id = ?',
            [photo.id],
            (err: any, row: any) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(row as PhotoUpload);
            }
          );
        }
      );
    });
  }

  async getPhotoUpload(id: string): Promise<PhotoUpload | null> {
    await this.ensureTablesExist();
    
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM photo_uploads WHERE id = ?',
        [id],
        (err: any, row: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(row as PhotoUpload | null);
        }
      );
    });
  }

  close() {
    this.db.close();
  }
}

export const database = new Database();