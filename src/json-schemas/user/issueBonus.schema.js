export const issueBonusSchema={
    body:{
        type: 'object',
        required: ['bonusId', 'action', 'endPoint']
    }
}