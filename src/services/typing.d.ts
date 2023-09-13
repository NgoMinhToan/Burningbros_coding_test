declare namespace DUMMY_JSON {
    type TItemListParam = {
        limit: number,
        page: number,
    }
    type TSearchParam = TItemListParam & {
        q: string,
    }
    type TItemListResponse = {
        products: TProduct[],
        total: number,
        skip: number,
        limit: number,

    }
    type TProduct = {
        id: number,
        title: string,
        price: number
    }
}