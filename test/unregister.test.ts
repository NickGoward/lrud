import Lrud from "../src/Lrud";

test("should remove a node from the tree", () => {
  const n = new Lrud();

  n.register("foo");
  n.unregister("foo");

  expect(n.nodes.foo).not.toBeDefined();
});

test("should remove a child from the parent node", () => {
  const n = new Lrud();

  n.register("foo");
  n.register("bar", { parent: "foo" });
  n.unregister("bar");

  expect(n.nodes.foo.children).toEqual([]);
});

test("should unset the `activeChild` of the parent", () => {
  const n = new Lrud();

  n.register("foo", { activeChild: "bar" });
  n.register("bar", { parent: "foo" });
  n.unregister("bar");

  expect(n.nodes.foo.activeChild).not.toBeDefined();
});

test("should unregister all of a node's children", () => {
  const n = new Lrud();

  n.register("foo");
  n.register("bar", { parent: "foo" });
  n.unregister("foo");

  expect(n.nodes).toEqual({});
});

test("should blur if focused", () => {
  const n = new Lrud();

  n.blur = jest.fn();

  n.register("foo");
  n.focus("foo");
  n.unregister("foo");

  expect(n.blur).toHaveBeenCalled();
});
