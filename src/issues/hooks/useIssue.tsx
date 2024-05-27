import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../../api/githubApi';

import { Issue } from '../interfaces';

export const getIssueInfo = async (issueNumber: number): Promise<Issue> => {
  const url = `/issues/${issueNumber}`;
  const { data } = await githubApi.get<Issue>(url);

  return data;
};

export const getIssueComments = async (
  issueNumber: number
): Promise<Issue[]> => {
  const url = `/issues/${issueNumber}/comments`;
  const { data } = await githubApi.get<Issue[]>(url);

  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueInfo(issueNumber),
  });

  const commentsQuery = useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComments(issueQuery?.data?.number!),
    enabled: issueQuery?.data !== undefined,
  });

  return { commentsQuery, issueQuery };
};
