import { request, gql } from "graphql-request";

import { DEFAULT_DAILY_VOLUME_FACTORY, DEFAULT_DAILY_VOLUME_FIELD } from "./getUniSubgraphVolume";

const getStartTimestamp =
  ({
    endpoints,
    chain,
    dailyDataField = `${DEFAULT_DAILY_VOLUME_FACTORY}s`,
    volumeField = DEFAULT_DAILY_VOLUME_FIELD,
    dateField = "date",
    first = 1000,
  }) =>
  async () => {
    const query = gql`
        {
            ${dailyDataField}(first: ${first}) {
                ${dateField}
                ${volumeField}
            }
        }
    `;

    const result = await request(endpoints[chain], query);

    const days = result?.[dailyDataField];

    const firstValidDay = days.find((data) => data[volumeField] !== "0");

    return firstValidDay[dateField];
  };

export {
  getStartTimestamp,
};
