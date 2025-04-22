import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import connectToDB from '@/app/utils/db';

dotenv.config();

describe('Database Connection Test', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules(); // Clears the cache
        process.env = { ...originalEnv }; // Make a copy of the original environment variables
    });

    afterEach(() => {
        process.env = originalEnv; // Restore original environment variables
    });

    it('should connect to the database successfully', async () => {
        process.env.MONGO_DB_URL = 'mongodb://localhost:27017/testdb';

        const connectSpy = jest.spyOn(mongoose, 'connect').mockResolvedValueOnce(mongoose);

        await connectToDB();

        expect(connectSpy).toHaveBeenCalledWith('mongodb://localhost:27017/testdb');
        connectSpy.mockRestore();
    });

    it('should fail to connect to the database', async () => {
        process.env.MONGO_DB_URL = 'invalid-url';

        const connectSpy = jest.spyOn(mongoose, 'connect').mockRejectedValueOnce(new Error('Invalid connection string'));

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        await connectToDB();

        expect(connectSpy).toHaveBeenCalledWith('invalid-url');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Could not connect to DB, try again', expect.any(Error));

        connectSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});