enum MaybeType {
  Just = 'just',
  Nothing = 'nothing',
}

interface Just<T> {
  _tag: MaybeType.Just;
  value: T;
}

interface Nothing {
  _tag: MaybeType.Nothing;
}

export type Maybe<T> = Just<T> | Nothing;

const nothing = (): Nothing => ({
  _tag: MaybeType.Nothing,
});

const just = <T>(value: T): Just<T> => ({
  _tag: MaybeType.Just,
  value,
});
