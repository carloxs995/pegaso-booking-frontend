export interface ICommonList<ITEM = any> {
    data: {
        items: ITEM[];
        totalCount: number;
        currentPage: number;

    }
}
