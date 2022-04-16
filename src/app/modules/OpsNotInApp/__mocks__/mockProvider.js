import providerTableMock from "./providerTableMock";
import MockUtils from "./mock.utils";

export default function mockProvider(mock) {
  mock.onPost("api/opsnotinapp").reply(({ data }) => {
    const { provider } = JSON.parse(data);
    const {
      name = ""
    } = provider;

    const id = generateUserId();
    const newProvider = {
      id,
      name,
    };
    providerTableMock.push(newProvider);
    return [200, { provider: newProvider }];
  });

  mock.onPost("api/opsnotinapp/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdProviders = mockUtils.baseFilter(
      providerTableMock,
      queryParams
    );
    return [200, filterdProviders];
  });

  mock.onPost("api/opsnotinapp/archiveProviders").reply(config => {
    const { ids } = JSON.parse(config.data);
    ids.forEach(id => {
      const index = providerTableMock.findIndex(el => el.id === id);
      if (index > -1) {
        providerTableMock.splice(index, 1);
      }
    });
    return [200];
  });

  mock.onGet(/api\/opsnotinapp\/\d+/).reply(config => {
    const id = config.url.match(/api\/opsnotinapp\/(\d+)/)[1];
    const provider = providerTableMock.find(el => el.id === +id);
    if (!provider) {
      return [400];
    }

    return [200, provider];
  });

  mock.onPut(/api\/opsnotinapp\/\d+/).reply(config => {
    const id = config.url.match(/api\/opsnotinapp\/(\d+)/)[1];
    const { provider } = JSON.parse(config.data);
    const index = providerTableMock.findIndex(el => el.id === +id);
    if (!index) {
      return [400];
    }

    providerTableMock[index] = { ...provider };
    return [200];
  });

  mock.onDelete(/api\/opsnotinapp\/\d+/).reply(config => {
    const id = config.url.match(/api\/opsnotinapp\/(\d+)/)[1];
    const index = providerTableMock.findIndex(el => el.id === +id);
    providerTableMock.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = providerTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
