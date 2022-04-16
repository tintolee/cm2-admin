import providerTableMock from "./providerTableMock";
import MockUtils from "../../ECommerce/__mocks__/mock.utils";

export default function mockOpportunityProviders(mock) {
  mock.onPost("api/providers").reply(({ data }) => {
    const { provider } = JSON.parse(data);
    const {
      name = "",
      companyNo = "",
      parent = "",
      educationalInstitution = false,
      description = "",
      email = "",
      status = 0,
    } = provider;

    const id = generateProviderId();
    const newProvider = {
      id,
      name,
      companyNo,
      parent,
      educationalInstitution,
      description,
      email,
      status
    };
    providerTableMock.push(newProvider);
    return [200, { provider: newProvider }];
  });

  mock.onPost("api/providers/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filteredProviders = mockUtils.baseFilter(providerTableMock, queryParams);
    return [200, filteredProviders];
  });

  mock.onPost("api/providers/updateStatusForOpportunityProvider").reply(config => {
    const { id, status } = JSON.parse(config.data);
    const index = providerTableMock.findIndex(el => el.id === +id);
    if (index < 0) {
      return [400];
    }

    const _provider = providerTableMock[index];
    _provider.status = status;
    return [200];
  });

  mock.onGet(/api\/providers\/\d+/).reply(config => {
    const id = config.url.match(/api\/providers\/(\d+)/)[1];
    const provider = providerTableMock.find(el => el.id === +id);
    if (!provider) {
      return [400];
    }

    return [200, provider];
  });

  mock.onPut(/api\/providers\/\d+/).reply(config => {
    const id = config.url.match(/api\/providers\/(\d+)/)[1];
    const { provider } = JSON.parse(config.data);
    const index = providerTableMock.findIndex(el => el.id === +id);
    if (index < 0) {
      return [400];
    }

    providerTableMock[index] = { ...provider };
    return [200];
  });
}

function generateProviderId() {
  const ids = providerTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}