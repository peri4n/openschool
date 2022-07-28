import { User, rndTeacher, rndStudent, STUDENT_GROUP } from "./user";
import Chance from "chance";

const chance = new Chance();


const MIN_STUDENTS_PER_CLASS = 20
const MAX_STUDENTS_PER_CLASS = 30

export type Class = {
  name: string,
  teacher: User,
  students: User[]
}

export function rndClass(grade: number, suffix: string): Class {
  const nrStudents = chance.integer({ min: MIN_STUDENTS_PER_CLASS, max: MAX_STUDENTS_PER_CLASS })
  const className = `${grade}_${suffix}`
  return {
    name: className,
    teacher: rndTeacher(),
    students: chance.n(rndStudent(grade, { groups: [STUDENT_GROUP, className] }), nrStudents)
  }
}
