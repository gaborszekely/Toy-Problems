class Blobservation {
  constructor(h, w) {
    this.h = h;
    this.w = w || h;
    this.blobs = [];
    this.smallest;
    this.i = 0;
  }

  populate(blobs) {
    blobs.forEach(this.validate.bind(this));
    this.blobs = this.mergeBlobs(blobs, this.blobs);
    this.setSmallest();
  }

  move(iterations = 1) {
    this.validateMove(iterations);

    for (let i = 0; i < iterations; i++) {
      let newState = [];
      const currentState = cloneAry(this.blobs);

      // Move each blob and push new positions to newState
      this.blobs.forEach(blob => {
        if (blob.size > this.smallest) {
          newState.push(this.moveBlob(blob, currentState));
        } else {
          newState.push(blob);
        }
      });

      // Merge overlapping blobs and set this.blobs to newState
      this.blobs = this.mergeBlobs(newState);

      // Set new smallest blob
      this.setSmallest();
    }
  }

  moveBlob(blob, state) {
    let targets = [];
    // Assess neighbors by distance
    state
      .filter(n => n.size < blob.size)
      .forEach(n => {
        let distance = this.findOffsetDistance(blob, n);
        targets.push({ ...n, distance });
      });

    if (targets.length === 0) return blob;

    // Find closest blob that is largest of the smaller blobs
    const target = targets.reduce((acc, n) => {
      if (n.distance <= acc.distance) {
        if (n.distance < acc.distance) return n;
        if (n.distance === acc.distance) {
          if (n.size > acc.size) return n;
          // If there are multiple, find first starting in clockwise direction
          if (n.size === acc.size) {
            const angleN = this.findAngle(blob, n);
            const angleAcc = this.findAngle(blob, acc);
            return angleN < angleAcc || angleN === 360 ? n : acc;
          }
        }
      }

      return acc;
    }, targets[0]);

    // Determine direction(s) to move
    let mX, mY;
    if (blob.x < target.x) {
      mX = 1;
    } else {
      mX = blob.x > target.x ? -1 : 0;
    }
    if (blob.y < target.y) {
      mY = 1;
    } else {
      mY = blob.y > target.y ? -1 : 0;
    }

    // Return new coordinates
    return {
      ...blob,
      x: blob.x + mX,
      y: blob.y + mY
    };
  }

  print_state() {
    if (this.blobs.length === 0) return [];

    return this.blobs
      .sort((a, b) => {
        if (a.x < b.x) return -1;
        if (a.x > b.x) return 1;
        return a.y < b.y ? -1 : 1;
      })
      .map(i => Object.values(i));
  }

  findOffsetDistance(blob, neighbor) {
    if (blob.x === neighbor.x && blob.y === neighbor.y) return 0;

    if (blob.x === neighbor.x || blob.y === neighbor.y) {
      return blob.x === neighbor.x
        ? Math.abs(blob.y - neighbor.y)
        : Math.abs(blob.x - neighbor.x);
    }

    const mX = blob.x < neighbor.x ? 1 : -1;
    const mY = blob.y < neighbor.y ? 1 : -1;

    return (
      1 +
      this.findOffsetDistance(
        {
          ...blob,
          x: blob.x + mX,
          y: blob.y + mY
        },
        neighbor
      )
    );
  }

  mergeBlobs(b, current = []) {
    let blobs = cloneAry(b);
    return blobs.reduce((acc, blob) => {
      if (acc.length === 0) {
        acc = [...acc, blob];
      } else {
        let added = false;
        acc.forEach((b, i) => {
          if (!added) {
            if (blob.x === b.x && blob.y === b.y) {
              acc[i].size += blob.size;
              added = true;
            } else {
              if (i === acc.length - 1) {
                acc = [...acc, blob];
                added = true;
              }
            }
          }
        });
      }
      return acc;
    }, current);
  }

  validate(blob) {
    const { size, x, y } = blob;
    if (
      typeof size !== "number" ||
      typeof x !== "number" ||
      typeof y !== "number" ||
      x !== x ||
      y !== y ||
      size !== size
    ) {
      throw "Invalid blob properties";
    }

    if (x < 0 || y < 0 || x > this.h || y > this.w) {
      throw "Invalid blob coordinates";
    }

    if (size < 1 || size > 20) {
      throw "Invalid blob size";
    }
  }

  validateMove(i) {
    if (i < 1 || typeof i !== "number" || i !== i) {
      throw "Invalid iterations parameter";
    }
  }

  setSmallest() {
    this.smallest = this.blobs.reduce(
      (acc, blob) => (blob.size < acc ? blob.size : acc),
      20
    );
  }

  findAngle(blob, { x, y }) {
    const midX = blob.x;
    const midY = blob.y;
    const a = y - midY;
    const b = midX - x;
    const c = Math.sqrt(a ** 2 + b ** 2);
    const angle = Math.asin(a / c) * (180 / Math.PI);

    if (a >= 0 && b >= 0) return angle;
    if (a >= 0 && b < 0) return 180 - angle;
    if (a < 0 && b < 0) return 180 - angle;
    if (a < b && b >= 0) return 360 + angle;
  }
}

function cloneObj(obj) {
  let res = {};
  for (let key in obj) {
    res[key] = obj[key];
  }
  return res;
}

function cloneAry(ary) {
  let res = [];
  for (let i = 0; i < ary.length; i++) {
    res.push(cloneObj(ary[i]));
  }
  return res;
}

const generation0 = [
  { x: 0, y: 4, size: 3 },
  { x: 0, y: 7, size: 5 },
  { x: 2, y: 0, size: 2 },
  { x: 3, y: 7, size: 2 },
  { x: 4, y: 3, size: 4 },
  { x: 5, y: 6, size: 2 },
  { x: 6, y: 7, size: 1 },
  { x: 7, y: 0, size: 3 },
  { x: 7, y: 2, size: 1 }
];

const generation1 = [
  { x: 3, y: 6, size: 3 },
  { x: 8, y: 0, size: 2 },
  { x: 5, y: 3, size: 6 },
  { x: 1, y: 1, size: 1 },
  { x: 2, y: 6, size: 2 },
  { x: 1, y: 5, size: 4 },
  { x: 7, y: 7, size: 1 },
  { x: 9, y: 6, size: 3 },
  { x: 8, y: 3, size: 4 },
  { x: 5, y: 6, size: 3 },
  { x: 0, y: 6, size: 1 },
  { x: 3, y: 2, size: 5 }
];

const generation2 = [
  { x: 5, y: 4, size: 3 },
  { x: 8, y: 6, size: 15 },
  { x: 1, y: 4, size: 4 },
  { x: 2, y: 7, size: 9 },
  { x: 9, y: 0, size: 10 },
  { x: 3, y: 5, size: 4 },
  { x: 7, y: 2, size: 6 },
  { x: 3, y: 3, size: 2 }
];

const blobs = new Blobservation(10, 8);
blobs.populate(generation1);
blobs.move();
blobs.move(2);
console.log(blobs.print_state());
z = [
  [0, 6, 7],
  [1, 5, 3],
  [2, 2, 6],
  [4, 1, 6],
  [6, 1, 2],
  [6, 4, 4],
  [6, 6, 7]
];
