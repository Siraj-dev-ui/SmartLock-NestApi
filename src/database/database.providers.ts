import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://smartlock:<smartlock>@cluster0.ngqnqr3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      ),
  },
];
