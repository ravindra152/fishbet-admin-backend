export const getPostalCodeListSchema = {
    query: {
        type: "object",
        properties: {
            limit: { type: ['string', 'null'] },
            pageNo: { type: ['string', 'null'] },
            status: { type: 'string' },
            userId: { type: ['string', 'number'] }
        },
        // required: ['limit', 'pageNo'],
    },
};
