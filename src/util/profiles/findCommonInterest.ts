export default function findCommonInterests(array1:string[], array2:string[]):string[] {
  const set2 = new Set(array2);
  return array1.filter(item => set2.has(item));
}