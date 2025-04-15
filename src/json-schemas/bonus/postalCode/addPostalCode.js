export const addPostalCodeSchema = {
    body: {
        type: "object",
        properties: {
            gcCoin: { type: ['number'] },
            scCoin: { type: ['number'] },
            postalCodeValidTill: { type: ['number'] },
        },
        required: ['gcCoin', 'scCoin', 'postalCodeValidTill'],
    },
};