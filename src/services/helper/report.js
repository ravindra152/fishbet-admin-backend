import { Op } from 'sequelize'
import { getOne } from './crud'
import db from '@src/db/models'
import logger from '@src/libs/logger'
import { filterByDateCreatedAt, getOtherCurrenciesAmount } from '@src/utils/common'
import { ACTION, AMOUNT_TYPE, STATUS_VALUE, TRANSACTION_STATUS, TRANSACTION_TYPE } from '@src/utils/constant'

export const MODEL_TYPE = {
  CASINO: 'casino-transaction',
  BANKING: 'transaction-banking'
}

export const internationalNumberFormatter = (number) => {
  return new Intl.NumberFormat('en-EU').format(number)
}

export const getKPIReportFilterDates = () => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  const yesterday = d.toISOString().substring(0, 10)
  const today = (new Date()).toISOString().substring(0, 10)

  const date = new Date()
  const offset = date.getTimezoneOffset()

  let monthStartDate = new Date((new Date(date.getFullYear(), date.getMonth(), 1)).getTime() - (offset * 60 * 1000))
  monthStartDate = monthStartDate.toISOString().split('T')[0]

  let previousMonthStartDate = new Date((new Date(date.getFullYear() - (date.getMonth() > 0 ? 0 : 1), (date.getMonth() - 1 + 12) % 12, 1)).getTime() - (offset * 60 * 1000))
  previousMonthStartDate = previousMonthStartDate.toISOString().split('T')[0]

  const newDate = new Date()
  newDate.setMonth(((newDate.getMonth() - 1 + 12) % 12))
  const perviousMonthToday = newDate.toISOString().split('T')[0]

  return { today, yesterday, monthStartDate, previousMonthStartDate, perviousMonthToday }
}

// For KPI Report (Bet Counts, Bet Amounts)
export const getBetQuery = ({ query, startDate, endDate }) => {
  const { today, yesterday, monthStartDate, previousMonthStartDate, perviousMonthToday } = getKPIReportFilterDates()

  if (!startDate) startDate = today
  if (!endDate) endDate = today

  query.bool.must.push({ match: { status: TRANSACTION_STATUS.SUCCESS } })
  query.bool.must.push({ match: { modelType: MODEL_TYPE.CASINO } })
  query.bool.must.push({ match: { amountType: AMOUNT_TYPE.CASH } })

  const aggs = {
    today: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: today,
                to: today
              }
            }
          }
        }
      },
      aggs: {
        totalWin: {
          filter: { term: { transactionType: ACTION.WIN } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        totalBet: {
          filter: { term: { transactionType: ACTION.BET } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        GGR: {
          bucket_script: {
            buckets_path: {
              win: 'totalWin>amount',
              bet: 'totalBet>amount'
            },
            script: 'params.bet - params.win'
          }
        }
      }
    },
    yesterday: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: yesterday,
                to: yesterday
              }
            }
          }
        }
      },
      aggs: {
        totalWin: {
          filter: { term: { transactionType: ACTION.WIN } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        totalBet: {
          filter: { term: { transactionType: ACTION.BET } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        GGR: {
          bucket_script: {
            buckets_path: {
              win: 'totalWin>amount',
              bet: 'totalBet>amount'
            },
            script: 'params.bet - params.win'
          }
        }
      }
    },
    monthToDate: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: monthStartDate,
                to: today
              }
            }
          }
        }
      },
      aggs: {
        totalWin: {
          filter: { term: { transactionType: ACTION.WIN } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        totalBet: {
          filter: { term: { transactionType: ACTION.BET } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        GGR: {
          bucket_script: {
            buckets_path: {
              win: 'totalWin>amount',
              bet: 'totalBet>amount'
            },
            script: 'params.bet - params.win'
          }
        }
      }
    },
    prevMonthToDate: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: previousMonthStartDate,
                to: perviousMonthToday
              }
            }
          }
        }
      },
      aggs: {
        totalWin: {
          filter: { term: { transactionType: ACTION.WIN } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        totalBet: {
          filter: { term: { transactionType: ACTION.BET } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        GGR: {
          bucket_script: {
            buckets_path: {
              win: 'totalWin>amount',
              bet: 'totalBet>amount'
            },
            script: 'params.bet - params.win'
          }
        }
      }
    },
    customDate: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: startDate,
                to: endDate
              }
            }
          }
        }
      },
      aggs: {
        totalWin: {
          filter: { term: { transactionType: ACTION.WIN } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        totalBet: {
          filter: { term: { transactionType: ACTION.BET } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        GGR: {
          bucket_script: {
            buckets_path: {
              win: 'totalWin>amount',
              bet: 'totalBet>amount'
            },
            script: 'params.bet - params.win'
          }
        }
      }
    }
  }

  return { query, aggs }
}

// for internal ggr
export const getBetQueryInternal = ({ query, startDate, endDate }) => {
  const { today, yesterday, monthStartDate, previousMonthStartDate, perviousMonthToday } = getKPIReportFilterDates()

  if (!startDate) startDate = today
  if (!endDate) endDate = today

  query.bool.must.push({ match: { status: TRANSACTION_STATUS.SUCCESS } })
  query.bool.must.push({ match: { modelType: MODEL_TYPE.CASINO } })

  const aggs = {
    today: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: today,
                to: today
              }
            }
          }
        }
      },
      aggs: {
        totalWin: {
          filter: { term: { transactionType: ACTION.INTERNAL.win.toLowerCase() } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        totalBet: {
          filter: { term: { transactionType: ACTION.INTERNAL.bet.toLowerCase() } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        GGR: {
          bucket_script: {
            buckets_path: {
              win: 'totalWin>amount',
              bet: 'totalBet>amount'
            },
            script: 'params.bet - params.win'
          }
        }
      }
    },
    yesterday: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: yesterday,
                to: yesterday
              }
            }
          }
        }
      },
      aggs: {
        totalWin: {
          filter: { term: { transactionType: ACTION.INTERNAL.win.toLowerCase() } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        totalBet: {
          filter: { term: { transactionType: ACTION.INTERNAL.bet.toLowerCase() } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        GGR: {
          bucket_script: {
            buckets_path: {
              win: 'totalWin>amount',
              bet: 'totalBet>amount'
            },
            script: 'params.bet - params.win'
          }
        }
      }
    },
    monthToDate: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: monthStartDate,
                to: today
              }
            }
          }
        }
      },
      aggs: {
        totalWin: {
          filter: { term: { transactionType: ACTION.INTERNAL.win.toLowerCase() } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        totalBet: {
          filter: { term: { transactionType: ACTION.INTERNAL.bet.toLowerCase() } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        GGR: {
          bucket_script: {
            buckets_path: {
              win: 'totalWin>amount',
              bet: 'totalBet>amount'
            },
            script: 'params.bet - params.win'
          }
        }
      }
    },
    prevMonthToDate: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: previousMonthStartDate,
                to: perviousMonthToday
              }
            }
          }
        }
      },
      aggs: {
        totalWin: {
          filter: { term: { transactionType: ACTION.INTERNAL.win.toLowerCase() } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        totalBet: {
          filter: { term: { transactionType: ACTION.INTERNAL.bet.toLowerCase() } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        GGR: {
          bucket_script: {
            buckets_path: {
              win: 'totalWin>amount',
              bet: 'totalBet>amount'
            },
            script: 'params.bet - params.win'
          }
        }
      }
    },
    customDate: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: startDate,
                to: endDate
              }
            }
          }
        }
      },
      aggs: {
        totalWin: {
          filter: { term: { transactionType: ACTION.INTERNAL.win.toLowerCase() } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        totalBet: {
          filter: { term: { transactionType: ACTION.INTERNAL.bet.toLowerCase() } },
          aggs: {
            amount: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        },
        GGR: {
          bucket_script: {
            buckets_path: {
              win: 'totalWin>amount',
              bet: 'totalBet>amount'
            },
            script: 'params.bet - params.win'
          }
        }
      }
    }
  }

  return { query, aggs }
}

