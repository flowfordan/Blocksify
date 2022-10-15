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


const a: Three<'photo'> = {
  large: 'large',
  small: 'small',
};

const b: Three<'user'> = {
  name: 'Boris',
  secondName: 'Abobus',
  age: 145,
};

export {};