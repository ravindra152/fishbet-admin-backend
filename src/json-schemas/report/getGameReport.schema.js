export const getGameReportSchema = {
  query: {
    type: 'object',
    properties: {
      dateOptions: {
        enum: ['today', 'yesterday', 'monthtodate', 'previousyear', 'custom', 'last7days', 'last30days',
          'last90days', 'weektodate', 'yeartodate', 'previousmonth']
      },
      orderDirection: { enum: ['ASC', 'DESC'] },
      orderBy: { enum: ['game_name', 'gc_wagered', 'sc_wagered', 'sc_won', 'gc_won'] },
      endDate: { type: ['string', 'null'] },
      startDate: { type: ['string', 'null'] },
      tab: { type: 'string' }, // game report based on games or provider
      search: { type: ['string', 'null'] }, // Game name search parameter
      page: { type: 'string' }, // Page number
      pageSize: { type: 'string' } // Page size
    }
  }
} 