export const getNewPlayers = async ({ query, startDate, endDate }) => {
  const { today, yesterday, monthStartDate, previousMonthStartDate, perviousMonthToday } = getKPIReportFilterDates()
  const newPlayers = {}

  if (!startDate) startDate = today
  if (!endDate) endDate = today

  newPlayers.today = await db.User.count({ where: filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), today, today, 'User') })
  newPlayers.yesterday = await db.User.count({ where: filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), yesterday, yesterday, 'User') })
  newPlayers.monthToDate = await db.User.count({ where: filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), monthStartDate, today, 'User') })
  newPlayers.prevMonthToDate = await db.User.count({ where: filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), previousMonthStartDate, perviousMonthToday, 'User') })
  newPlayers.customDate = await db.User.count({ where: filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), startDate, endDate, 'User') })
  newPlayers.delta = createDelta(newPlayers.monthToDate, newPlayers.prevMonthToDate)

  return newPlayers
}

export const createDepositConvRate = (DepositCount, RegisterCount) => {
  if (RegisterCount === 0) return 0.0
  return Math.abs((DepositCount / RegisterCount) * 100).toFixed(2)
}

export const getDepositConversionRate = (Deposits, users) => {
  const depositConvRate = {}

  depositConvRate.today = createDepositConvRate(Deposits.today.buckets.transactions.newDepositors.count.value, users.today)
  depositConvRate.yesterday = createDepositConvRate(Deposits.yesterday.buckets.transactions.newDepositors.count.value, users.yesterday)
  depositConvRate.monthToDate = createDepositConvRate(Deposits.monthToDate.buckets.transactions.newDepositors.count.value, users.monthToDate)
  depositConvRate.prevMonthToDate = createDepositConvRate(Deposits.prevMonthToDate.buckets.transactions.newDepositors.count.value, users.prevMonthToDate)
  depositConvRate.customDate = createDepositConvRate(Deposits.customDate.buckets.transactions.newDepositors.count.value, users.customDate)
  depositConvRate.delta = createDelta(parseFloat(depositConvRate.monthToDate), parseFloat(depositConvRate.prevMonthToDate))

  return depositConvRate
}

export const createDelta = (month, prevMonth) => {
  if (month === undefined && prevMonth === undefined) return 0.0
  if (month === undefined) month = 0
  if (prevMonth === undefined) prevMonth = 0

  month = parseFloat(month.toString().replace(/,/g, ''))
  prevMonth = parseFloat(prevMonth.toString().replace(/,/g, ''))

  if (prevMonth === 0 && month === 0) return 0.0
  if (prevMonth === 0 && month > 0) return 100
  if (prevMonth === 0 && month < 0) return -100
  return (((month - prevMonth) / Math.abs(prevMonth)) * 100).toFixed(2)
}

