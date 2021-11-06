export interface ApiResponse<TData> {
    Success: boolean;
    ErrorMessage?: string;
    Data: TData; 
}