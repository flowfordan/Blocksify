type UserType = {
    name: string,
    secondName: string,
    age: number
}

type PhotoType = {
    large: string,
    small: string
}

type Three<T> = T extends 'user' ? UserType : PhotoType 


let a: Three<'photo'> = {
    large: 'large',
    small: 'small'
}

let b: Three<'user'> = {
    name: 'Boris',
    secondName: 'Abobus',
    age: 145
}

export {}