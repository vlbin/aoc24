export type UnaryFunction<I, O> = (arg: I) => O;

interface Pipe {
  (): <T>(x: T) => T;
  <A, B>(ab: UnaryFunction<A, B>): UnaryFunction<A, B>;
  <A, B, C>(ab: UnaryFunction<A, B>, bc: UnaryFunction<B, C>): UnaryFunction<A, C>;
  <A, B, C, D>(ab: UnaryFunction<A, B>, bc: UnaryFunction<B, C>, cd: UnaryFunction<C, D>): UnaryFunction<A, D>;
  <A, B, C, D, E>(
    ab: UnaryFunction<A, B>,
    bc: UnaryFunction<B, C>,
    cd: UnaryFunction<C, D>,
    de: UnaryFunction<D, E>,
  ): UnaryFunction<A, E>;
}

export const pipe: Pipe =
  (...fns: UnaryFunction<any, any>[]) =>
  (input: any) =>
    fns.reduce((acc, fn) => fn(acc), input);
