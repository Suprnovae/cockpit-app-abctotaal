import helpers from './helpers';
let data = {}
data[helpers.base64('annemiek@abctotaal.nl:geheim')] = {
  shortname: 'nlco',
  organization: 'Een Nederlands Bedrijf',
  comment: 'De laatste cijfers voor de maand',
  updated_at: '2016-06-09T11:25:05.308+00:00',
  data: [
    {
      actual: 18000,
      description: 'Brutto Inkomen',
      predicted: 23000,
      tablets: [
        { object: 'blue', text: '18K' },
        { text: 'maart 2016' }
      ],
      unit: 'EUR',
    },
    {
      actual: 15000,
      description: 'Netto inkomen',
      predicted: 12000,
      tablets: [
        { object: 'blue', text: '15K' },
        { text: 'maart 2016' }
      ],
      unit: 'EUR',
    },
    {
      actual: 1200,
      description: 'Pandhuur',
      predicted: 1200,
      tablets: [
        { object: 'blue', text: '1K2' },
        { text: 'maart 2016' }
      ],
      unit: 'EUR',
    }
  ]
};
data[helpers.base64('anne@example.com:secret')] = {
  shortname: 'usco',
  organization: 'Acme Co',
  comment: 'The last numbers for this month',
  updated_at: '2016-06-09T11:25:05.308+00:00',
  data: [
    {
      actual: 18000,
      description: 'Gross revenue',
      predicted: 23000,
      tablets: [
        { object: 'blue', text: '18K' },
        { text: 'March 2016' }
      ],
      unit: 'EUR',
    },
    {
      actual: 15000,
      description: 'Net revenue',
      predicted: 12000,
      tablets: [
        { object: 'blue', text: '15K' },
        { text: 'March 2016' }
      ],
      unit: 'EUR',
    },
    {
      actual: 1200,
      description: 'Officerent',
      predicted: 1200,
      tablets: [
        { object: 'blue', text: '1K2' },
        { text: 'March 2016' }
      ],
      unit: 'EUR',
    }
  ]
};
const getOverview = (token) => {
  return new Promise((resolve, reject) => {
    if(data[token] != undefined) {
      resolve(data[token]);
    } else {
      reject('token required');
    }
  });
};
export default { getOverview };