export const createKpiSummaryResponse = (KPISummary) => {
  const response = []

  response.push({
    rowName: 'Pending Withdrawals (Globally)',
    type: 'amount',
    ...KPISummary.withdraw.totalPendingWithdraws
  })

  response.push({
    rowName: 'Pending Withdrawals (Kyc Requested)',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.withdraw.kycRequested.today.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.withdraw.kycRequested.yesterday.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.withdraw.kycRequested.monthToDate.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.withdraw.kycRequested.prevMonthToDate.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.withdraw.kycRequested.customDate.toFixed(2)),
    delta: KPISummary.withdraw.kycRequested.delta
  })

  response.push({
    rowName: 'Pending Withdrawals (Kyc Approved)',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.withdraw.kycApproved.today.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.withdraw.kycApproved.yesterday.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.withdraw.kycApproved.monthToDate.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.withdraw.kycApproved.prevMonthToDate.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.withdraw.kycApproved.customDate.toFixed(2)),
    delta: KPISummary.withdraw.kycApproved.delta
  })

  response.push({
    rowName: 'Pending Withdrawals (Kyc Pending)',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.withdraw.kycPending.today.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.withdraw.kycPending.yesterday.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.withdraw.kycPending.monthToDate.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.withdraw.kycPending.prevMonthToDate.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.withdraw.kycPending.customDate.toFixed(2)),
    delta: KPISummary.withdraw.kycPending.delta
  })

  response.push({
    rowName: 'Withdrawals',
    type: 'amount',
    ...KPISummary.withdraw.withdrawals
  })

  response.push({
    rowName: 'Bet Count',
    type: 'count',
    today: internationalNumberFormatter(KPISummary.betCountsAndAmounts.today.buckets.transactions.totalBet.count.value),
    yesterday: internationalNumberFormatter(KPISummary.betCountsAndAmounts.yesterday.buckets.transactions.totalBet.count.value),
    monthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.monthToDate.buckets.transactions.totalBet.count.value),
    prevMonthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.prevMonthToDate.buckets.transactions.totalBet.count.value),
    customDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.customDate.buckets.transactions.totalBet.count.value),
    delta: createDelta(KPISummary.betCountsAndAmounts.monthToDate.buckets.transactions.totalBet.count.value, KPISummary.betCountsAndAmounts.prevMonthToDate.buckets.transactions.totalBet.count.value) + ' %'
  })

  response.push({
    rowName: 'Bet Amount',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.betCountsAndAmounts.today.buckets.transactions.totalBet.amount.value?.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.betCountsAndAmounts.yesterday.buckets.transactions.totalBet.amount.value?.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.monthToDate.buckets.transactions.totalBet.amount.value?.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.prevMonthToDate.buckets.transactions.totalBet.amount.value?.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.customDate.buckets.transactions.totalBet.amount.value?.toFixed(2)),
    delta: createDelta(KPISummary.betCountsAndAmounts.monthToDate.buckets.transactions.totalBet.amount.value, KPISummary.betCountsAndAmounts.prevMonthToDate.buckets.transactions.totalBet.amount.value) + ' %'
  })

  response.push({
    rowName: 'Win Count',
    type: 'count',
    today: internationalNumberFormatter(KPISummary.betCountsAndAmounts.today.buckets.transactions.totalWin.count.value),
    yesterday: internationalNumberFormatter(KPISummary.betCountsAndAmounts.yesterday.buckets.transactions.totalWin.count.value),
    monthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.monthToDate.buckets.transactions.totalWin.count.value),
    prevMonthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.prevMonthToDate.buckets.transactions.totalWin.count.value),
    customDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.customDate.buckets.transactions.totalWin.count.value),
    delta: createDelta(KPISummary.betCountsAndAmounts.monthToDate.buckets.transactions.totalWin.count.value, KPISummary.betCountsAndAmounts.prevMonthToDate.buckets.transactions.totalWin.count.value) + ' %'
  })

  response.push({
    rowName: 'Win Amount',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.betCountsAndAmounts.today.buckets.transactions.totalWin.amount.value?.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.betCountsAndAmounts.yesterday.buckets.transactions.totalWin.amount.value?.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.monthToDate.buckets.transactions.totalWin.amount.value?.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.prevMonthToDate.buckets.transactions.totalWin.amount.value?.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.customDate.buckets.transactions.totalWin.amount.value?.toFixed(2)),
    delta: createDelta(KPISummary.betCountsAndAmounts.monthToDate.buckets.transactions.totalWin.amount.value, KPISummary.betCountsAndAmounts.prevMonthToDate.buckets.transactions.totalWin.amount.value) + ' %'
  })

  response.push({
    rowName: 'GGR',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.betCountsAndAmounts.today.buckets.transactions?.GGR?.value?.toFixed(2) || 0.00),
    yesterday: internationalNumberFormatter(KPISummary.betCountsAndAmounts.yesterday.buckets.transactions?.GGR?.value?.toFixed(2) || 0.00),
    monthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.monthToDate.buckets.transactions?.GGR?.value?.toFixed(2) || 0.00),
    prevMonthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.prevMonthToDate.buckets.transactions?.GGR?.value?.toFixed(2) || 0.00),
    customDate: internationalNumberFormatter(KPISummary.betCountsAndAmounts.customDate.buckets.transactions?.GGR?.value?.toFixed(2) || 0.00),
    delta: createDelta(KPISummary.betCountsAndAmounts.monthToDate.buckets.transactions?.GGR?.value || 0.00, KPISummary.betCountsAndAmounts.prevMonthToDate.buckets.transactions?.GGR?.value || 0.00) + ' %'
  })

  response.push({
    rowName: 'Bonus Count',
    type: 'count',
    today: internationalNumberFormatter(KPISummary.bonusCountAndAmount.today.buckets.transactions.bonus.count.value),
    yesterday: internationalNumberFormatter(KPISummary.bonusCountAndAmount.yesterday.buckets.transactions.bonus.count.value),
    monthToDate: internationalNumberFormatter(KPISummary.bonusCountAndAmount.monthToDate.buckets.transactions.bonus.count.value),
    prevMonthToDate: internationalNumberFormatter(KPISummary.bonusCountAndAmount.prevMonthToDate.buckets.transactions.bonus.count.value),
    customDate: internationalNumberFormatter(KPISummary.bonusCountAndAmount.customDate.buckets.transactions.bonus.count.value),
    delta: createDelta(KPISummary.bonusCountAndAmount.monthToDate.buckets.transactions.bonus.count.value, KPISummary.bonusCountAndAmount.prevMonthToDate.buckets.transactions.bonus.count.value) + ' %'
  })

  response.push({
    rowName: 'Bonus Amount',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.bonusCountAndAmount.today.buckets.transactions.bonus?.sum?.value?.toFixed(2) || 0.00),
    yesterday: internationalNumberFormatter(KPISummary.bonusCountAndAmount.yesterday.buckets.transactions.bonus?.sum?.value?.toFixed(2) || 0.00),
    monthToDate: internationalNumberFormatter(KPISummary.bonusCountAndAmount.monthToDate.buckets.transactions.bonus?.sum?.value?.toFixed(2) || 0.00),
    prevMonthToDate: internationalNumberFormatter(KPISummary.bonusCountAndAmount.prevMonthToDate.buckets.transactions.bonus?.sum?.value?.toFixed(2) || 0.00),
    customDate: internationalNumberFormatter(KPISummary.bonusCountAndAmount.customDate.buckets.transactions.bonus?.sum?.value?.toFixed(2) || 0.00),
    delta: createDelta(KPISummary.bonusCountAndAmount.monthToDate.buckets.transactions.bonus?.sum?.value, KPISummary.bonusCountAndAmount.prevMonthToDate.buckets.transactions.bonus?.sum?.value) + ' %'
  })

  response.push({
    rowName: 'Bonus Win',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.bonusBetsAndWins.today.buckets.transactions.bonusWin.sum.value?.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.bonusBetsAndWins.yesterday.buckets.transactions.bonusWin.sum.value?.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.bonusBetsAndWins.monthToDate.buckets.transactions.bonusWin.sum.value?.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.bonusBetsAndWins.prevMonthToDate.buckets.transactions.bonusWin.sum.value?.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.bonusBetsAndWins.customDate.buckets.transactions.bonusWin.sum.value?.toFixed(2)),
    delta: createDelta(KPISummary.bonusBetsAndWins.monthToDate.buckets.transactions.bonusWin.sum.value, KPISummary.bonusBetsAndWins.prevMonthToDate.buckets.transactions.bonusWin.sum.value) + ' %'
  })

  response.push({
    rowName: 'Bonus Bet',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.bonusBetsAndWins.today.buckets.transactions.bonusBet.sum.value?.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.bonusBetsAndWins.yesterday.buckets.transactions.bonusBet.sum.value?.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.bonusBetsAndWins.monthToDate.buckets.transactions.bonusBet.sum.value?.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.bonusBetsAndWins.prevMonthToDate.buckets.transactions.bonusBet.sum.value?.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.bonusBetsAndWins.customDate.buckets.transactions.bonusBet.sum.value?.toFixed(2)),
    delta: createDelta(KPISummary.bonusBetsAndWins.monthToDate.buckets.transactions.bonusBet.sum.value, KPISummary.bonusBetsAndWins.prevMonthToDate.buckets.transactions.bonusBet.sum.value) + ' %'
  })

  response.push({
    rowName: 'Bonus GGR',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.bonusBetsAndWins.today.buckets.transactions?.bonusGGR?.value?.toFixed(2) || 0.00),
    yesterday: internationalNumberFormatter(KPISummary.bonusBetsAndWins.yesterday.buckets.transactions?.bonusGGR?.value?.toFixed(2) || 0.00),
    monthToDate: internationalNumberFormatter(KPISummary.bonusBetsAndWins.monthToDate.buckets.transactions?.bonusGGR?.value?.toFixed(2) || 0.00),
    prevMonthToDate: internationalNumberFormatter(KPISummary.bonusBetsAndWins.prevMonthToDate.buckets.transactions?.bonusGGR?.value?.toFixed(2) || 0.00),
    customDate: internationalNumberFormatter(KPISummary.bonusBetsAndWins.customDate.buckets.transactions?.bonusGGR?.value?.toFixed(2) || 0.00),
    delta: createDelta(KPISummary.bonusBetsAndWins.monthToDate.buckets.transactions?.bonusGGR?.value || 0.00, KPISummary.bonusBetsAndWins.prevMonthToDate.buckets.transactions?.bonusGGR?.value || 0.00) + ' %'
  })

  response.push({
    rowName: 'Deposits',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.depositCountAndDepositAmount.today.buckets.transactions.deposits.sum.value?.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.depositCountAndDepositAmount.yesterday.buckets.transactions.deposits.sum.value?.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.depositCountAndDepositAmount.monthToDate.buckets.transactions.deposits.sum.value?.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.depositCountAndDepositAmount.prevMonthToDate.buckets.transactions.deposits.sum.value?.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.depositCountAndDepositAmount.customDate.buckets.transactions.deposits.sum.value?.toFixed(2)),
    delta: createDelta(KPISummary.depositCountAndDepositAmount.monthToDate.buckets.transactions.deposits.sum.value, KPISummary.depositCountAndDepositAmount.prevMonthToDate.buckets.transactions.deposits.sum.value) + ' %'
  })

  response.push({
    rowName: 'Depositors',
    type: 'count',
    today: internationalNumberFormatter(KPISummary.depositCountAndDepositAmount.today.buckets.transactions.depositors.count.buckets.length),
    yesterday: internationalNumberFormatter(KPISummary.depositCountAndDepositAmount.yesterday.buckets.transactions.depositors.count.buckets.length),
    monthToDate: internationalNumberFormatter(KPISummary.depositCountAndDepositAmount.monthToDate.buckets.transactions.depositors.count.buckets.length),
    prevMonthToDate: internationalNumberFormatter(KPISummary.depositCountAndDepositAmount.prevMonthToDate.buckets.transactions.depositors.count.buckets.length),
    customDate: internationalNumberFormatter(KPISummary.depositCountAndDepositAmount.customDate.buckets.transactions.depositors.count.buckets.length),
    delta: createDelta(KPISummary.depositCountAndDepositAmount.monthToDate.buckets.transactions.depositors.count.buckets.length, KPISummary.depositCountAndDepositAmount.prevMonthToDate.buckets.transactions.depositors.count.buckets.length) + ' %'
  })

  response.push({
    rowName: 'Active Users',
    type: 'count',
    today: internationalNumberFormatter(KPISummary.activeUsers.today.buckets.transactions.activePlayers.count.buckets.length),
    yesterday: internationalNumberFormatter(KPISummary.activeUsers.yesterday.buckets.transactions.activePlayers.count.buckets.length),
    monthToDate: internationalNumberFormatter(KPISummary.activeUsers.monthToDate.buckets.transactions.activePlayers.count.buckets.length),
    prevMonthToDate: internationalNumberFormatter(KPISummary.activeUsers.prevMonthToDate.buckets.transactions.activePlayers.count.buckets.length),
    customDate: internationalNumberFormatter(KPISummary.activeUsers.customDate.buckets.transactions.activePlayers.count.buckets.length),
    delta: createDelta(KPISummary.activeUsers.monthToDate.buckets.transactions.activePlayers.count.buckets.length, KPISummary.activeUsers.prevMonthToDate.buckets.transactions.activePlayers.count.buckets.length) + ' %'
  })

  response.push({
    rowName: 'New Players',
    type: 'count',
    today: internationalNumberFormatter(KPISummary.newPlayers.today),
    yesterday: internationalNumberFormatter(KPISummary.newPlayers.yesterday),
    monthToDate: internationalNumberFormatter(KPISummary.newPlayers.monthToDate),
    prevMonthToDate: internationalNumberFormatter(KPISummary.newPlayers.prevMonthToDate),
    customDate: internationalNumberFormatter(KPISummary.newPlayers.customDate),
    delta: KPISummary.newPlayers.delta + ' %'
  })

  response.push({
    rowName: 'New Depositors',
    type: 'count',
    today: internationalNumberFormatter(KPISummary.newDepositors.today.buckets.transactions.newDepositors.count.value),
    yesterday: internationalNumberFormatter(KPISummary.newDepositors.yesterday.buckets.transactions.newDepositors.count.value),
    monthToDate: internationalNumberFormatter(KPISummary.newDepositors.monthToDate.buckets.transactions.newDepositors.count.value),
    prevMonthToDate: internationalNumberFormatter(KPISummary.newDepositors.prevMonthToDate.buckets.transactions.newDepositors.count.value),
    customDate: internationalNumberFormatter(KPISummary.newDepositors.customDate.buckets.transactions.newDepositors.count.value),
    delta: createDelta(KPISummary.newDepositors.monthToDate.buckets.transactions.newDepositors.count.value, KPISummary.newDepositors.prevMonthToDate.buckets.transactions.newDepositors.count.value) + ' %'
  })

  response.push({
    rowName: 'Deposit Conv Rate',
    type: 'rate',
    today: KPISummary.depositConversionRate.today + ' %',
    yesterday: KPISummary.depositConversionRate.yesterday + ' %',
    monthToDate: KPISummary.depositConversionRate.monthToDate + ' %',
    prevMonthToDate: KPISummary.depositConversionRate.prevMonthToDate + ' %',
    customDate: KPISummary.depositConversionRate.customDate + ' %',
    delta: KPISummary.depositConversionRate.delta + ' %'
  })

  response.push({
    rowName: 'Add Money (Internal)',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.internalAddMoneyCountAndAmount.today.buckets.transactions.deposits.sum.value?.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.internalAddMoneyCountAndAmount.yesterday.buckets.transactions.deposits.sum.value?.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.internalAddMoneyCountAndAmount.monthToDate.buckets.transactions.deposits.sum.value?.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.internalAddMoneyCountAndAmount.prevMonthToDate.buckets.transactions.deposits.sum.value?.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.internalAddMoneyCountAndAmount.customDate.buckets.transactions.deposits.sum.value?.toFixed(2)),
    delta: createDelta(KPISummary.internalAddMoneyCountAndAmount.monthToDate.buckets.transactions.deposits.sum.value, KPISummary.depositCountAndDepositAmount.prevMonthToDate.buckets.transactions.deposits.sum.value) + ' %'
  })

  response.push({
    rowName: 'Remove Money (Internal)',
    type: 'amount',
    ...KPISummary.withdraw.internalRemoveMoney
  })

  response.push({
    rowName: 'Deposit (Internal)',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.internalDepositCountAndAmount.today.buckets.transactions.deposits.sum.value?.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.internalDepositCountAndAmount.yesterday.buckets.transactions.deposits.sum.value?.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.internalDepositCountAndAmount.monthToDate.buckets.transactions.deposits.sum.value?.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.internalDepositCountAndAmount.prevMonthToDate.buckets.transactions.deposits.sum.value?.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.internalDepositCountAndAmount.customDate.buckets.transactions.deposits.sum.value?.toFixed(2)),
    delta: createDelta(KPISummary.internalDepositCountAndAmount.monthToDate.buckets.transactions.deposits.sum.value, KPISummary.depositCountAndDepositAmount.prevMonthToDate.buckets.transactions.deposits.sum.value) + ' %'
  })

  response.push({
    rowName: 'Withdrawals (Internal)',
    type: 'amount',
    ...KPISummary.withdraw.internalWithdrawals
  })

  response.push({
    rowName: 'Bet Count (Internal)',
    type: 'count',
    today: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.today.buckets.transactions.totalBet.count.value),
    yesterday: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.yesterday.buckets.transactions.totalBet.count.value),
    monthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.monthToDate.buckets.transactions.totalBet.count.value),
    prevMonthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.prevMonthToDate.buckets.transactions.totalBet.count.value),
    customDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.customDate.buckets.transactions.totalBet.count.value),
    delta: createDelta(KPISummary.betCountsAndAmountsInternal.monthToDate.buckets.transactions.totalBet.count.value, KPISummary.betCountsAndAmountsInternal.prevMonthToDate.buckets.transactions.totalBet.count.value) + ' %'
  })

  response.push({
    rowName: 'Win Count (Internal)',
    type: 'count',
    today: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.today.buckets.transactions.totalWin.count.value),
    yesterday: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.yesterday.buckets.transactions.totalWin.count.value),
    monthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.monthToDate.buckets.transactions.totalWin.count.value),
    prevMonthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.prevMonthToDate.buckets.transactions.totalWin.count.value),
    customDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.customDate.buckets.transactions.totalWin.count.value),
    delta: createDelta(KPISummary.betCountsAndAmountsInternal.monthToDate.buckets.transactions.totalWin.count.value, KPISummary.betCountsAndAmountsInternal.prevMonthToDate.buckets.transactions.totalWin.count.value) + ' %'
  })

  response.push({
    rowName: 'Bet Amount (Internal)',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.today.buckets.transactions.totalBet.amount.value?.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.yesterday.buckets.transactions.totalBet.amount.value?.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.monthToDate.buckets.transactions.totalBet.amount.value?.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.prevMonthToDate.buckets.transactions.totalBet.amount.value?.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.customDate.buckets.transactions.totalBet.amount.value?.toFixed(2)),
    delta: createDelta(KPISummary.betCountsAndAmountsInternal.monthToDate.buckets.transactions.totalBet.amount.value, KPISummary.betCountsAndAmountsInternal.prevMonthToDate.buckets.transactions.totalBet.amount.value) + ' %'
  })

  response.push({
    rowName: 'Win Amount (Internal)',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.today.buckets.transactions.totalWin.amount.value?.toFixed(2)),
    yesterday: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.yesterday.buckets.transactions.totalWin.amount.value?.toFixed(2)),
    monthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.monthToDate.buckets.transactions.totalWin.amount.value?.toFixed(2)),
    prevMonthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.prevMonthToDate.buckets.transactions.totalWin.amount.value?.toFixed(2)),
    customDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.customDate.buckets.transactions.totalWin.amount.value?.toFixed(2)),
    delta: createDelta(KPISummary.betCountsAndAmountsInternal.monthToDate.buckets.transactions.totalWin.amount.value, KPISummary.betCountsAndAmountsInternal.prevMonthToDate.buckets.transactions.totalWin.amount.value) + ' %'
  })

  response.push({
    rowName: 'GGR (Internal)',
    type: 'amount',
    today: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.today.buckets.transactions?.GGR?.value?.toFixed(2) || 0.00),
    yesterday: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.yesterday.buckets.transactions?.GGR?.value?.toFixed(2) || 0.00),
    monthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.monthToDate.buckets.transactions?.GGR?.value?.toFixed(2) || 0.00),
    prevMonthToDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.prevMonthToDate.buckets.transactions?.GGR?.value?.toFixed(2) || 0.00),
    customDate: internationalNumberFormatter(KPISummary.betCountsAndAmountsInternal.customDate.buckets.transactions?.GGR?.value?.toFixed(2) || 0.00),
    delta: createDelta(KPISummary.betCountsAndAmountsInternal.monthToDate.buckets.transactions?.GGR?.value || 0.00, KPISummary.betCountsAndAmountsInternal.prevMonthToDate.buckets.transactions?.GGR?.value || 0.00) + ' %'
  })

  return response
}

