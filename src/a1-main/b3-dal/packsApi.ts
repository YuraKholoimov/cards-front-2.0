import {AxiosRequestConfig} from "axios";
import {instance} from "./settings";

export const packsApi = {
    getPacks(page: number, pageCount: number) {
        return instance.get('/cards/pack', {
            params: {page, pageCount}
        })
    }
}