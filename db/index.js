// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
let chance = new Chance();

// index.js
module.exports = () => {

  const TODAY = new Date(Date.now())

  const SCHOOL_ENTRY_AGE = 6

  const SCHOOL_EXIT_AGE = 19

  const data = {
    students: [],
    teachers: [],
    classes: [],
  }

  // Students
  const number_of_students = 1000

  for (let i = 0; i < number_of_students; i++) {
    let gender = chance.gender()
    data.students.push({
      id: i,
      picture: chance.avatar({
        protocol: 'https',
        fileExtension: 'jpg',
      }),
      first: chance.first({ gender }),
      last: chance.last(),
      gender,
      birthday: chance.birthday({
        year: chance.year({
          max: TODAY.getFullYear() - SCHOOL_ENTRY_AGE,
          min: TODAY.getFullYear() - SCHOOL_EXIT_AGE,
        }),
      }),
      address: chance.address(),
      zip: chance.zip(),
      city: chance.city(),
      country: chance.country({ full: true }),
    })
  }

  // Teacher
  const number_of_teachers = 50

  for (let i = 0; i < number_of_teachers; i++) {
    let gender = chance.gender()
    data.teachers.push({
      id: i,
      picture: chance.avatar({
        protocol: 'https',
        fileExtension: 'jpg',
      }),
      first: chance.first({ gender }),
      last: chance.last(),
      gender,
      birthday: chance.birthday({ type: 'adult' }),
      address: chance.address(),
      zip: chance.zip(),
      city: chance.city(),
      country: chance.country({ full: true }),
    })
  }

  students_by_age = data.students.reduce((acc, student) => {
    const year = student.birthday.getFullYear()
    const this_year = TODAY.getFullYear()

    if (acc[this_year - year]) {
      acc[this_year - year].push(student)
    } else {
      acc[this_year - year] = [student]
    }
    return acc
  }, {})

  // Classes
  const students_per_class = 25
  let remaining_teachers = data.teachers
  let class_id = 0

  for (let [age, students] of Object.entries(students_by_age)) {

    const student_partition = divideStudentsIntoClasses(students.length, students_per_class)
    remaining_students = students

    let class_counter = 0
    for (let count of student_partition) {
      const [pickedStudents, restStudents] = pickPerson(remaining_students, count)
      const [pickedTeacher, restTeachers] = pickPerson(remaining_teachers, 1)

      if (!pickedTeacher) {
        throw("Number of classes exceeds the number of teachers.")
      }

      data.classes.push({
        id: class_counter,
        handle: age - SCHOOL_ENTRY_AGE + 1 + String.fromCharCode(class_counter + 65),
        teacherId: pickedTeacher[0].id,
        studentIds: pickedStudents.map(s => s.id)
      })

      remaining_students = restStudents
      remaining_teachers = restTeachers
      class_id += 1
      class_counter += 1
    }
  }

  return data
}

function pickPerson(students, count) {
  const picked = chance.pickset(students, count)
  remaining_students = students.filter(el => picked.indexOf(el) === -1)
  return [picked, remaining_students]
}

function divideStudentsIntoClasses(number_of_students, students_per_class) {
  const number_of_classes = Math.ceil(number_of_students / students_per_class);

  let classes = []
  for (let i = 0; i < number_of_classes; i += 1) classes[i] = 0

  // evenly distribute students
  for (let s = 0; s < number_of_students; s += 1) {
    classes[s % number_of_classes] += 1
  }
  return classes
}
