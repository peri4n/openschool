import Chance from "chance";
import { Class, rndClass } from "./class";

const chance = new Chance();

const MIN_CLASSES = 1
const MAX_CLASSES = 5

const NR_OF_GRADES = 13

type School = {
  classes: Map<number, Class[]>
}

export function rndSchool(): School {
  const classes = new Map<number, Class[]>()
  for (let grade = 1; grade <= NR_OF_GRADES; grade++) {
    const nrOfClasses = chance.integer({ min: MIN_CLASSES, max: MAX_CLASSES })
    const suffixes = [...new Array(nrOfClasses).keys()].map(n => String.fromCharCode(n + 65))

    const clazzes = suffixes.map(suffix => rndClass(grade, suffix))
    classes.set(grade, clazzes)
  }

  return {
    classes
  }
}
