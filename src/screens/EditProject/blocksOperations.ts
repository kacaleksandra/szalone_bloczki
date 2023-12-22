import { Block } from "./blocksType";

export const blocksOperations = {
  moveObjectLeft: (_blocks: Block[], objectKey: number) => {
    for (let i = 0; i < _blocks.length; i++) {
      if (_blocks[i].hasInside) {
        for (let j = 0; j < _blocks[i].inside.length; j++) {
          if (_blocks[i].inside[j].key === objectKey) {
            const objectToMove = _blocks[i].inside.splice(j, 1)[0]; // Remove object from inside[]
            // Insert object after its immediate parent
            _blocks.splice(i + 1, 0, objectToMove);
            return objectToMove; // Return the object moved
          }
        }
        // If the object wasn't found in the current level, search deeper
        const foundObject = blocksOperations.moveObjectLeft(
          _blocks[i].inside,
          objectKey
        );
        if (foundObject) return foundObject; // Object found and moved
      }
    }
    return null; // Object not found
  },
  moveObjectRight: (_blocks: Block[], objectKey: number) => {
    for (let i = 0; i < _blocks.length; i++) {
      if (_blocks[i].key === objectKey) {
        const objectToMove = _blocks.splice(i, 1)[0]; // Remove object from current level
        // Insert object inside its previous sibling
        _blocks[i - 1].inside.push(objectToMove);
        return objectToMove; // Return the object moved
      } else if (_blocks[i].hasInside) {
        // If the object wasn't found in the current level, search deeper
        const foundObject = blocksOperations.moveObjectRight(
          _blocks[i].inside,
          objectKey
        );
        if (foundObject) return foundObject; // Object found and moved
      }
    }
    return null; // Object not found
  },
  moveObjectUp: (_blocks: Block[], objectKey: number) => {
    for (let i = 0; i < _blocks.length; i++) {
      if (_blocks[i].key === objectKey) {
        const objectToMove = _blocks.splice(i, 1)[0]; // Remove object from current level
        // Insert object before its previous sibling
        _blocks.splice(i - 1, 0, objectToMove);
        return objectToMove; // Return the object moved
      } else if (_blocks[i].hasInside) {
        // If the object wasn't found in the current level, search deeper
        const foundObject = blocksOperations.moveObjectUp(
          _blocks[i].inside,
          objectKey
        );
        if (foundObject) return foundObject; // Object found and moved
      }
    }
    return null; // Object not found
  },
  moveObjectDown: (_blocks: Block[], objectKey: number) => {
    for (let i = 0; i < _blocks.length; i++) {
      if (_blocks[i].key === objectKey) {
        const objectToMove = _blocks.splice(i, 1)[0]; // Remove object from current level
        // Insert object after its next sibling
        _blocks.splice(i + 1, 0, objectToMove);
        return objectToMove; // Return the object moved
      } else if (_blocks[i].hasInside) {
        // If the object wasn't found in the current level, search deeper
        const foundObject = blocksOperations.moveObjectDown(
          _blocks[i].inside,
          objectKey
        );
        if (foundObject) return foundObject; // Object found and moved
      }
    }
    return null; // Object not found
  },
  addBlockToEnd: (_blocks: Block[], newBlock: Block) => {
    const lastItem = _blocks[_blocks.length - 1];
    if (!lastItem || !lastItem.hasInside) {
      // If the last item doesn't exist or doesn't allow inside elements,
      // add the value to the end of the current array
      _blocks.push(newBlock);
    } else {
      // If the last item allows inside elements, recursively check its inside array
      blocksOperations.addBlockToEnd(lastItem.inside, newBlock);
    }
  },
  deleteObject: (_blocks: Block[], objectKey: number) => {
    for (let i = 0; i < _blocks.length; i++) {
      if (_blocks[i].key === objectKey) {
        const deletedItem = _blocks.splice(i, 1)[0];
        if (deletedItem.hasInside && deletedItem.inside.length > 0) {
          // Move inside elements one layer up
          _blocks.splice(i, 0, ...deletedItem.inside);
        }
        return deletedItem;
      } else if (
        Array.isArray(_blocks[i].inside) &&
        _blocks[i].inside.length > 0
      ) {
        const deletedItem = blocksOperations.deleteObject(
          _blocks[i].inside,
          objectKey
        );
        if (deletedItem) return deletedItem;
      }
    }
    return null;
  },
};
