import dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
  mongo: {
    uri: process.env.MONGO_URI,
    options: {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      tls: true,    
      family: 4,     
    },
  },
};

