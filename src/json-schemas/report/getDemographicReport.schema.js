export const getDemographicReportSchema={
    query: {
        type: 'object',
        properties: {
          dateOptions: {
            type: ['string', 'null'],
            enum: ['today', 'yesterday', 'monthtodate', 'previousyear', 'custom', 'last7days', 'last30days',
              'last90days', 'weektodate', 'yeartodate', 'previousmonth']
          },
          endDate: { type: ['string', 'null'] },
          startDate: { type: ['string', 'null'] },
          csvDownload: { type: ['string', 'null'] }
        }
    }
}