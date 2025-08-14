import {
    enablePromise,
    openDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true)


export const connectToDatabase = async () => {
    return openDatabase({
        name: 'tidyUpLocal.db', location: 'default'
    },
    () => {
        console.log('Database opened successfully')
    },
    (error) => {
        console.error(error);
        throw Error('Could not connect to databse')
    }
)
}