export const getRealBetandRealWinQuery = ({ query, startDate, endDate, groupBy }) => {
  query.bool.must.push({ match: { status: TRANSACTION_STATUS.SUCCESS } })
  query.bool.must.push({ match: { modelType: MODEL_TYPE.CASINO } })
  query.bool.must.push({ match: { amountType: AMOUNT_TYPE.CASH } })

  const aggs = {
    date: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: startDate,
                to: endDate
              }
            }
          }
        }
      },
      aggs: {
        group_by_provider: {
          terms: {
            field: groupBy,
            size: 2147483647
          },
          aggs: {
            realWin: {
              filter: { term: { transactionType: ACTION.WIN } },
              aggs: {
                amount: {
                  sum: {
                    field: 'transactionAmountPrimary'
                  }
                }
              }
            },
            realBet: {
              filter: { term: { transactionType: ACTION.BET } },
              aggs: {
                amount: {
                  sum: {
                    field: 'transactionAmountPrimary'
                  }
                }
              }
            },
            GGR: {
              bucket_script: {
                buckets_path: {
                  win: 'realWin>amount',
                  bet: 'realBet>amount'
                },
                script: 'params.bet - params.win'
              }
            }
          }
        }
      }
    }
  }
  return { query, aggs }
}

export const getBonusWinAndBonusBet = ({ query, startDate, endDate, groupBy }) => {
  query.bool.must.push({ match: { status: TRANSACTION_STATUS.SUCCESS } })
  query.bool.must.push({ match: { modelType: MODEL_TYPE.CASINO } })
  query.bool.must.push({ match: { amountType: AMOUNT_TYPE.NON_CASH } })

  const aggs = {
    date: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: startDate,
                to: endDate
              }
            }
          }
        }
      },
      aggs: {
        group_by_provider: {
          terms: {
            field: groupBy,
            size: 2147483647
          },
          aggs: {
            bonusWin: {
              filter: { term: { transactionType: ACTION.WIN } },
              aggs: {
                sum: {
                  sum: {
                    field: 'transactionAmountPrimary'
                  }
                }
              }
            },
            bonusBet: {
              filter: { term: { transactionType: ACTION.BET } },
              aggs: {
                sum: {
                  sum: {
                    field: 'transactionAmountPrimary'
                  }
                }
              }
            },
            bonusGGR: {
              bucket_script: {
                buckets_path: {
                  win: 'bonusWin>sum',
                  bet: 'bonusBet>sum'
                },
                script: 'params.bet - params.win'
              }
            }
          }
        }
      }
    }
  }
  return { query, aggs }
}

