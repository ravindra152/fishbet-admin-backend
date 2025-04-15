

export const createPackageSchema = {
    body: {
        type: 'object',
        properties: {
            label: { type: 'string' },
            amount: { type: ['string', 'number'] },
            gcCoin: { type: ['string', 'number'], default: 0 },
            scCoin: { type: ['string', 'number'], default: 0 },
            isActive: { type: 'string' },
            isVisibleInStore: { type: 'string' },
            file: { type: 'object' },
            discountAmount: { type: 'string' }
        },
        required: ['label', 'amount', 'gcCoin', 'scCoin']
    }
}
