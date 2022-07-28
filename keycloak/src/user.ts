import Chance from "chance";

const chance = new Chance();

const TODAY = new Date(Date.now())

const SCHOOL_ENTRY_AGE = 6

type UserAttr = {
  gender: Gender
  birthday: string
  address: string
  zip: string
  city: string
  country: string
}

function userAttr(age: number): UserAttr {
  return {
    gender: (chance.gender() == "male") ? "male" : "female",
    birthday: chance.birthday({
      year: chance.year({
        max: TODAY.getFullYear() - age + 1,
        min: TODAY.getFullYear() - age - 1
      }),
    }).toString(),
    address: chance.address(),
    zip: chance.zip(),
    city: chance.city(),
    country: chance.country({ full: true })
  }
}

export type User = {
  username: string
  email: string
  firstName: string
  lastName: string
  emailVerified: boolean
  enabled: boolean
  credentials: Creds[]
  attributes: UserAttr
}

type Gender = "male" | "female"

interface Creds {
  readonly type: string
  readonly value: string
}

function password(pw: string): Creds {
  return { type: "password", value: pw }
}

const defaultUser = {
  enabled: true,
  emailVerified: true
}

export const STUDENT_GROUP = "student"
export const TEACHER_GROUP = "teacher"

const defaultStudent = {
  groups: [STUDENT_GROUP]
}

const defaultTeacher = {
  groups: [TEACHER_GROUP]
}

export function student(username: string, password: string, age: number, attr = {}): User {
  return withAttr(username, password, age, {
    ...attr,
    groups: [STUDENT_GROUP]
  })
}

export function teacher(username: string, password: string, age: number, attr = {}): User {
  return withAttr(username, password, age, {
    ...attr,
    groups: [TEACHER_GROUP]
  })
}

function withAttr(username: string, pw: string, age: number, attr = {}): User {
  const attributes = userAttr(age)
  return {
    ...defaultUser,
    username,
    email: chance.email(),
    firstName: chance.first({ gender: attributes.gender }),
    lastName: chance.last(),
    credentials: [password(pw)],
    attributes,
    ...attr
  }
}

export function rndStudent(grade: number, attr = {}): () => User {
  return () => {
    const attributes = userAttr(grade + SCHOOL_ENTRY_AGE)
    return {
      ...defaultUser,
      ...defaultStudent,
      username: chance.email(),
      email: chance.email(),
      firstName: chance.first({ gender: attributes.gender }),
      lastName: chance.last(),
      credentials: [password("pw")],
      attributes,
      ...attr
    }
  }
}

const MIN_TEACHER_AGE = 25

export function rndTeacher(attr = {}): User {
  const age = chance.age({ min: MIN_TEACHER_AGE })
  const attributes = userAttr(age)
  return {
    ...defaultUser,
    ...defaultTeacher,
    username: chance.email(),
    email: chance.email(),
    firstName: chance.first({ gender: attributes.gender }),
    lastName: chance.last(),
    credentials: [password("pw")],
    attributes,
    ...attr
  }
}

