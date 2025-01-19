interface PythonFunction {
  name: string;
  description: string;
  example: string;
}

export const BUILTIN_FUNCTIONS: PythonFunction[] = [
  {
    name: "abs(x)",
    description: "Return the absolute value of a number",
    example: "abs(-5)  # Returns: 5",
  },
  {
    name: "all(iterable)",
    description: "Return True if all elements in the iterable are truthy",
    example: "all([True, True, True])  # Returns: True",
  },
  {
    name: "any(iterable)",
    description: "Return True if any element in the iterable is truthy",
    example: "any([False, True, False])  # Returns: True",
  },
  {
    name: "bin(x)",
    description: "Convert an integer to a binary string prefixed with '0b'",
    example: "bin(3)  # Returns: '0b11'",
  },
  {
    name: "bool(x)",
    description: "Return a Boolean value from x",
    example: 'bool("")  # Returns: False',
  },
  {
    name: "chr(i)",
    description: "Return a string of one character whose ASCII code is i",
    example: "chr(65)  # Returns: 'A'",
  },
  {
    name: "dict()",
    description: "Create a new dictionary",
    example:
      "dict(name='John', age=30)  # Returns: {'name': 'John', 'age': 30}",
  },
  {
    name: "dir([object])",
    description: "Return list of valid attributes and methods of the object",
    example: "dir(str)  # Returns list of string methods",
  },
  {
    name: "divmod(a, b)",
    description: "Return tuple of quotient and remainder of division",
    example: "divmod(7, 3)  # Returns: (2, 1)",
  },
  {
    name: "enumerate(iterable)",
    description: "Return an enumerate object with index and value pairs",
    example: 'list(enumerate(["a", "b"]))  # Returns: [(0, "a"), (1, "b")]',
  },
  {
    name: "float(x)",
    description: "Convert a string or number to a floating point number",
    example: 'float("3.14")  # Returns: 3.14',
  },
  {
    name: "format(value[, format_spec])",
    description: "Convert a value to a formatted representation",
    example: 'format(3.14159, ".2f")  # Returns: "3.14"',
  },
  {
    name: "hex(x)",
    description: "Convert an integer to a hexadecimal string",
    example: "hex(255)  # Returns: '0xff'",
  },
  {
    name: "int(x[, base])",
    description: "Convert a number or string to an integer",
    example: 'int("100", 2)  # Returns: 4',
  },
  {
    name: "isinstance(object, classinfo)",
    description: "Return True if object is an instance of classinfo",
    example: 'isinstance("hello", str)  # Returns: True',
  },
  {
    name: "len(s)",
    description: "Return the length (number of items) of an object",
    example: 'len("hello")  # Returns: 5',
  },
  {
    name: "list([iterable])",
    description: "Create a new list from an optional iterable",
    example: 'list("hello")  # Returns: ["h", "e", "l", "l", "o"]',
  },
  {
    name: "max(iterable)",
    description: "Return the largest item in an iterable",
    example: "max([1, 2, 3, 4])  # Returns: 4",
  },
  {
    name: "min(iterable)",
    description: "Return the smallest item in an iterable",
    example: "min([1, 2, 3, 4])  # Returns: 1",
  },
  {
    name: "oct(x)",
    description: "Convert an integer to an octal string",
    example: "oct(8)  # Returns: '0o10'",
  },
  {
    name: "ord(c)",
    description: "Return integer representing Unicode character",
    example: "ord('A')  # Returns: 65",
  },
  {
    name: "pow(x, y)",
    description: "Return x to the power y",
    example: "pow(2, 3)  # Returns: 8",
  },
  {
    name: "range([start], stop[, step])",
    description: "Create an arithmetic progression sequence",
    example: "list(range(0, 5))  # Returns: [0, 1, 2, 3, 4]",
  },
  {
    name: "round(number[, ndigits])",
    description: "Round a number to a given precision",
    example: "round(3.14159, 2)  # Returns: 3.14",
  },
  {
    name: "set([iterable])",
    description: "Create a new set object",
    example: "set([1, 2, 2, 3])  # Returns: {1, 2, 3}",
  },
  {
    name: "sorted(iterable)",
    description: "Return a new sorted list from iterable",
    example: "sorted([3, 1, 2])  # Returns: [1, 2, 3]",
  },
  {
    name: "str(object)",
    description: "Return a string representation of an object",
    example: "str(123)  # Returns: '123'",
  },
  {
    name: "sum(iterable)",
    description: "Return the sum of all items in the iterable",
    example: "sum([1, 2, 3])  # Returns: 6",
  },
  {
    name: "tuple([iterable])",
    description: "Create a new tuple object",
    example: 'tuple("abc")  # Returns: ("a", "b", "c")',
  },
  {
    name: "type(object)",
    description: "Return the type of an object",
    example: 'type("hello")  # Returns: <class "str">',
  },
  {
    name: "zip(*iterables)",
    description: "Create an iterator of tuples from multiple iterables",
    example: 'list(zip([1, 2], ["a", "b"]))  # Returns: [(1, "a"), (2, "b")]',
  },
];
