export const cancelBonusSchema={
    body: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          user: { type: ['object', 'null'] },
          bonusId: { type: ['string', 'null'] },
          userType: { type: ['string', 'null'] },
          userBonusId: { type: ['number', 'null'] },
          adminDetails: { type: ['object', 'null'] }
        },
        required: ['userId']
    }
}