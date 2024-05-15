import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../../api/githubApi';

import { Issue } from '../interfaces';

const getIssues = async (): Promise<Issue[]> => {
  const url = '/issues';
  const { data } = await githubApi.get<Issue[]>(url);

  return data;
};

export const useIssues = () => {
  const issuesQuery = useQuery({ queryKey: ['issues'], queryFn: getIssues });

  return { issuesQuery };
};
