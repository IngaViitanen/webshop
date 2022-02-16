import { User } from "./User";

const UserData: User[] = [{
    id: '1',
    name: 'Karin Nyberg',
    username: 'karin01',
    password: '12345678',
    adress: {
        city: 'Haparanda',
        area_code: 95385,
        street: 'Repslagargatan 12'
    },
    userCart: [],
    loggedin: false
}]

export default UserData