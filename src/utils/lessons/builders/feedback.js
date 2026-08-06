// Composes the parts built by hint()/commonMistake()/funFact()/
// grammarNote()/extraExample() into the single object quiz()'s `feedback`
// argument expects - e.g.
//
//   feedback(
//       hint("Lembre-se: 'Hi' é informal."),
//       commonMistake("Muita gente usa 'Hi' em contextos formais.")
//   )
//
// Every part is optional and independent, so an author only writes the
// ones that add real value to a given question - same "skip what doesn't
// apply" spirit as every other optional lesson field.
export function feedback(...parts) {
    return Object.assign({}, ...parts);
}
