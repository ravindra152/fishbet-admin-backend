export const updatePostalCodeRequestSchema = {
    body: {
        type: "object",
        properties: {
            postalCodeId: { type: ['number', 'string'] },
            status: { type: ['string'] },
        },
        required: ['postalCodeId', 'status'],
    },
};