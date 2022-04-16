import MockAdapter from "axios-mock-adapter";
import mockAuth from "../../app/modules/Auth/__mocks__/mockAuth";
import mockCustomers from "../../app/modules/ECommerce/__mocks__/mockCustomer";
import mockProviders from "../../app/modules/OpsNotInApp/__mocks__/mockProvider";
import mockReports from "../../app/modules/Reports/__mocks__/mockReports";
import mockProducts from "../../app/modules/ECommerce/__mocks__/mockProduct";
import mockRemarks from "../../app/modules/ECommerce/__mocks__/mockRemark";
import mockSpecifications from "../../app/modules/ECommerce/__mocks__/mockSpecification";
import mockOpportunityProviders from "../../app/modules/OpportunityProvider/__mocks__/mockProvider";

export default function mockAxios(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 300 });

  mockAuth(mock);
  mockCustomers(mock);
  mockProviders(mock);
  mockReports(mock);
  mockProducts(mock);
  mockRemarks(mock);
  mockSpecifications(mock);
  mockOpportunityProviders(mock);

  return mock;
}
