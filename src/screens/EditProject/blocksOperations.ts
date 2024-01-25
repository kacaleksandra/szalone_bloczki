import { Block } from "./blocksType";

export const blocksOperations = {
  moveObjectLeft: (_blocks: Block[], objectKey: number) => {
    for (let i = 0; i < _blocks.length; i++) {
      if (_blocks[i].hasInside) {
        for (let j = 0; j < _blocks[i].inside.length; j++) {
          if (_blocks[i].inside[j].key === objectKey) {
            const objectToMove = _blocks[i].inside.splice(j, 1)[0];
            _blocks.splice(i + 1, 0, objectToMove);
            return true;
          }
        }
        const foundObject = blocksOperations.moveObjectLeft(
          _blocks[i].inside,
          objectKey
        );
        if (foundObject) return true;
      }
    }
    return false;
  },
  moveObjectRight: (_blocks: Block[], objectKey: number) => {
    for (let i = 0; i < _blocks.length; i++) {
      if (_blocks[i].key === objectKey) {
        const objectToMove = _blocks.splice(i, 1)[0];
        _blocks[i - 1].inside.push(objectToMove);
        return true;
      } else if (_blocks[i].hasInside) {
        const foundObject = blocksOperations.moveObjectRight(
          _blocks[i].inside,
          objectKey
        );
        if (foundObject) return true;
      }
    }
    return false;
  },
  moveObjectUp: (_blocks: Block[], objectKey: number) => {
    for (let i = 0; i < _blocks.length; i++) {
      if (_blocks[i].key === objectKey) {
        const objectToMove = _blocks.splice(i, 1)[0];
        _blocks.splice(i - 1, 0, objectToMove);
        return true;
      } else if (_blocks[i].hasInside) {
        const foundObject = blocksOperations.moveObjectUp(
          _blocks[i].inside,
          objectKey
        );
        if (foundObject) return true;
      }
    }
    return false;
  },
  moveObjectDown: (_blocks: Block[], objectKey: number) => {
    for (let i = 0; i < _blocks.length; i++) {
      if (_blocks[i].key === objectKey) {
        const objectToMove = _blocks.splice(i, 1)[0];
        _blocks.splice(i + 1, 0, objectToMove);
        return true;
      } else if (_blocks[i].hasInside) {
        const foundObject = blocksOperations.moveObjectDown(
          _blocks[i].inside,
          objectKey
        );
        if (foundObject) return true;
      }
    }
    return false;
  },
  addBlockToEnd: (_blocks: Block[], newBlock: Block) => {
    const lastItem = _blocks[_blocks.length - 1];
    if (!lastItem || !lastItem.hasInside) {
      _blocks.push(newBlock);
    } else {
      blocksOperations.addBlockToEnd(lastItem.inside, newBlock);
    }
  },
  deleteObject: (_blocks: Block[], objectKey: number) => {
    for (let i = 0; i < _blocks.length; i++) {
      if (_blocks[i].key === objectKey) {
        const deletedItem = _blocks.splice(i, 1)[0];
        if (deletedItem.hasInside && deletedItem.inside.length > 0) {
          _blocks.splice(i, 0, ...deletedItem.inside);
        }
        return true;
      } else if (
        Array.isArray(_blocks[i].inside) &&
        _blocks[i].inside.length > 0
      ) {
        const deletedItem = blocksOperations.deleteObject(
          _blocks[i].inside,
          objectKey
        );
        if (deletedItem) return true;
      }
    }
    return false;
  },
};
