import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  // Check if the database connection is healthy
  async isDatabaseHealthy(): Promise<boolean> {
    try {
      const result = await this.connection.db.command({ ping: 1 });
      return result.ok === 1;
    } catch (error) {
      return false;
    }
  }

  // Example: Additional utility functions for database management

  // List all collections in the database
  async listCollections(): Promise<string[]> {
    const collections = await this.connection.db.listCollections().toArray();
    return collections.map((col) => col.name);
  }

  // Drop a specific collection
  async dropCollection(collectionName: string): Promise<boolean> {
    try {
      await this.connection.db.dropCollection(collectionName);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Example: Close the database connection
  async closeConnection(): Promise<void> {
    await this.connection.close();
  }
}
