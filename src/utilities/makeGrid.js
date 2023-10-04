export const makeGrid = (num) => {
   const size = parseInt(num, 10);
   const rest = size % 5;
   const length = rest ? size + 5 - rest : size; // quantity of grid items should be divisible 5
   const arr = [[-2, -2, -1]]; // base values to start template

   const height = (length / 5) * 3; //  quantity of lines at grid
   const width = 3;

   // formula for each line calculation
   const col1 = incrTempl([2, 0, 4, 1, 3, 0], height);
   const col2 = incrTempl([3, 2, 0, 3, 2, 0], height);
   const col3 = incrTempl([3, 1, 0, 4, 0, 2], height);
   const templ = [col1, col2, col3];

   // adjust array for our size of lines
   for (let i = 1; i < height; i++) {
      arr[i] = [];
   }

   let temporary;

   for (let col = 0; col < width; col++) {
      for (let line = 0; line < height; line++) {
         if(line === 0) {
            arr[line][col] = arr[line][col] + templ[col][line];
         } else {
            arr[line][col] = temporary + templ[col][line];
         }
         temporary = arr[line][col]
      }
   }
   const answ = arr.map((arr) => {
      return `'p${arr[0]} p${arr[1]} p${arr[2]}'`
   })
   return answ.toString().split(',');
}

// increasing formula values quantity
function incrTempl (arr, height) {
   if(arr.length === height) {
      return arr;
   }
   if(arr.length > height) {
      return [arr[0], arr[1], arr[2]]
   } else {
      const templ = arr.slice(0);
      const diff = height - arr.length;
      let index = 0;

      for (let i = 0; i < diff; i++) {
         templ.push(arr[index])
         index++;
         if(index === 6) {
            index = 0;
         }
      }
      return templ;
   }
}