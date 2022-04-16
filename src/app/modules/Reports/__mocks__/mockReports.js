import reportTableMock from "./reportTableMock";
import MockUtils from "./mock.utils";

export default function mockReports(mock) {
  mock.onPost("api/reports").reply(({ data }) => {
    const { report } = JSON.parse(data);
    const {
      dateTime = "",
      from = "",
      details= "",
      type= "",
      about= "",
      status= "",
    } = report;

    const id = generateReportId();
    const newReport = {
      id,
      dateTime,
      from,
      details,
      type,
      about,
      status
    };
    reportTableMock.push(newReport);
    return [200, { report: newReport }];
  });

  mock.onPost("api/reports/find").reply(config => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(config.data);
    const filterdReports = mockUtils.baseFilter(
      reportTableMock,
      queryParams
    );
    return [200, filterdReports];
  });

  mock.onPost("api/reports/updateStatusForReport").reply(config => {
    const { id, status } = JSON.parse(config.data);
    const index = reportTableMock.findIndex(el => el.id === +id);
    if (index < 0) {
      return [400];
    }

    const _report = reportTableMock[index];
    _report.status = status;
    return [200];
  });

  mock.onGet(/api\/reports\/\d+/).reply(config => {
    const id = config.url.match(/api\/reports\/(\d+)/)[1];
    const report = reportTableMock.find(el => el.id === +id);
    if (!report) {
      return [400];
    }

    return [200, report];
  });

  mock.onPut(/api\/reports\/\d+/).reply(config => {
    const id = config.url.match(/api\/reports\/(\d+)/)[1];
    const { report } = JSON.parse(config.data);
    const index = reportTableMock.findIndex(el => el.id === +id);
    if (index < 0) {
      return [400];
    }

    reportTableMock[index] = { ...report };
    return [200];
  });
}

function generateReportId() {
  const ids = reportTableMock.map(el => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
