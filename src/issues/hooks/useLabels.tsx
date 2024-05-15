import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../../api/githubApi';

import { Label } from '../interfaces/label';

const getLabels = async (): Promise<Label[]> => {
  const url = '/labels';
  const { data } = await githubApi.get<Label[]>(url);

  return data;
};

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    // staleTime: 1000 * 60 * 60,
    // placeholderData: [],
    initialData: [
      {
        id: 1649755876,
        node_id: 'MDU6TGFiZWwxNjQ5NzU1ODc2',
        url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Fast%20Refresh',
        name: 'Component: Fast Refresh',
        color: '473bcc',
        default: false,
      },
      {
        id: 717031390,
        node_id: 'MDU6TGFiZWw3MTcwMzEzOTA=',
        url: 'https://api.github.com/repos/facebook/react/labels/good%20first%20issue',
        name: 'good first issue',
        color: '6ce26a',
        default: true,
      },
    ],
  });

  return labelsQuery;
};
