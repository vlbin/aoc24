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

export type Maybe<T = unknown> = Just<T> | Nothing;

export const Nothing = (): Nothing => ({
  _tag: MaybeType.Nothing,
});

export const Just = <T>(value: T): Just<T> => ({
  _tag: MaybeType.Just,
  value,
});

export const isJust = <T>(value: Maybe<T>): value is Just<T> => value._tag === MaybeType.Just;
export const isNothing = <T>(value: Maybe<T>): value is Nothing => value._tag === MaybeType.Nothing;
