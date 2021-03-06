class Molecule {
  constructor(name = "") {
    this.name = name;
    this.atoms = [];
    this.branchI = 0;
    this.branches = {};
    this.formula = "";
    this.molecularWeight = 0;
    this.locked = false;
    this.currentInstance = [];
    this.currentId = 0;
  }

  brancher(...args) {
    /*
    ARGS: x, y, z, ...
    Add new "branches" of carbons, linked together, to the current molecule.
    Each argument correspond to the number of carbons of one branch.
    There can be any number of arguments.
    All branches have to be created in the provided order.

    octane:    CH3-CH2-CH2-CH2-CH2-CH2-CH2-CH3
    var octane = new Molecule('octane').brancher(8).closer()
    */

    args.forEach((branch, index) => {
      this.branchI++;
      for (let i = 0; i < branch; i++) {
        this.currentInstance.push(["C", this.branchI]);
      }
    });

    return this;
  }

  bounder(...args) {
    /*
    ARGS: [c1, b1, c2, b2], ...
    Create new bonds between two atoms of already existing branches.
    Each argument is a tuple (python) / T object (java) of four integers giving:
    c1 & b1: carbon and branch number of the first atom
    c2 & b2: carbon and branch number of the second atom
    All numbers are 1-indexed, meaning (1,1,5,3) will bond the first carbon of the first branch with the fifth of the third branch.
    Only positive numbers will be used.
    */

    return this;
  }

  mutate(...args) {
    /*
    ARGS: [nc,nb,elt], ...
    Mutate the carbon number nc in the branch nb (reminder: both 1-indexed) to the chemical element elt, as a string (this is mutation, the id number of the instance stays the same. See the Atom class specs about that).
    */
    return this;
  }

  add(...args) {
    /*
    ARGS: [nc,nb,elt], ...
    Add a new Atom of kind elt (string) on the carbon number nc in the branch nb. Atoms added this way are not considered as being part of the branch they are bonded to.
    */
  }

  addChaining(...args) {
    /*
    ARGS: nc, nb, elt1, elt2, ...
    Starting from the carbon nc in the branch nb, add successively all the elements provided as arguments, following themselves. Meaning: m.add_chaining(2, 5, "C", "C", "C", "Mg", "Br") will add the chain ...-C-C-C-Mg-Br to the atom number 2 in the branch 5. As for the add method, this chain is not considered as a new branch of the molecule.
    */
    return this;
  }

  closer() {
    const { currentInstance, atoms } = this;

    currentInstance.forEach((c, i) => {
      const branch = c[1];
      let carbon = new Atom("C", ++this.currentId);
      let hydrogens = 4;

      if (currentInstance.length > 1) {
        if (
          (i === 0 && atoms.length === 0) ||
          i === currentInstance.length - 1
        ) {
          hydrogens = 3;
        } else {
          hydrogens = 2;
        }
      }

      const hyds = [];

      for (let i = 0; i < hydrogens; i++) {
        let hydrogen = new Atom("H", ++this.currentId);
        hydrogen.bonded.push(carbon);
        carbon.bonded.push(hydrogen);
        hyds.push(hydrogen);
      }

      atoms.push(carbon);
      this.branches[branch] =
        branch in this.branches ? [...this.branches[branch], carbon] : [carbon];

      for (let i = 0; i < hyds.length; i++) {
        this.atoms.push(hyds[i]);
        this.branches[branch] =
          branch in this.branches
            ? [...this.branches[branch], hyds[i]]
            : [hyds[i]];
      }
    });

    this.calculateWeight();
    this.calculateFormula();
    this.locked = true;
    return this;
    /*
    Finalize the molecule instance, adding missing hydrogens everywhere and locking the object (see "behaviors" part below).
    */
  }

  unlock() {
    this.locked = false;
    /*
    Make the molecule modifiable again. Hydrogens should be removed (id numbers of the remaining atoms should be continuous, beginning at 1), as well as any empty branch you might encounter during the operation (see the related behaviors below for additional information).
    */
  }

  calculateFormula() {
    if (this.atoms.length === 0) return "";

    const elements = [...this.atoms];

    const tallyElem = el => {
      if (el) {
        const els = elements.filter(a => a.element === el).length;
        return els > 0 ? el + (els > 1 ? els : "") : "";
      }

      let res = "";
      const obj = elements
        .filter(
          a => a.element !== "C" && a.element !== "H" && a.element !== "O"
        )
        .sort((a, b) => a.element.localeCompare(b.element))
        .reduce(
          (acc, a) => ({
            ...acc,
            [a.element]: a.element in acc ? [...acc[a.element], a] : [a]
          }),
          {}
        );

      for (elem in obj) {
        res += tallyElem(elem);
      }

      return res;
    };

    this.formula = [
      tallyElem("C"),
      tallyElem("H"),
      tallyElem("O"),
      tallyElem()
    ].join("");
  }

  calculateWeight() {
    this.molecularWeight = this.atoms.reduce(
      (acc, i) => acc + Atom.info[i.element].weight,
      0
    );
  }
}

