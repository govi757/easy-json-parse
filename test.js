const transformObject = require(".");

const data = {
    profile: {
      details: {
        name: "Govind"
      },
      marks: [
        { subject: "english", mark: 50, outOf: 50,sel: [{val: 20},{val:30}] },
        { subject: "social", mark: 43, outOf: 50,sel: [{val: 30}] },
      ],
      age: 50
    },
    age: 30
  };

  const spec = {
    name: "@profile.details.name",
    b: {
      c: "@profile.details.name + ' is a good boy'",
      d: "@profile.age + 10",
      e: "@nonexistentKey",
      totalMarks: "@profile.marks[*].sel[*].val",
    //   totalOutoffs: "@profile.marks[*].outOf",
    //   average: "@profile.marks[*].mark / @profile.marks.length",
    //   firstMark: "@profile.marks(0).outOf",
    //   subjectsList: "@profile.marks[*].subject"
    }
  };
  

console.log(transformObject(data,spec))