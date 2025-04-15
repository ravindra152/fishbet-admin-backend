export const loadLanguageCsvSchema={
    body: {
        type: 'object',
        properties: {
          userType: { type: 'string' },
          languageCsv: { type: 'object' }
        },
        required: ['userType', 'languageCsv']
    }
}