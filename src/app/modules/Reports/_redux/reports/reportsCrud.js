import axios from "axios";
import { API, graphqlOperation } from 'aws-amplify';
import {
  createReport as apiCreateReport,
  updateReport as apiUpdateReport
} from '../../../../../graphql/mutations';
import { listReports, getReport } from '../../../../../graphql/queries';

export const REPORT_URL = "api/reports";

export function createReport(report) {
  return API.graphql(graphqlOperation(apiCreateReport, { input: report }));
}

export function getAllReports(queryParams) {
  return API.graphql(graphqlOperation(listReports, { filter: queryParams.filter }));
}

export function getReportById(reportId) {
  return API.graphql(graphqlOperation(getReport, { id: reportId }));
}

export function findReports(queryParams) {
  return axios.post(`${REPORT_URL}/find`, { queryParams });
}

export function updateStatusForReport(report) {
  return API.graphql(graphqlOperation(apiUpdateReport, { input: report }));
}

