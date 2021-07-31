// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Returns an object that contains the specimen number and its dna
const pAequorFactory = (n, dnaArray) => {
  return {
    specimenNum: n,
    dna: dnaArray,
    
    // Randomly selects a base in the dna sequence and replace it with a randomly generated base, not equal to itself
    mutate() {
      const dnaCopy = dnaArray.slice()
      let mutationIndex = Math.floor(Math.random() * 15);
      let newMutatedBase = returnRandBase();
      while (newMutatedBase === dnaCopy[mutationIndex]) {
        newMutatedBased = returnRandBase();
      }
      dnaCopy[mutationIndex] = newMutatedBase;
      return dnaCopy;
    },
    
    // Compares the current DNA sequence with one that is passed in, bases in the same indexed positions. Then, a percentage of likeness is calculated. 
    compareDNA(pAequorObj) {
      let commonCount = 0;
      for (let i = 0; i < 15; i++) {
        if (dnaArray[i] === pAequorObj.dna[i]) {
          commonCount++;
        }
      }
      let percentCommon = (commonCount/15 * 100).toFixed(2);
      console.log(`specimen #${this.specimenNum} and specimen #${pAequorObj.specimenNum} have ${percentCommon}% DNA in common.`)
    },

    // The DNA sequence enables good survival if at least 60% of its bases are 'C' or 'G'. This method returns true if the threshhold is met.
    willLikelySurvive() {
      let count = 0;
      for (let base of dnaArray) {
        if (base === 'C' || base === 'G') {
          count++;
        }
      }
      if (count/15 >= 0.6) {
        return true;
      } else {
        return false;
      }
    }
  }
}

// This function randomly creates a number of pAequor DNA sequences that are likely to survive. User specifies the number wanted.
const likelySurviveList = num => {
  const list = [];
  let i = 0; n = 1; // i is index of the last DNA added to the list; n is the current specimen number.
  while (i < num) {
    let sample = pAequorFactory(n, mockUpStrand());
    if (sample.willLikelySurvive()===true) {
      list.push(sample.dna);
      i++;
    }
    n++;
  }
  return list;
}

console.log(likelySurviveList(30))

// To add functionality, replace 15 with dnaArray.length for use with DNA sequence of variable lengths.
// let test1 = pAequorFactory(1, mockUpStrand());
// let test2 = pAequorFactory(2, mockUpStrand());
// console.log(`pAequor specimen 1 = `+ test1.dna)
// console.log(`pAequor specimen 2 = `+ test2.dna)
// test1.compareDNA(test2)