export const getTotalBets = ({ query, startDate, endDate, groupBy }) => {
  query.bool.must.push({ match: { status: TRANSACTION_STATUS.SUCCESS } })
  query.bool.must.push({ match: { modelType: MODEL_TYPE.CASINO } })
  query.bool.must.push({ match: { transactionType: ACTION.BET } })

  const aggs = {
    date: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: startDate,
                to: endDate
              }
            }
          }
        }
      },
      aggs: {
        group_by_provider: {
          terms: {
            field: groupBy,
            size: 2147483647
          },
          aggs: {
            realBet: {
              filter: { term: { amountType: AMOUNT_TYPE.CASH } },
              aggs: {
                sum: {
                  sum: {
                    field: 'transactionAmountPrimary'
                  }
                }
              }
            },
            bonusBet: {
              filter: { term: { amountType: AMOUNT_TYPE.NON_CASH } },
              aggs: {
                sum: {
                  sum: {
                    field: 'transactionAmountPrimary'
                  }
                }
              }
            },
            totalBets: {
              bucket_script: {
                buckets_path: {
                  realBet: 'realBet>sum',
                  bonusBet: 'bonusBet>sum'
                },
                script: 'params.realBet + params.bonusBet'
              }
            }
          }
        }
      }
    }
  }
  return { query, aggs }
}

export const getProviders = async () => {
  const response = {}
  const providers = await db.MasterCasinoProvider.findAll({ raw: true })
  providers.forEach((provider) => {
    response[provider.name] = {
      GGR: 0.00,
      deltaGGR: '-',
      realBet: 0.00,
      realWin: 0.00,
      bonusBet: 0.00,
      bonusWin: 0.00,
      bonusGGR: 0.00,
      totalBets: 0.00,
      deltaTotalBets: '-'
    }
  })
  return response
}

export const getProviderMapper = async () => {
  const providerNameMapper = {}
  const providers = await db.MasterCasinoProvider.findAll({ raw: true })
  providers.forEach((provider) => {
    providerNameMapper[provider.masterCasinoProviderId] = provider.name
  })
  return providerNameMapper
}

export const getDefaultKpiReportValues = () => {
  return {
    GGR: 0.00,
    deltaGGR: '-',
    realBet: 0.00,
    realWin: 0.00,
    bonusBet: 0.00,
    bonusWin: 0.00,
    bonusGGR: 0.00,
    totalBets: 0.00,
    deltaTotalBets: '-'
  }
}

const upgradeDeltaInKPIReport = (report) => {
  Object.keys(report).forEach(key => {
    if (report[key].deltaGGR === '-') {
      report[key].deltaGGR = createDelta(report[key].GGR, 0) + ' %'
    }
    if (report[key].deltaTotalBets === '-') {
      report[key].deltaTotalBets = createDelta(report[key].totalBets, 0) + ' %'
    }
  })

  return report
}

export const createKpiReportResponse = async (KPIReport, type) => {
  if (type === 'provider') {
    const response = await getProviders()
    const providerNameMapper = await getProviderMapper()

    KPIReport.realAmounts.date.buckets.transactions.group_by_provider.buckets.forEach((provider) => {
      if (response[providerNameMapper[provider.key]] === undefined) response[providerNameMapper[provider.key]] = getDefaultKpiReportValues()
      response[providerNameMapper[provider.key]].GGR = internationalNumberFormatter((provider?.GGR?.value || 0.00).toFixed(2))
      response[providerNameMapper[provider.key]].realWin = internationalNumberFormatter((provider.realWin.amount.value || 0.00).toFixed(2))
      response[providerNameMapper[provider.key]].realBet = internationalNumberFormatter((provider.realBet.amount.value || 0.00).toFixed(2))
    })

    KPIReport.bonusAmounts.date.buckets.transactions.group_by_provider.buckets.forEach((provider) => {
      if (response[providerNameMapper[provider.key]] === undefined) response[providerNameMapper[provider.key]] = getDefaultKpiReportValues()
      response[providerNameMapper[provider.key]].bonusWin = internationalNumberFormatter((provider.bonusWin.sum.value || 0.00).toFixed(2))
      response[providerNameMapper[provider.key]].bonusBet = internationalNumberFormatter((provider.bonusBet.sum.value || 0.00).toFixed(2))
      response[providerNameMapper[provider.key]].bonusGGR = internationalNumberFormatter((provider?.bonusGGR?.value || 0.00).toFixed(2))
    })

    KPIReport.totalBetsAmounts.date.buckets.transactions.group_by_provider.buckets.forEach((provider) => {
      if (response[providerNameMapper[provider.key]] === undefined) response[providerNameMapper[provider.key]] = getDefaultKpiReportValues()
      response[providerNameMapper[provider.key]].totalBets = internationalNumberFormatter((provider?.totalBets?.value || 0.00).toFixed(2))
    })

    KPIReport.deltaRealAmounts.date.buckets.transactions.group_by_provider.buckets.forEach((provider) => {
      if (response[providerNameMapper[provider.key]] === undefined) response[providerNameMapper[provider.key]] = getDefaultKpiReportValues()
      response[providerNameMapper[provider.key]].deltaGGR = createDelta(response[providerNameMapper[provider.key]]?.GGR, provider?.GGR?.value) + ' %'
    })

    KPIReport.deltaTotalBetsAmounts.date.buckets.transactions.group_by_provider.buckets.forEach((provider) => {
      if (response[providerNameMapper[provider.key]] === undefined) response[providerNameMapper[provider.key]] = getDefaultKpiReportValues()
      response[providerNameMapper[provider.key]].deltaTotalBets = createDelta(response[providerNameMapper[provider.key]]?.totalBets, provider?.totalBets?.value) + ' %'
    })

    return upgradeDeltaInKPIReport(response)
  } else if (type === 'game') {
    const response = {}

    KPIReport.realAmounts.date.buckets.transactions.group_by_provider.buckets.forEach((provider) => {
      if (response[provider.key] === undefined) response[provider.key] = getDefaultKpiReportValues()
      response[provider.key].GGR = internationalNumberFormatter((provider?.GGR?.value || 0.00).toFixed(2))
      response[provider.key].realWin = internationalNumberFormatter((provider.realWin.amount.value || 0.00).toFixed(2))
      response[provider.key].realBet = internationalNumberFormatter((provider.realBet.amount.value || 0.00).toFixed(2))
    })

    KPIReport.bonusAmounts.date.buckets.transactions.group_by_provider.buckets.forEach((provider) => {
      if (response[provider.key] === undefined) response[provider.key] = getDefaultKpiReportValues()
      response[provider.key].bonusWin = internationalNumberFormatter((provider.bonusWin.sum.value || 0.00).toFixed(2))
      response[provider.key].bonusBet = internationalNumberFormatter((provider.bonusBet.sum.value || 0.00).toFixed(2))
      response[provider.key].bonusGGR = internationalNumberFormatter((provider?.bonusGGR?.value || 0.00).toFixed(2))
    })

    KPIReport.totalBetsAmounts.date.buckets.transactions.group_by_provider.buckets.forEach((provider) => {
      if (response[provider.key] === undefined) response[provider.key] = getDefaultKpiReportValues()
      response[provider.key].totalBets = internationalNumberFormatter((provider?.totalBets?.value || 0.00).toFixed(2))
    })

    KPIReport.deltaRealAmounts.date.buckets.transactions.group_by_provider.buckets.forEach((provider) => {
      if (response[provider.key] === undefined) response[provider.key] = getDefaultKpiReportValues()
      response[provider.key].deltaGGR = createDelta(response[provider.key]?.GGR, provider?.GGR?.value) + ' %'
    })

    KPIReport.deltaTotalBetsAmounts.date.buckets.transactions.group_by_provider.buckets.forEach((provider) => {
      if (response[provider.key] === undefined) response[provider.key] = getDefaultKpiReportValues()
      response[provider.key].deltaTotalBets = createDelta(response[provider.key]?.totalBets, provider?.totalBets?.value) + ' %'
    })

    return upgradeDeltaInKPIReport(response)
  }
}

