/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
  for (let i = 0; i < count; i++) {
      const element = document.createElement(tag);
      element.textContent = content;
      document.body.appendChild(element);
  }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
  function createTree(currentLevel) {
    if (currentLevel > level) {
      return null;
    }
    const container = document.createElement('div');
    container.classList.add(`item_${currentLevel}`);
    for (let i = 0; i < childrenCount; i++) {
      const child = createTree(currentLevel + 1);
      if (child) {
        container.appendChild(child);
      }
    }
    return container;
  }
  return createTree(1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
  const tree = generateTree(2, 3);

  function replaceSecondLevel(node) {
    if (node.classList && node.classList.contains('item_2')) {
      const section = document.createElement('section');
      section.classList.add('item_2');
      while (node.firstChild) {
        section.appendChild(node.firstChild);
      }
      node.parentNode.replaceChild(section, node);
    } else {
      for (const child of node.children) {
        replaceSecondLevel(child);
      }
    }
  }

  replaceSecondLevel(tree);
  return tree;
}