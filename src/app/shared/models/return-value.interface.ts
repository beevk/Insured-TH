export interface IReturnValue<T> {
    status: boolean;
    return_status: 'success' | 'failed';
    return_message: string;
    return_data: T;
}
