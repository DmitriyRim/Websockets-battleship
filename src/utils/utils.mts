import { TypeAction } from "../modules/hendleMessage.mjs"

export const responseToString = <T,>(action: TypeAction, data: T): string => {
    return JSON.stringify({
        type: action,
        data: JSON.stringify(data),
        id: 0,
    })
}

