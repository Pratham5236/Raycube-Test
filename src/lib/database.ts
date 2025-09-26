import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

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
  constructor() {
    this.init();
  }

  private async init() {
    try {
      // Create users table
      await client.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT NOT NULL,
          registeredAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Users table created successfully');

      // Create photo_uploads table
      await client.execute(`
        CREATE TABLE IF NOT EXISTS photo_uploads (
          id TEXT PRIMARY KEY,
          filename TEXT NOT NULL,
          originalName TEXT NOT NULL,
          uploadPath TEXT NOT NULL,
          downloadUrl TEXT NOT NULL,
          uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Photo_uploads table created successfully');
    } catch (err) {
      console.error('Error creating tables:', err);
    }
  }

  private async ensureTablesExist() {
    try {
      await client.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT NOT NULL,
          registeredAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      await client.execute(`
        CREATE TABLE IF NOT EXISTS photo_uploads (
          id TEXT PRIMARY KEY,
          filename TEXT NOT NULL,
          originalName TEXT NOT NULL,
          uploadPath TEXT NOT NULL,
          downloadUrl TEXT NOT NULL,
          uploadedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (err) {
      throw err;
    }
  }

  async createUser(user: Omit<User, 'registeredAt'>): Promise<User> {
    await this.ensureTablesExist();
    
    try {
      await client.execute({
        sql: 'INSERT INTO users (id, name, email, phone) VALUES (?, ?, ?, ?)',
        args: [user.id, user.name, user.email, user.phone]
      });
      
      const result = await client.execute({
        sql: 'SELECT * FROM users WHERE id = ?',
        args: [user.id]
      });
      
      return result.rows[0] as User;
    } catch (err) {
      throw err;
    }
  }

  async getAllUsers(): Promise<User[]> {
    await this.ensureTablesExist();
    
    try {
      const result = await client.execute({
        sql: 'SELECT * FROM users ORDER BY registeredAt DESC'
      });
      
      return result.rows as User[];
    } catch (err) {
      throw err;
    }
  }

  async createPhotoUpload(photo: Omit<PhotoUpload, 'uploadedAt'>): Promise<PhotoUpload> {
    await this.ensureTablesExist();
    
    try {
      await client.execute({
        sql: 'INSERT INTO photo_uploads (id, filename, originalName, uploadPath, downloadUrl) VALUES (?, ?, ?, ?, ?)',
        args: [photo.id, photo.filename, photo.originalName, photo.uploadPath, photo.downloadUrl]
      });
      
      const result = await client.execute({
        sql: 'SELECT * FROM photo_uploads WHERE id = ?',
        args: [photo.id]
      });
      
      return result.rows[0] as PhotoUpload;
    } catch (err) {
      throw err;
    }
  }

  async getPhotoUpload(id: string): Promise<PhotoUpload | null> {
    await this.ensureTablesExist();
    
    try {
      const result = await client.execute({
        sql: 'SELECT * FROM photo_uploads WHERE id = ?',
        args: [id]
      });
      
      return result.rows[0] as PhotoUpload | null;
    } catch (err) {
      throw err;
    }
  }

  close() {
    // Turso client doesn't need explicit closing
    // The connection is managed automatically
  }
}

export const database = new Database();