const days = (date1, date2) => {
  const difference = date1.getTime() - date2.getTime()
  const TotalDays = Math.ceil(difference / (1000 * 3600 * 24))
  return TotalDays
}

const startOfWeek = (date) => {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

export const getKpiReportDates = ({ dateOptions, customEndDate, customStartDate }) => {
  let startDate, endDate, deltaStartDate, deltaEndDate

  if (dateOptions === 'today') {
    const { today, yesterday } = getKPIReportFilterDates()

    startDate = today
    endDate = today
    deltaEndDate = yesterday
    deltaStartDate = yesterday
  } else if (dateOptions === 'yesterday') {
    const { yesterday } = getKPIReportFilterDates()
    const d = new Date()

    d.setDate(d.getDate() - 2)

    const dayBeforeYesterday = d.toISOString().substring(0, 10)

    startDate = yesterday
    endDate = yesterday
    deltaEndDate = dayBeforeYesterday
    deltaStartDate = dayBeforeYesterday
  } else if (dateOptions === 'monthtodate') {
    const { today, monthStartDate, previousMonthStartDate, perviousMonthToday } = getKPIReportFilterDates()
    startDate = monthStartDate
    endDate = today
    deltaEndDate = perviousMonthToday
    deltaStartDate = previousMonthStartDate
  } else if (dateOptions === 'last7days') {
    const { today } = getKPIReportFilterDates()
    const newDate = new Date()

    newDate.setDate(newDate.getDate() - 7)
    startDate = newDate.toISOString().substring(0, 10)
    endDate = today

    newDate.setDate(newDate.getDate() - 7)

    deltaStartDate = newDate.toISOString().substring(0, 10)
    deltaEndDate = startDate
  } else if (dateOptions === 'last30days') {
    const { today } = getKPIReportFilterDates()
    const newDate = new Date()

    newDate.setDate(newDate.getDate() - 30)

    startDate = newDate.toISOString().substring(0, 10)
    endDate = today

    newDate.setDate(newDate.getDate() - 30)

    deltaStartDate = newDate.toISOString().substring(0, 10)
    deltaEndDate = startDate
  } else if (dateOptions === 'last90days') {
    const { today } = getKPIReportFilterDates()
    const newDate = new Date()

    newDate.setDate(newDate.getDate() - 90)

    startDate = newDate.toISOString().substring(0, 10)
    endDate = today

    newDate.setDate(newDate.getDate() - 90)

    deltaStartDate = newDate.toISOString().substring(0, 10)
    deltaEndDate = startDate
  } else if (dateOptions === 'weektodate') {
    const { today } = getKPIReportFilterDates()
    const newDate = new Date()

    startDate = startOfWeek(newDate).toISOString().substring(0, 10)
    endDate = today

    const prevDate = new Date()
    prevDate.setDate(prevDate.getDate() - 7)
    deltaEndDate = prevDate.toISOString().substring(0, 10)
    deltaStartDate = startOfWeek(prevDate).toISOString().substring(0, 10)
  } else if (dateOptions === 'yeartodate') {
    const { today } = getKPIReportFilterDates()
    const offset = new Date().getTimezoneOffset()
    startDate = new Date((new Date(new Date().getFullYear() - 1, 0, 1)).getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10)
    endDate = today
    const newDate = new Date()
    newDate.setFullYear(newDate.getFullYear() - 1)

    deltaEndDate = newDate.toISOString().substring(0, 10)
    deltaStartDate = new Date((new Date(newDate.getFullYear(), 0, 1)).getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10)
  } else if (dateOptions === 'previousmonth') {
    const offset = new Date().getTimezoneOffset()
    startDate = new Date((new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)).getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10)
    endDate = new Date((new Date(new Date().getFullYear(), new Date().getMonth(), 0)).getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10)
    deltaStartDate = new Date((new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1)).getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10)
    deltaEndDate = new Date((new Date(new Date().getFullYear(), new Date().getMonth() - 1, 0)).getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10)
  } else if (dateOptions === 'previousyear') {
    const offset = new Date().getTimezoneOffset()

    startDate = new Date((new Date(new Date().getFullYear() - 1, 0, 1)).getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10)
    endDate = new Date((new Date(new Date().getFullYear() - 1, 11, 31)).getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10)
    deltaStartDate = new Date((new Date(new Date().getFullYear() - 2, 0, 1)).getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10)
    deltaEndDate = new Date((new Date(new Date().getFullYear() - 2, 11, 31)).getTime() - (offset * 60 * 1000)).toISOString().substring(0, 10)
  } else if (dateOptions === 'custom') {
    startDate = customStartDate
    endDate = customEndDate

    const createDeltaStart = new Date(startDate)

    createDeltaStart.setDate(createDeltaStart.getDate() - (Math.abs(days(new Date(endDate), new Date(startDate))) + 1))
    deltaStartDate = createDeltaStart.toISOString().substring(0, 10)
    deltaEndDate = startDate
  }
  return { startDate, endDate, deltaStartDate, deltaEndDate }
}

export const getPlayerLiabilityQuery = ({ query, endDate }) => {
  query.bool.must.push({ match: { status: TRANSACTION_STATUS.SUCCESS } })
  query.bool.must.push({
    bool: {
      should: [
        { match: { transactionType: TRANSACTION_TYPE.DEPOSIT } },
        { match: { transactionType: ACTION.BET } },
        { match: { transactionType: ACTION.WIN } }
      ]
    }
  })

  const aggs = {
    transactions: {
      filter: {
        range: {
          updatedAt: { lte: endDate }
        }
      },
      aggs: {
        by_user: {
          terms: {
            field: 'user.userId',
            size: 2147483647
          },
          aggs: {
            recent_transactions: {
              top_hits: {
                sort: [
                  {
                    updatedAt: {
                      order: 'desc'
                    }
                  }
                ],
                _source: {
                  includes: [
                    'afterBalance',
                    'transactionType',
                    'currencyCode',
                    'updatedAt',
                    'user.username',
                    'conversionRate'
                  ]
                },
                size: 1
              }
            }
          }
        }
      }
    }
  }

  return { query, aggs }
}

export const sortPlayerLiabilityData = async (playerLiability) => {
  const groupObject = {}

  for (const user of playerLiability.transactions.by_user.buckets) {
    const root = user.recent_transactions.hits.hits[0]?._source
    const currencyCode = root.currencyCode

    if (!groupObject[currencyCode]) {
      groupObject[currencyCode] = { currencyCode, name: null, liability: 0 }
    }
    if (groupObject[currencyCode].name === null) {
      groupObject[currencyCode].name = 'GS Casino'
    }
    groupObject[currencyCode].liability = Math.round((groupObject[currencyCode].liability + root.afterBalance) * 100) / 100
  }

  return { playerLiability: Object.values(groupObject), groupingData: groupObject }
}

