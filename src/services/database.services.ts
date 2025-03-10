import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import { config } from 'dotenv';
import User from '~/models/schemas/User.shema';
config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.qsivg.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`;


const client = new MongoClient(uri);


class DatabaseService {
    private client: MongoClient;
    private db: Db;
    constructor() {
        this.client = new MongoClient(uri);
        this.db = this.client.db(process.env.DB_NAME);
    }

    async connect() {

        try {

            // Send a ping to confirm a successful connection
            await this.db.command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } catch (error) {
            console.error("Unable to connect to MongoDB. Error:", error);
            throw error;
        }

    }

    get users(): Collection<User> {
        return this.db.collection(process.env.DB_USERS_COLLECTION as string);
    }


}

//tao object tu class Database  
const databaseService = new DatabaseService();
export default databaseService;
