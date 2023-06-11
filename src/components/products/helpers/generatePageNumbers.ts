const generatePageNumbers = (currPage: number, lastPage: number): number[] => {
    let pageArray: number[] = [];

    if (currPage === 1) {
      if (lastPage < 7) {
        for (let i = 1; i < lastPage; i++) {
          pageArray.push(i);
        }
        return pageArray.length === 0 ? [1] : pageArray;
      } else {
        return [1, 2, 3, 4, 5, 6, 7];
      }
    }

    if (currPage > 1 && currPage < lastPage) {
      if (currPage - 4 > 0) {
        for (let i = currPage; i > currPage - 4; i--) {
          pageArray.push(i - 1);
        }
      } else {
        for (let i = 1; i < currPage; i++) {
          pageArray.push(currPage - i);
        }
      }

      pageArray = pageArray.reverse();
      pageArray.push(currPage);

      if (currPage + 3 < lastPage) {
        for (let i = currPage; i < currPage + 4; i++) {
          pageArray.push(i + 1);
        }
      } else {
        for (let i = currPage; i <lastPage; i++) {
          pageArray.push(i + 1);
        }
      }
    }

    if (currPage === lastPage) {
      for (let i = 0; i < 4; i++) {
        pageArray.push(lastPage - i);
      }

      pageArray = pageArray.reverse();
    }

    return pageArray;
  };

  export default generatePageNumbers;