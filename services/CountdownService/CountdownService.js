import AsyncStorage from '@react-native-async-storage/async-storage';

export function getCountdownList() {

    return new Promise((resolve, reject) => {

        try {

            AsyncStorage.getItem('countdownList')
                .then(data => data == null ? [] : JSON.parse(data))
                .then(data => resolve(data))
                .catch(error => reject(error));

        } catch(exception) {
            reject(exception);
        }
        
    });

}

export function setCountdownList(data) {

    return new Promise((resolve, reject) => {

        try {

            if (!data) {
                reject("missing data");
            }

            AsyncStorage.setItem('countdownList', JSON.stringify(data))
                .then(data => resolve())
                .catch(error => reject(error));

        } catch(exception) {
            reject(exception);
        }
    });

}


export function addCountdown(countdown) {

    return new Promise((resolve, reject) => {

        try {

            if (!countdown) {
                reject("countdown to add is missing");
            }

            getCountdownList()
                .then(countdownList => {

                    countdownList.push(countdown);

                    setCountdownList(countdownList)
                        .then(data => resolve())
                        .catch(error => reject(error));

                }).catch(error => reject(error))



        } catch(exception) {
            reject(exception);
        }

    });
    
}


export function removeCountdown(id) {
    
    return new Promise((resolve, reject) => {

        try {

            if (!id) {
                reject("countdown id is missing");
            }

            getCountdownList()
                .then(countdownList => {

                    let index = countdownList.findIndex((countdown) => countdown.id == id);

                    if (index >= 0) {

                        countdownList.splice(index, 1);

                        setCountdownList(countdownList)
                            .then(data => resolve())
                            .catch(error => reject(error));
                        
                    } else {
                        reject("countdown not found");
                    }

                }).catch(error => reject(error))

        } catch(exception) {
            reject(exception);
        }
    
    });

}


export function editCountdown({id, title, date} = {}) {

    return new Promise((resolve, reject) => {

        try {

            if (!id || !title || !date) {
                reject('missing required data to edit countdown');
            }

            getCountdownList()
                .then(countdownList => {

                    let index = countdownList.findIndex((countdown) => countdown.id == id);

                    if (index >= 0) {

                        countdownList[index].title = title;
                        countdownList[index].date = new Date(date);

                        setCountdownList(countdownList)
                            .then(data => resolve())
                            .catch(error => reject(error));

                    } else {
                        reject("countdown not found");
                    }

                }).catch(error => reject(error))



        } catch(exception) {
            reject(exception);
        }

    });

}

const CountdownService = {
    getCountdownList,
    setCountdownList,
    addCountdown,
    removeCountdown,
    editCountdown
}

export default CountdownService;
