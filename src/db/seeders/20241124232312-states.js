'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('states', [
      {
        name: 'Alaska',
        state_code: 'AK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Alabama',
        state_code: 'AL',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Arkansas',
        state_code: 'AS',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Arizona',
        state_code: 'AZ',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'California',
        state_code: 'CA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Colorado',
        state_code: 'CO',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Connecticut',
        state_code: 'CT',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'District of Columbia',
        state_code: 'DC',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Delaware',
        state_code: 'DE',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Florida',
        state_code: 'FL',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Georgia',
        state_code: 'GA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Hawaii',
        state_code: 'HI',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Iowa',
        state_code: 'IA',
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: 'Idaho',
      //   state_code: 'ID',

      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: 'Illinois',
        state_code: 'IL',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Indiana',
        state_code: 'IN',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Kansas',
        state_code: 'KS',
        created_at: new Date(),
        updated_at: new Date()
      },
      // {
      //   name: 'Kentucky',
      //   state_code: 'KY',

      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      {
        name: 'Louisiana',
        state_code: 'LA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Massachusetts',
        state_code: 'MA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Maryland',
        state_code: 'MD',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Maine',
        state_code: 'ME',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Michigan',
        state_code: 'MI',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Minnesota',
        state_code: 'MN',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Missouri',
        state_code: 'MO',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mississippi',
        state_code: 'MS',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Montana',
        state_code: 'MT',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'North Carolina',
        state_code: 'NC',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'North Dakota',
        state_code: 'ND',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Nebraska',
        state_code: 'NE',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'New Hampshire',
        state_code: 'NH',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'New Jersey',
        state_code: 'NJ',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'New Mexico',
        state_code: 'NM',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Nevada',
        state_code: 'NV',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'New York',
        state_code: 'NY',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ohio',
        state_code: 'OH',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Oklahoma',
        state_code: 'OK',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Oregon',
        state_code: 'OR',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Pennsylvania',
        state_code: 'PA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Rhode Island',
        state_code: 'PI',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'South Carolina',
        state_code: 'SC',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'South Dakota',
        state_code: 'SD',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tennessee',
        state_code: 'TN',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Texas',
        state_code: 'TX',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Utah',
        state_code: 'UT',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Virginia',
        state_code: 'VA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Vermont',
        state_code: 'VT',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Washington',
        state_code: 'WA',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Wisconsin',
        state_code: 'WI',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'West Virginia',
        state_code: 'WV',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Wyoming',
        state_code: 'WY',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    );



  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("states", null, {});
  }
};
