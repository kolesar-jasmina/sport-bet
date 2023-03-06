import { getDatabase, ref, set, get, onValue } from "firebase/database";
import { app } from './auth-api';

export const getAllPredictions = async () => {
    return new Promise((resolve, reject) => {
        const db = getDatabase(app);
        const gamesRef = ref(db, 'predictions');

        onValue(gamesRef, (snapshot) => {
            const allData = [];
            snapshot.forEach((childSnapshot) => {
                const tempData = Object.values(childSnapshot.val())[0];
                const data = JSON.parse(tempData);
                allData.push(data);
            })
            resolve(allData);
        }, {
            onlyOnce: true
        });
    });
}

export const getMetadataForToday = async () => {
    try {
        const response = await fetch('https://example.com/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
};

// export const getPredictionById = async (setData, id) => {
//     const db = getDatabase(app);
//     const gamesRef = ref(db, 'predictions/' + id);
//     onValue(gamesRef, (snapshot) => {
//         const data = snapshot.val();
//         setData(data);
//     });
// };