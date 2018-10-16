// to sort in initiative order
function compare(a,b) {
  if (a.ini < b.ini)
    return 1;
  if (a.ini > b.ini)
    return -1;
  return 0;
}