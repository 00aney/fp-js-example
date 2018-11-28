const _each = (list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

const _filter = (list, predi) => {
  let new_list = [];
  _each(list, (item) => {
    if (predi(item)) new_list.push(item);
  })
  return new_list;
}

const _map = (list, mapper) => {
  let new_list = [];
  _each(list, (item) => {
    new_list.push(mapper(item));
  })
  return new_list;
}

