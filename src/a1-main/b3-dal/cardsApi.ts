import {instance} from "./settings";

export const cardsApi = {
    getCards() {
        return instance.get('/cards/card')
    }
}