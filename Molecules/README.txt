https://www.codewars.com/kata/5a27ca7ab6cfd70f9300007a/train/javascript

Overview:
The idea of this kata is to create two classes, Molecule and Atom, that will allow you to build numerical equivalents of organic compounds using a set of methods, and to restitute some of their simplest properties (molecular weight and raw formula, for instance). You will need to implement some Exception classes in the process (note for Java users: all exceptions will be unchecked and extend RuntimeException)

3D Balls

(Biotin. Source: wikipedia)

Molecules are beautiful things. Especially organic ones...




The Molecule class
This is the main object, the "builder of things" ( ;p ), representing the whole molecule, its properties and atoms, and holding all the related methods to build and modify the molecule object.

Required properties/getters:
this.formula
Gives the raw formula of the final molecule as a string (ex: "C4H10", "C5H10O2BrClS", ...; see detailed behaviors and supplementary information below)


this.molecularWeight
The value of the molecular weight of the final molecule in g/mol, as a double value (see detailed behaviors and supplementary information below).


this.atoms
A list of Atom objects. Atoms are appended to the list in the order of their creation.


this.name
The name of the molecule, as a string of course (provided or not in the constructor. Default will be the empty string).



Required methods:


var m = new Molecule(name)
Constructor(s), with or without the name of the molecule as argument (as a string)



m.brancher(x, y, z, ...)
Add new "branches" of carbons, linked together, to the current molecule.
Each argument correspond to the number of carbons of one branch.
There can be any number of arguments.
All branches have to be created in the provided order.


m.bounder([c1,b1,c2,b2], ...)
Create new bonds between two atoms of already existing branches.
Each argument is a tuple (python) / T object (java) of four integers giving:
c1 & b1: carbon and branch number of the first atom
c2 & b2: carbon and branch number of the second atom
All numbers are 1-indexed, meaning (1,1,5,3) will bond the first carbon of the first branch with the fifth of the third branch.
Only positive numbers will be used.


m.mutate([nc,nb,elt], ...)
Mutate the carbon number nc in the branch nb (reminder: both 1-indexed) to the chemical element elt, as a string (this is mutation, the id number of the instance stays the same. See the Atom class specs about that).



m.add([nc,nb,elt], ...)
Add a new Atom of kind elt (string) on the carbon number nc in the branch nb. Atoms added this way are not considered as being part of the branch they are bonded to.



m.addChaining(nc, nb, elt1, elt2, ...)
Starting from the carbon nc in the branch nb, add successively all the elements provided as arguments, following themselves. Meaning: m.add_chaining(2, 5, "C", "C", "C", "Mg", "Br") will add the chain ...-C-C-C-Mg-Br to the atom number 2 in the branch 5. As for the add method, this chain is not considered as a new branch of the molecule.



m.closer()
Finalize the molecule instance, adding missing hydrogens everywhere and locking the object (see "behaviors" part below).



m.unlock()
Make the molecule modifiable again. Hydrogens should be removed (id numbers of the remaining atoms should be continuous, beginning at 1), as well as any empty branch you might encounter during the operation (see the related behaviors below for additional information).



Related behaviors:
Methods that involve building or doing modifications to the molecule object have to be chainable (ex: molec = Molecule("octane").brancher(8).closer()).
Building a molecule consists in mutating the original object at each method call.
An InvalidBond exception should be thrown each tiem you encounter a case where an atom exceed it's valence number or is bounded to itself (about the valence number, see supplementary information below).
When a method throws an exception while it has several arguments/atoms to handle, the modifications resulting from the valid previous operations must be kept but all the arguments after the error are ignored.
Special case with add_chaining: if an error occurs at any point during the building of the chain, all its atoms have to be removed from the molecule (even the valid ones).
The whole molecule integrity should hold against any error, meaning that it has to be possible to correctly build the molecule object even after an exception has been thrown.
The fields formula and molecular_weight (python) or the associated getters (java) should throw an UnlockedMolecule exception if access to them is attempted while the molecule isn't locked (because we do not want the user able to catch incomplete/invalid information).
In the same manner, attempts of modification of a molecule object after it has been locked should throw a LockedMolecule exception (the closer method follows this behavior too).
While unlocking a molecule, if by any (bad...) chance you end up with a molecule that does not have any branch left after unlocking, throw an EmptyMolecule exception.
Once unlocked, the molecule has to be modifiable again, in any way.


Additional information:
Raw formula of organic compounds:
The raw formula indicates the number of each kind of chemical element in the molecule. There are several possible rules about the order of the atoms, here, we will use the following: C, H, O, ... other elements in alphabetic order.
Example: "C4H10" for C4H10, "C5H10O2BrClS", ... Note that ones are not displayed.

Valence number of an atom:
The valence number of an atom is the number of bonds it can hold. No less, no more.
(Note for the chemists: we will use all atoms at their lowest valence when several are possible. Meaning the valence number will be 2 for S, 3 for P, ... In the same manner, impossible bonds due to geometrical criteria such as a quadruple bond between two carbons will be allowed)

Molecular weight:
The molecular weight of a molecule is the sum of the atomic weight of all its atoms.

You may find below all the data needed in the kata (symbols, valence numbers, and related atomic weights):

Symbol:           H     B     C     N     O     F    Mg     P     S    Cl    Br
Valence number:   1     3     4     3     2     1     2     3     2     1     1
Atomic weight:  1.0  10.8  12.0  14.0  16.0  19.0  24.3  31.0  32.1  35.5  80.0  (in g/mol)




The Atom class
Instances of this class represent atoms in a specific Molecule instance and the bonds they hold with other Atom instances.

Required properties:
this.element
This is the chemical symbol as a string ("C", "Br", "O", ...)

this.id
An integer that allows to keep track of all the atoms of the same molecule, beginning with 1 (step of one for any new Atom instance).

Required methods:
There are not provided methods in JS.
As you will see with the implementations of these two methods, all atoms are considered different from each others in a Molecule instance.

toString
Return a string formatted like the following: "Atom(element.id: element1id,element2id,element3id...)".

element: symbol of the current Atom instance
id: id of the current element (beginning at 1 for each Molecule instance)
element1id: element1, bonded to the current Atom and its id number. If the bonded atom is a hydrogen, do not display its id number, to increase readability.
The elements bonded to the current atom must be sorted in the same order than for the raw formula, except that the hydrogens will go to the end, again for a better readability. Same kind of atoms are sorted by increasing value of their id number.

Examples: "Atom(C.2: C3,C14,O6,H)" or "Atom(C.24: C1,O6,N2,H)"




Final notes:
You can add any method or field you'd like to the two objects and organize/design the whole thing as you'd prefer as long as the objects comply with the contracts above.
The tests will only call for properties/methods described in the present contracts.
Methods will always receive valid arguments, considering carbons or branches numbers, or chemical elements symbols.
Atom instances will never be modified directly during the tests, all is done through the Molecule class.
About the required exceptions classes, you can implement subclasses if you want, but their names will have to contain the name of the one originally expected.

Enjoy! 
