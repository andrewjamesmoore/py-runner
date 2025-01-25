interface PythonMethod {
  name: string;
  description: string;
  example: string;
}

export const PYTHON_METHODS: PythonMethod[] = [
  // String Methods
  {
    name: "str.capitalize()",
    description:
      "Return a copy of the string with its first character capitalized",
    example: '"hello world".capitalize()  # Returns: "Hello world"',
  },
  {
    name: "str.count(sub[, start[, end]])",
    description:
      "Return the number of non-overlapping occurrences of substring",
    example: '"hello hello".count("hello")  # Returns: 2',
  },
  {
    name: "str.endswith(suffix)",
    description: "Return True if the string ends with the specified suffix",
    example: '"hello.txt".endswith(".txt")  # Returns: True',
  },
  {
    name: "str.find(sub[, start[, end]])",
    description: "Return lowest index of substring if found, -1 if not found",
    example: '"hello".find("l")  # Returns: 2',
  },
  {
    name: "str.format(*args, **kwargs)",
    description: "Return formatted version of string",
    example: '"{} {}".format("hello", "world")  # Returns: "hello world"',
  },
  {
    name: "str.isalnum()",
    description: "Return True if all characters are alphanumeric",
    example: '"abc123".isalnum()  # Returns: True',
  },
  {
    name: "str.isalpha()",
    description: "Return True if all characters are alphabetic",
    example: '"abc".isalpha()  # Returns: True',
  },
  {
    name: "str.isdigit()",
    description: "Return True if all characters are digits",
    example: '"123".isdigit()  # Returns: True',
  },
  {
    name: "str.join(iterable)",
    description:
      "Return a string which is the concatenation of the strings in iterable",
    example: '"-".join(["a", "b", "c"])  # Returns: "a-b-c"',
  },
  {
    name: "str.replace(old, new[, count])",
    description:
      "Return a copy with all occurrences of substring old replaced by new",
    example: '"hello hello".replace("hello", "hi")  # Returns: "hi hi"',
  },
  {
    name: "str.split([sep[, maxsplit]])",
    description:
      "Return a list of the words in the string, using sep as delimiter",
    example: '"a,b,c".split(",")  # Returns: ["a", "b", "c"]',
  },
  {
    name: "str.strip([chars])",
    description:
      "Return a copy of the string with leading and trailing whitespace removed",
    example: '"  hello  ".strip()  # Returns: "hello"',
  },

  // List Methods
  {
    name: "list.append(x)",
    description: "Add an item to the end of the list",
    example: "nums = [1, 2]\nnums.append(3)\nprint(nums)  # [1, 2, 3]",
  },
  {
    name: "list.clear()",
    description: "Remove all items from the list",
    example: "nums = [1, 2, 3]\nnums.clear()\nprint(nums)  # []",
  },
  {
    name: "list.copy()",
    description: "Return a shallow copy of the list",
    example: "nums = [1, 2, 3]\ncopy = nums.copy()\nprint(copy)  # [1, 2, 3]",
  },
  {
    name: "list.count(x)",
    description: "Return number of occurrences of value",
    example: "nums = [1, 2, 2, 3]\nprint(nums.count(2))  # 2",
  },
  {
    name: "list.extend(iterable)",
    description: "Extend list by appending elements from the iterable",
    example: "nums = [1, 2]\nnums.extend([3, 4])\nprint(nums)  # [1, 2, 3, 4]",
  },
  {
    name: "list.index(x)",
    description: "Return first index of value",
    example: "nums = [1, 2, 3]\nprint(nums.index(2))  # 1",
  },
  {
    name: "list.insert(i, x)",
    description: "Insert an item at a given position",
    example: "nums = [1, 3]\nnums.insert(1, 2)\nprint(nums)  # [1, 2, 3]",
  },
  {
    name: "list.pop([i])",
    description: "Remove and return item at index (default last)",
    example:
      "nums = [1, 2, 3]\npopped = nums.pop()\nprint(popped, nums)  # 3 [1, 2]",
  },
  {
    name: "list.remove(x)",
    description: "Remove first occurrence of value",
    example: "nums = [1, 2, 2, 3]\nnums.remove(2)\nprint(nums)  # [1, 2, 3]",
  },
  {
    name: "list.reverse()",
    description: "Reverse the elements of the list in place",
    example: "nums = [1, 2, 3]\nnums.reverse()\nprint(nums)  # [3, 2, 1]",
  },
  {
    name: "list.sort()",
    description: "Sort the list in place",
    example: "nums = [3, 1, 2]\nnums.sort()\nprint(nums)  # [1, 2, 3]",
  },

  // Dict Methods
  {
    name: "dict.clear()",
    description: "Remove all items from the dictionary",
    example: "d = {'a': 1}\nd.clear()\nprint(d)  # {}",
  },
  {
    name: "dict.copy()",
    description: "Return a shallow copy of the dictionary",
    example: "d = {'a': 1}\ncopy = d.copy()\nprint(copy)  # {'a': 1}",
  },
  {
    name: "dict.get(key[, default])",
    description: "Return the value for key if it exists, else default",
    example: "d = {'a': 1}\nprint(d.get('b', 0))  # 0",
  },
  {
    name: "dict.items()",
    description: "Return a view of dictionary's (key, value) pairs",
    example: "d = {'a': 1}\nprint(list(d.items()))  # [('a', 1)]",
  },
  {
    name: "dict.keys()",
    description: "Return a view of dictionary's keys",
    example: "d = {'a': 1, 'b': 2}\nprint(list(d.keys()))  # ['a', 'b']",
  },
  {
    name: "dict.pop(key[, default])",
    description: "Remove specified key and return the corresponding value",
    example: "d = {'a': 1}\nval = d.pop('a')\nprint(val, d)  # 1 {}",
  },
  {
    name: "dict.update([other])",
    description: "Update the dictionary with elements from another dictionary",
    example: "d = {'a': 1}\nd.update({'b': 2})\nprint(d)  # {'a': 1, 'b': 2}",
  },
  {
    name: "dict.values()",
    description: "Return a view of dictionary's values",
    example: "d = {'a': 1, 'b': 2}\nprint(list(d.values()))  # [1, 2]",
  },

  // Set Methods
  {
    name: "set.add(elem)",
    description: "Add element to the set",
    example: "s = {1, 2}\ns.add(3)\nprint(s)  # {1, 2, 3}",
  },
  {
    name: "set.clear()",
    description: "Remove all elements from the set",
    example: "s = {1, 2}\ns.clear()\nprint(s)  # set()",
  },
  {
    name: "set.difference(other)",
    description: "Return the difference of two or more sets",
    example: "s1 = {1, 2, 3}\ns2 = {3, 4}\nprint(s1.difference(s2))  # {1, 2}",
  },
  {
    name: "set.intersection(other)",
    description: "Return the intersection of two or more sets",
    example:
      "s1 = {1, 2, 3}\ns2 = {2, 3, 4}\nprint(s1.intersection(s2))  # {2, 3}",
  },
  {
    name: "set.union(other)",
    description: "Return the union of sets",
    example: "s1 = {1, 2}\ns2 = {3, 4}\nprint(s1.union(s2))  # {1, 2, 3, 4}",
  },
];
