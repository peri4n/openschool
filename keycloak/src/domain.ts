const TODAY = new Date(Date.now())

const SCHOOL_ENTRY_AGE = 6

const SCHOOL_EXIT_AGE = 19;

export const STUDENT_GROUP = "student"
export const TEACHER_GROUP = "teacher"

export const STUDENT_ROLE = "student"
export const TEACHER_ROLE = "teacher"
export const ADMIN_ROLE = "admin"

export const defaultUser = {
  enabled: true,
  emailVerified: true
}

export type Gender = "male" | "female"

export interface Creds {
  readonly type: string
  readonly value: string
}

function password(pw: string): Creds {
  return { type: "password", value: pw }
}

interface UserAttr {
  readonly gender: Gender
  readonly birthday: string
  readonly address: string
  readonly zip: string
  readonly city: string
  readonly country: string
}

function userAttr(chance: any): UserAttr {
  return {
    gender: (chance.gender() == "male") ? "male" : "female",
    birthday: chance.birthday({
      year: chance.year({
        max: TODAY.getFullYear() - SCHOOL_ENTRY_AGE,
        min: TODAY.getFullYear() - SCHOOL_EXIT_AGE,
      }),
    }),
    address: chance.address(),
    zip: chance.zip(),
    city: chance.city(),
    country: chance.country({ full: true })
  }
}

export interface User {
  readonly username: string
  readonly email: string
  readonly firstName: string
  readonly lastName: string
  readonly emailVerified: boolean
  readonly enabled: boolean
  readonly groups: string[]
  readonly credentials: Creds[]
  readonly attributes: UserAttr
}

export function student(username: string, password: string, chance: any): User {
  return withGroup(username, password, STUDENT_GROUP, chance)
}

export function teacher(username: string, password: string, chance: any): User {
  return withGroup(username, password, TEACHER_GROUP, chance)
}

function withGroup(username: string, pw: string, group: string, chance: any): User {
  const attributes = userAttr(chance)
  return {
    ...defaultUser,
    username,
    email: chance.email(),
    firstName: chance.first({ gender: attributes.gender }),
    lastName: chance.last(),
    groups: [group],
    credentials: [password(pw)],
    attributes
  }
}

export function studentR(chance: any): User {
  const attributes = userAttr(chance)
  return {
    ...defaultUser,
    username: chance.email(),
    email: chance.email(),
    firstName: chance.first({ gender: attributes.gender }),
    lastName: chance.last(),
    groups: [STUDENT_GROUP],
    credentials: [password("pw")],
    attributes
  }
}

export function teacherR(chance: any): User {
  const attributes = userAttr(chance)
  return {
    ...defaultUser,
    username: chance.email(),
    email: chance.email(),
    firstName: chance.first({ gender: attributes.gender }),
    lastName: chance.last(),
    groups: [TEACHER_GROUP],
    credentials: [password("pw")],
    attributes
  }
}

