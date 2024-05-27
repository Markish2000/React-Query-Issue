import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../../api/githubApi';

import { Issue, State } from '../interfaces';

interface Props {
  labels: string[];
  state?: State;
}

const getIssues = async (
  labels: string[] = [],
  state?: State
): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state) params.append('state', state);

  if (labels.length > 0) {
    const labelString = labels.join(',');
    params.append('labels', labelString);
  }

  params.append('page', '1');
  params.append('per_page', '5');

  const url = '/issues';

  const { data } = await githubApi.get<Issue[]>(url, { params });

  return data;
};

export const useIssues = ({ labels, state }: Props) => {
  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels }],
    queryFn: () => getIssues(labels, state),
  });

  return { issuesQuery };
};
