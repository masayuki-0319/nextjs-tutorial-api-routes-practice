import { MongoClient, Sort } from 'mongodb';

export const connectDatabase = async () => {
  const url = 'mongodb+srv://onioni:ZkNmGsQnuNBWxH2x@cluster0.oxcpg.mongodb.net/newsletter?retryWrites=true&w=majority';
  const client = await MongoClient.connect(url);

  return client;
};

export const insertDocument = async (client: MongoClient, collection: string, document: Object) => {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
};

export const getAllDocuments = async (client: MongoClient, collection: string, sort: Sort) => {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
};