export const getBonusCountAndAmountQuery = ({ query, startDate, endDate }) => {
  const { today, yesterday, monthStartDate, previousMonthStartDate, perviousMonthToday } = getKPIReportFilterDates()

  if (!startDate) startDate = today
  if (!endDate) endDate = today

  query.bool.must.push({ match: { modelType: MODEL_TYPE.BANKING } })
  query.bool.must.push({ match: { status: TRANSACTION_STATUS.SUCCESS } })
  query.bool.must.push({ match: { amountType: AMOUNT_TYPE.NON_CASH } })

  const aggs = {
    today: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: today,
                to: today
              }
            }
          }
        }
      },
      aggs: {
        bonus: {
          filter: { term: { transactionType: TRANSACTION_TYPE.BONUS } },
          aggs: {
            sum: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        }
      }
    },
    yesterday: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: yesterday,
                to: yesterday
              }
            }
          }
        }
      },
      aggs: {
        bonus: {
          filter: { term: { transactionType: TRANSACTION_TYPE.BONUS } },
          aggs: {
            sum: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        }
      }
    },
    monthToDate: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: monthStartDate,
                to: today
              }
            }
          }
        }
      },
      aggs: {
        bonus: {
          filter: { term: { transactionType: TRANSACTION_TYPE.BONUS } },
          aggs: {
            sum: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        }
      }
    },
    prevMonthToDate: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: previousMonthStartDate,
                to: perviousMonthToday
              }
            }
          }
        }
      },
      aggs: {
        bonus: {
          filter: { term: { transactionType: TRANSACTION_TYPE.BONUS } },
          aggs: {
            sum: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        }
      }
    },
    customDate: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: startDate,
                to: endDate
              }
            }
          }
        }
      },
      aggs: {
        bonus: {
          filter: { term: { transactionType: TRANSACTION_TYPE.BONUS } },
          aggs: {
            sum: {
              sum: {
                field: 'transactionAmountPrimary'
              }
            },
            count: {
              value_count: {
                field: 'transactionId'
              }
            }
          }
        }
      }
    }
  }

  return { query, aggs }
}

const splitPendingWithdrawData = (withdrawData) => {
  const kycPending = {
    today: 0,
    yesterday: 0,
    monthToDate: 0,
    prevMonthToDate: 0,
    customDate: 0,
    delta: '0 %'
  }

  const kycApproved = {
    today: 0,
    yesterday: 0,
    monthToDate: 0,
    prevMonthToDate: 0,
    customDate: 0,
    delta: '0 %'
  }

  const kycRequested = {
    today: 0,
    yesterday: 0,
    monthToDate: 0,
    prevMonthToDate: 0,
    customDate: 0,
    delta: '0 %'
  }

  for (const key of Object.keys(withdrawData)) {
    for (const request of withdrawData[key]) {
      if (request['transactionUser.kycStatus'] === STATUS_VALUE.PENDING) {
        kycPending[key] = request.amount
      } else if (request['transactionUser.kycStatus'] === STATUS_VALUE.REQUESTED || request['transactionUser.kycStatus'] === STATUS_VALUE.RE_REQUESTED) {
        kycRequested[key] += request.amount
      } else if (request['transactionUser.kycStatus'] === STATUS_VALUE.APPROVED) {
        kycApproved[key] = request.amount
      }
    }
  }

  kycApproved.delta = createDelta(kycApproved.monthToDate, kycApproved.prevMonthToDate) + ' %'
  kycRequested.delta = createDelta(kycRequested.monthToDate, kycRequested.prevMonthToDate) + ' %'
  kycPending.delta = createDelta(kycPending.monthToDate, kycPending.prevMonthToDate) + ' %'

  return { kycApproved, kycPending, kycRequested }
}

export const getWithdrawRequestData = async ({ query, startDate, endDate }) => {
  const { today, yesterday, monthStartDate, previousMonthStartDate, perviousMonthToday } = getKPIReportFilterDates()

  if (!startDate) startDate = today
  if (!endDate) endDate = today

  const withdrawals = {}

  withdrawals.today = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), today, today, 'TransactionBanking'), status: 1 } })).toFixed(2))
  withdrawals.yesterday = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), yesterday, yesterday, 'TransactionBanking'), status: 1 } })).toFixed(2))
  withdrawals.monthToDate = await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), monthStartDate, today, 'TransactionBanking'), status: 1 } })
  withdrawals.prevMonthToDate = await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), previousMonthStartDate, perviousMonthToday, 'TransactionBanking'), status: 1 } })
  withdrawals.customDate = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), startDate, endDate, 'TransactionBanking'), status: 1 } })).toFixed(2))
  withdrawals.delta = createDelta(withdrawals.monthToDate, withdrawals.prevMonthToDate) + ' %'
  withdrawals.monthToDate = internationalNumberFormatter(withdrawals.monthToDate.toFixed(2))
  withdrawals.prevMonthToDate = internationalNumberFormatter(withdrawals.prevMonthToDate.toFixed(2))

  const totalPendingWithdraws = {}

  totalPendingWithdraws.today = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), today, today, 'TransactionBanking'), status: 7 } })).toFixed(2))
  totalPendingWithdraws.yesterday = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), yesterday, yesterday, 'TransactionBanking'), status: 7 } })).toFixed(2))
  totalPendingWithdraws.monthToDate = await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), monthStartDate, today, 'TransactionBanking'), status: 7 } })
  totalPendingWithdraws.prevMonthToDate = await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), previousMonthStartDate, perviousMonthToday, 'TransactionBanking'), status: 7 } })
  totalPendingWithdraws.customDate = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), startDate, endDate, 'TransactionBanking'), status: 7 } })).toFixed(2))
  totalPendingWithdraws.delta = createDelta(totalPendingWithdraws.monthToDate, totalPendingWithdraws.prevMonthToDate) + ' %'
  totalPendingWithdraws.monthToDate = internationalNumberFormatter(totalPendingWithdraws.monthToDate.toFixed(2))
  totalPendingWithdraws.prevMonthToDate = internationalNumberFormatter(totalPendingWithdraws.prevMonthToDate.toFixed(2))

  const internalWithdrawals = {}

  internalWithdrawals.today = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify({ ...query, transactionType: TRANSACTION_TYPE.INTERNAL.withdraw })), today, today, 'TransactionBanking') } })).toFixed(2))
  internalWithdrawals.yesterday = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify({ ...query, transactionType: TRANSACTION_TYPE.INTERNAL.withdraw })), yesterday, yesterday, 'TransactionBanking') } })).toFixed(2))
  internalWithdrawals.monthToDate = await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify({ ...query, transactionType: TRANSACTION_TYPE.INTERNAL.withdraw })), monthStartDate, today, 'TransactionBanking') } })
  internalWithdrawals.prevMonthToDate = await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify({ ...query, transactionType: TRANSACTION_TYPE.INTERNAL.withdraw })), previousMonthStartDate, perviousMonthToday, 'TransactionBanking') } })
  internalWithdrawals.customDate = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify({ ...query, transactionType: TRANSACTION_TYPE.INTERNAL.withdraw })), startDate, endDate, 'TransactionBanking') } })).toFixed(2))
  internalWithdrawals.delta = createDelta(internalWithdrawals.monthToDate, internalWithdrawals.prevMonthToDate) + ' %'
  internalWithdrawals.monthToDate = internationalNumberFormatter(internalWithdrawals.monthToDate.toFixed(2))
  internalWithdrawals.prevMonthToDate = internationalNumberFormatter(internalWithdrawals.prevMonthToDate.toFixed(2))

  const internalRemoveMoney = {}

  internalRemoveMoney.today = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify({ ...query, transactionType: TRANSACTION_TYPE.REMOVE_BALANCE_INTERNAL })), today, today, 'TransactionBanking') } })).toFixed(2))
  internalRemoveMoney.yesterday = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify({ ...query, transactionType: TRANSACTION_TYPE.REMOVE_BALANCE_INTERNAL })), yesterday, yesterday, 'TransactionBanking') } })).toFixed(2))
  internalRemoveMoney.monthToDate = await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify({ ...query, transactionType: TRANSACTION_TYPE.REMOVE_BALANCE_INTERNAL })), monthStartDate, today, 'TransactionBanking') } })
  internalRemoveMoney.prevMonthToDate = await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify({ ...query, transactionType: TRANSACTION_TYPE.REMOVE_BALANCE_INTERNAL })), previousMonthStartDate, perviousMonthToday, 'TransactionBanking') } })
  internalRemoveMoney.customDate = internationalNumberFormatter((await db.TransactionBanking.sum('primaryCurrencyAmount', { where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify({ ...query, transactionType: TRANSACTION_TYPE.REMOVE_BALANCE_INTERNAL })), startDate, endDate, 'TransactionBanking') } })).toFixed(2))
  internalRemoveMoney.delta = createDelta(internalRemoveMoney.monthToDate, internalRemoveMoney.prevMonthToDate) + ' %'
  internalRemoveMoney.monthToDate = internationalNumberFormatter(internalRemoveMoney.monthToDate.toFixed(2))
  internalRemoveMoney.prevMonthToDate = internationalNumberFormatter(internalRemoveMoney.prevMonthToDate.toFixed(2))

  const kycStatusPendingWithdrawals = {}

  kycStatusPendingWithdrawals.today = await db.TransactionBanking.findAll({
    where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), today, today, 'TransactionBanking'), status: 7 },
    attributes: [[db.sequelize.literal('sum(primary_currency_amount)'), 'amount']],
    include: [
      { model: db.User, as: 'transactionUser', attributes: ['kycStatus'], required: true }
    ],
    group: ['transactionUser.kyc_status'],
    raw: true
  })

  kycStatusPendingWithdrawals.yesterday = await db.TransactionBanking.findAll({
    where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), yesterday, yesterday, 'TransactionBanking'), status: 7 },
    attributes: [[db.sequelize.literal('sum(primary_currency_amount)'), 'amount']],
    include: [
      { model: db.User, as: 'transactionUser', attributes: ['kycStatus'], required: true }
    ],
    group: ['transactionUser.kyc_status'],
    raw: true
  })

  kycStatusPendingWithdrawals.monthToDate = await db.TransactionBanking.findAll({
    where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), monthStartDate, today, 'TransactionBanking'), status: 7 },
    attributes: [[db.sequelize.literal('sum(primary_currency_amount)'), 'amount']],
    include: [
      { model: db.User, as: 'transactionUser', attributes: ['kycStatus'], required: true }
    ],
    group: ['transactionUser.kyc_status'],
    raw: true
  })

  kycStatusPendingWithdrawals.prevMonthToDate = await db.TransactionBanking.findAll({
    where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), previousMonthStartDate, perviousMonthToday, 'TransactionBanking'), status: 7 },
    attributes: [[db.sequelize.literal('sum(primary_currency_amount)'), 'amount']],
    include: [
      { model: db.User, as: 'transactionUser', attributes: ['kycStatus'], required: true }
    ],
    group: ['transactionUser.kyc_status'],
    raw: true
  })

  kycStatusPendingWithdrawals.customDate = await db.TransactionBanking.findAll({
    where: { ...filterByDateCreatedAt(JSON.parse(JSON.stringify(query)), startDate, endDate, 'TransactionBanking'), status: 7 },
    attributes: [[db.sequelize.literal('sum(primary_currency_amount)'), 'amount']],
    include: [
      { model: db.User, as: 'transactionUser', attributes: ['kycStatus'], required: true }
    ],
    group: ['transactionUser.kyc_status'],
    raw: true
  })

  const splitData = splitPendingWithdrawData(kycStatusPendingWithdrawals)

  return { withdrawals, totalPendingWithdraws, ...splitData, internalWithdrawals, internalRemoveMoney }
}

