import { useInfiniteQuery } from '@tanstack/react-query'
import { getItemList, searchItemList } from './api-service'

export const useQueryDummyData = (params: DUMMY_JSON.TSearchParam) => {
    return useInfiniteQuery({
        queryKey: ['infiniteScroll', params],
        queryFn: ({ pageParam = 1 }) => {
            if (params.q && params.q !== '') return searchItemList({...params, page: pageParam})
            return getItemList({...params, page: pageParam})
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage) return undefined
            if (allPages.length * params.limit >= lastPage.total) return undefined
            return allPages.length + 1
        }
    })
}