/* Instances of this class represent atoms in a specific Molecule instance and the bonds they hold with other Atom instances. 

Atom instances will never be modified directly during the tests, all is done through the Molecule class.
*/

class Atom {
  constructor(elt, id_) {
    /* This is the chemical symbol as a string ("C", "Br", "O", ...) */
    this.element = elt;

    /* An integer that allows to keep track of all the atoms of the same molecule, 
    beginning with 1 (step of one for any new Atom instance). */
    this.id = id_;
    this.bonded = [];
  }

  // *** WORKING ***
  toString() {
    const sortedElem = el => {
      let sorted = [...this.bonded];
      if (typeof el === "undefined") {
        sorted = sorted.filter(
          a => a.element !== "C" && a.element !== "O" && a.element !== "H"
        );
      } else {
        sorted = sorted.filter(a => a.element === el);
      }

      return sorted
        .sort((a, b) => {
          if (el) return a.id - b.id;
          const elemCompare = a.element.localeCompare(b.element);
          return elemCompare !== 0 ? elemCompare : a.id - b.id;
        })
        .map(a => (el === "H" ? a.element : a.element + a.id))
        .join(",");
    };

    const bonded = [
      sortedElem("C"),
      sortedElem("O"),
      sortedElem(),
      sortedElem("H")
    ]
      .join(",")
      .replace(/(^[,]+)|([,]+$)/, "");

    return `Atom(${this.element}.${this.id}: ${bonded})`;
    /*
    Return a string formatted like the following: "Atom(element.id: element1id,element2id,element3id...)".

    element: symbol of the current Atom instance
    id: id of the current element (beginning at 1 for each Molecule instance)

    element1id: element1, bonded to the current Atom and its id number. 
    If the bonded atom is a hydrogen, do not display its id number, to increase readability.
    The elements bonded to the current atom must be sorted in the same order than for the raw formula, 
    except that the hydrogens will go to the end, again for a better readability. 
    Same kind of atoms are sorted by increasing value of their id number.

    C, O, ... other elements in alphabetic order.
    Hydrogen will go af the end with no ID.

    Examples: "Atom(C.2: C3,C14,O6,H)" or "Atom(C.24: C1,O6,N2,H)"
    */
  }
}

Atom.info = {
  H: {
    valence: 1,
    weight: 1
  },
  B: {
    valence: 3,
    weight: 10.8
  },
  C: {
    valence: 4,
    weight: 12
  },
  N: {
    valence: 3,
    weight: 14
  },
  O: {
    valence: 2,
    weight: 16
  },
  F: {
    valence: 1,
    weight: 19
  },
  Mg: {
    valence: 2,
    weight: 24.3
  },
  P: {
    valence: 3,
    weight: 31
  },
  S: {
    valence: 2,
    weight: 32.1
  },
  Cl: {
    valence: 1,
    weight: 35.5
  },
  Br: {
    valence: 1,
    weight: 80
  }
};