const getPayoutPercentage = ({ totalBets, totalWins }) => {
  if (totalBets === 0 && totalWins === 0) return '0 %'
  if (totalBets === undefined && totalWins === undefined) return '0 %'
  return parseFloat(((totalWins / totalBets) * 100).toFixed(2)) + ' %'
}

export const createGameReport = async (gameReport, type, userId, limit) => {
  const response = []
  if (type === 'provider') {
    for (const provider of gameReport.date.buckets.transactions.group_by_provider.buckets) {
      const mapper = await getProviderMapper()
      response.push({
        identifier: mapper[provider?.key],
        id: provider?.key,
        name: mapper[provider?.key],
        roundCount: internationalNumberFormatter(provider.totalBet.count.value),
        totalBet: internationalNumberFormatter(parseFloat(provider.totalBet.sum.value?.toFixed(2)) || 0.00),
        totalWin: internationalNumberFormatter(parseFloat(provider.totalWin.sum.value?.toFixed(2)) || 0.00),
        GGR: internationalNumberFormatter(parseFloat(provider?.GGR?.value?.toFixed(2)) || 0.00),
        playerCount: internationalNumberFormatter(provider.totalBet.group_by_user.buckets.length),
        payout: getPayoutPercentage({ totalBets: parseFloat(provider.totalBet.sum.value?.toFixed(2)) || 0.00, totalWins: parseFloat(provider.totalWin.sum.value?.toFixed(2)) || 0.00 })
      })
    }
  } else if (type === 'game') {
    for (const provider of gameReport.date.buckets.transactions.group_by_provider.buckets) {
      const gameData = await getOne({ model: db.MasterCasinoGame, data: { identifier: { [Op.iLike]: provider.key } } })
      response.push({
        identifier: provider?.key,
        id: gameData?.masterCasinoGameId,
        name: gameData?.name,
        roundCount: internationalNumberFormatter(provider.totalBet.count.value),
        totalBet: internationalNumberFormatter(parseFloat(provider.totalBet.sum.value?.toFixed(2)) || 0.00),
        totalWin: internationalNumberFormatter(parseFloat(provider.totalWin.sum.value?.toFixed(2)) || 0.00),
        GGR: internationalNumberFormatter(parseFloat(provider?.GGR?.value?.toFixed(2)) || 0.00),
        playerCount: internationalNumberFormatter(provider.totalBet.group_by_user.buckets.length),
        payout: getPayoutPercentage({ totalBets: parseFloat(provider.totalBet.sum.value?.toFixed(2)) || 0.00, totalWins: parseFloat(provider.totalWin.sum.value?.toFixed(2)) || 0.00 })
      })
    }
  }

  if (userId) {
    for (let index = 0; index < response.length; index++) {
      delete response[index].playerCount
    }

    response.sort((a, b) => {
      return parseInt(b.roundCount.replace(/,/g, '')) - parseInt(a.roundCount.replace(/,/g, ''))
    })

    return response.slice(0, limit)
  }

  return response
}

export const getGameReportQuery = ({ query, startDate, endDate, groupBy }) => {
  query.bool.must.push({ match: { status: TRANSACTION_STATUS.SUCCESS } })
  query.bool.must.push({ match: { modelType: MODEL_TYPE.CASINO } })

  const aggs = {
    date: {
      filters: {
        filters: {
          transactions: {
            range: {
              createdAt: {
                from: startDate,
                to: endDate
              }
            }
          }
        }
      },
      aggs: {
        group_by_provider: {
          terms: {
            field: groupBy,
            size: 2147483647
          },
          aggs: {
            totalBet: {
              filter: { term: { transactionType: ACTION.BET } },
              aggs: {
                group_by_user: {
                  terms: {
                    field: 'user.userId',
                    size: 2147483647
                  }
                },
                sum: {
                  sum: {
                    field: 'transactionAmountPrimary'
                  }
                },
                count: {
                  value_count: {
                    field: 'transactionId'
                  }
                }
              }
            },
            totalWin: {
              filter: { term: { transactionType: ACTION.WIN } },
              aggs: {
                sum: {
                  sum: {
                    field: 'transactionAmountPrimary'
                  }
                }
              }
            },
            GGR: {
              bucket_script: {
                buckets_path: {
                  totalBet: 'totalBet>sum',
                  totalWin: 'totalWin>sum'
                },
                script: 'params.totalBet - params.totalWin'
              }
            }
          }
        }
      }
    }
  }
  return { query, aggs }
}

export const getCountryCodeList = ({ userSignup, depositAmount, depositCount }) => {
  const countries = []

  userSignup.forEach(user => countries.push(user.country_code))

  depositAmount.forEach(amount => countries.push(amount.countryCode))

  depositCount.forEach(count => countries.push(count.countryCode))

  return [...new Set(countries)]
}
