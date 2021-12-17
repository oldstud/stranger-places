export interface IPlaceListDataProps {
    data: IPlaceListDataPropsData
}
export interface IPlaceListDataPropsData {
    
        description: string,
        id: string,
        img: string,
        location: {
            _lat: number,
            _long: number
        },
        user_doc_id: string,
        user_id: string,
    
}